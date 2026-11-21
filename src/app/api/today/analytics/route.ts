// src/app/api/today/analytics/route.ts
import { NextResponse } from 'next/server';
import {
  getMonthlyReport,
  saveMonthlyReport,
  getAllMonthlyReports,
  getDailyLogs,
  getDashboardState,
} from '@/lib/today/db';
import { callGemini } from '@/lib/today/gemini';
import { MonthlyAnalyticsReport } from '@/lib/today/types';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const month = searchParams.get('month') || new Date().toISOString().substring(0, 7);

    // 1. Fetch directly from Database / Persistent cache first!
    const cachedReport = await getMonthlyReport(month);

    if (cachedReport) {
      return NextResponse.json({
        success: true,
        fromCache: true,
        report: cachedReport,
      });
    }

    // List all available reports in DB
    const allReports = await getAllMonthlyReports();

    return NextResponse.json({
      success: true,
      fromCache: false,
      report: null,
      availableMonths: allReports.map((r) => r.month),
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const month = body.month || new Date().toISOString().substring(0, 7);
    const forceRegenerate = Boolean(body.forceRegenerate);

    // 1. If not forcing regeneration, check DB cache first
    if (!forceRegenerate) {
      const existing = await getMonthlyReport(month);
      if (existing) {
        return NextResponse.json({
          success: true,
          fromCache: true,
          report: existing,
        });
      }
    }

    // 2. Fetch context: Daily logs, completed tasks, metrics for this month
    const [logs, dashboardState] = await Promise.all([
      getDailyLogs(month),
      getDashboardState(),
    ]);

    const completedTasks = dashboardState.tasks.filter(
      (t) =>
        t.status === 'completed' &&
        (t.completedAt?.startsWith(month) || t.dueDate?.startsWith(month) || t.createdAt?.startsWith(month))
    );

    // Aggregate hours
    let personalHours = 0;
    let businessHours = 0;
    let jobHours = 0;

    logs.forEach((log) => {
      personalHours += log.hoursWorked?.personal || 0;
      businessHours += log.hoursWorked?.business || 0;
      jobHours += log.hoursWorked?.job || 0;
    });

    const totalHours = personalHours + businessHours + jobHours;
    const avgProductivityScore =
      logs.length > 0
        ? Math.round((logs.reduce((acc, l) => acc + (l.productivityScore || 8), 0) / logs.length) * 10)
        : 85;

    // 3. Prepare AI synthesis prompt
    const prompt = `You are an elite executive performance advisor and productivity coach for Yogesh Verma.
Yogesh works a full-time software job while dedicating 39.5 hours per week (3.5h weekday evenings, 11h Saturday, 11h Sunday) to building 4 ventures (Delegatework, Fasly, Campus, Delegatespace Studio) and preparing for Tier-1 Senior Software Engineer / Lead Mobile Architect roles.

Analyze Yogesh's logged activities and performance data for the month of ${month}:

=== LOGGED DATA FOR ${month} ===
- Total Days with Status Logged: ${logs.length}
- Total Work Hours Logged: ${totalHours} hours (Personal: ${personalHours}h, Business: ${businessHours}h, Job Prep: ${jobHours}h)
- Completed Tasks in this Month: ${completedTasks.length} tasks
- Daily Status Excerpts:
${logs
  .slice(0, 15)
  .map(
    (l) =>
      `[Date: ${l.date} | Score: ${l.productivityScore}/10 | Hours: ${l.hoursWorked?.total || 0}h]
Personal: ${l.personalSummary || 'None'}
Business: ${l.businessSummary || 'None'}
Job Prep: ${l.jobSummary || 'None'}
Takeaway: ${l.keyTakeaway || 'None'}`
  )
  .join('\n\n')}

=== INSTRUCTIONS ===
Generate a comprehensive, analytical executive productivity report for ${month}.
You MUST respond with STRICT VALID JSON only (no markdown code blocks, no backticks, no preamble):
{
  "productivityScore": <number between 50 and 100>,
  "executiveSummary": "<2-3 sentence crisp analysis of Yogesh's overall output, cadence adherence, and focus balance>",
  "keyWins": [
    "<Highlight 1 specific achievement in business or tech>",
    "<Highlight 2 specific milestone reached>",
    "<Highlight 3 positive discipline/habit compound effect>"
  ],
  "areasToImprove": [
    "<Specific bottleneck or area where hours or consistency dropped>",
    "<Pillar that needs tighter execution>"
  ],
  "recommendations": [
    "<Actionable strategy 1 for next month>",
    "<Actionable strategy 2 for next month>",
    "<Actionable strategy 3 for next month>"
  ],
  "modeBreakdown": {
    "personal": "<Analysis of health, habits, ₹50k SIP, and daily bio-routine>",
    "business": "<Analysis of 4 ventures: Delegatework SEO, Fasly advisory, Campus student growth, Delegatespace agency>",
    "job": "<Analysis of DSA LeetCode solve rate, Distributed System Design, and Mobile Architecture>"
  }
}`;

    const systemInstruction = 'You are an executive founder productivity auditor. Always output pure valid JSON without markdown wrapping.';

    let aiOutput = await callGemini(prompt, systemInstruction);

    // Clean JSON response if wrapped in ```json ... ```
    let cleanJson = aiOutput.trim();
    if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```(json)?\n?/, '').replace(/```$/, '').trim();
    }

    let parsed: any = {};
    try {
      parsed = JSON.parse(cleanJson);
    } catch {
      // Fallback structured data if parsing fails
      parsed = {
        productivityScore: avgProductivityScore,
        executiveSummary: `For ${month}, Yogesh logged ${totalHours} dedicated hours across ${logs.length} tracked days. Strong adherence to evening business blocks and continuous technical growth.`,
        keyWins: [
          `Logged ${totalHours} focused founder hours across Personal, Business, and Job Prep`,
          `Maintained steady progress on Delegatework SEO and core business channels`,
          `Consistent daily problem solving and routine checkoffs`,
        ],
        areasToImprove: [
          'Ensure weekends hit full 11-hour deep sprint allocations without interruptions',
          'Tighten client outreach pipeline conversion on Tuesdays',
        ],
        recommendations: [
          'Continue locking Sunday milestones on Saturday evening',
          'Scale high-intent organic blogs for Delegatework and Fasly',
          'Maintain 8 glasses of water and consistent sleep recovery',
        ],
        modeBreakdown: {
          personal: 'Health and wealth routines compounding well; consistent morning and night checkoffs.',
          business: 'Ventures moving forward steadily with priority on Delegatework SEO and client deliverables.',
          job: 'Solid algorithmic problem solving and architecture depth across Swift 6 and System Design.',
        },
      };
    }

    // 4. Build the final report record
    const report: MonthlyAnalyticsReport = {
      id: `rep-${month}`,
      month,
      generatedAt: new Date().toISOString(),
      productivityScore: parsed.productivityScore || avgProductivityScore,
      totalHoursLogged: totalHours,
      hoursBreakdown: {
        personal: personalHours,
        business: businessHours,
        job: jobHours,
      },
      totalDaysLogged: logs.length,
      tasksCompletedCount: completedTasks.length,
      executiveSummary: parsed.executiveSummary,
      keyWins: Array.isArray(parsed.keyWins) ? parsed.keyWins : [],
      areasToImprove: Array.isArray(parsed.areasToImprove) ? parsed.areasToImprove : [],
      recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations : [],
      modeBreakdown: {
        personal: parsed.modeBreakdown?.personal || 'Routines and wealth compounding on track.',
        business: parsed.modeBreakdown?.business || 'Ventures and client delivery progressing well.',
        job: parsed.modeBreakdown?.job || 'Technical mastery in DSA and mobile architecture expanding.',
      },
      rawAIOutput: aiOutput,
    };

    // 5. Save report to Database (MongoDB Atlas + persistent fallback)
    await saveMonthlyReport(report);

    return NextResponse.json({
      success: true,
      fromCache: false,
      report,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

