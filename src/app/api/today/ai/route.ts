// src/app/api/today/ai/route.ts
import { NextResponse } from 'next/server';
import { callGemini, generateSmartSchedule } from '@/lib/today/gemini';
import { getTasks, getDailyLogs, getDashboardState, getAppSetting, setAppSetting, createTask } from '@/lib/today/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action') || 'schedule';
    const todayStr = new Date().toISOString().split('T')[0];
    const settingKey = `ai_${action}_${todayStr}`;

    const saved = await getAppSetting(settingKey);
    if (saved) {
      return NextResponse.json({
        success: true,
        saved: true,
        result: saved.text,
        savedAt: saved.savedAt,
      });
    }

    return NextResponse.json({ success: true, saved: false, result: null });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to check saved AI state' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      action,
      prompt,
      product,
      topic,
      energyLevel = 'high',
      forceRegenerate = false,
    } = body;

    const todayStr = new Date().toISOString().split('T')[0];

    // 1. OPTIMIZE SCHEDULE ACTION
    if (action === 'schedule') {
      const settingKey = `ai_schedule_${todayStr}`;

      // If already generated today and not forcing regeneration, return persisted DB plan
      if (!forceRegenerate) {
        const saved = await getAppSetting(settingKey);
        if (saved?.text) {
          return NextResponse.json({
            success: true,
            result: saved.text,
            cached: true,
            savedAt: saved.savedAt,
          });
        }
      }

      // Read real context from MongoDB
      const [todayTasks, recentLogs, state] = await Promise.all([
        getTasks({ timeframe: 'today' }),
        getDailyLogs(),
        getDashboardState(),
      ]);

      const schedule = await generateSmartSchedule(todayTasks, energyLevel);

      // Save generated schedule to MongoDB Atlas
      await setAppSetting(settingKey, {
        text: schedule,
        date: todayStr,
        savedAt: new Date().toISOString(),
      });

      return NextResponse.json({ success: true, result: schedule, cached: false });
    }

    // 2. DAILY REVIEW & SCOREBOARD (REAL DATA AUDIT)
    if (action === 'daily_review') {
      const settingKey = `ai_daily_review_${todayStr}`;

      if (!forceRegenerate) {
        const saved = await getAppSetting(settingKey);
        if (saved?.text) {
          return NextResponse.json({
            success: true,
            result: saved.text,
            cached: true,
            savedAt: saved.savedAt,
          });
        }
      }

      const [todayTasks, recentLogs] = await Promise.all([
        getTasks({ timeframe: 'today' }),
        getDailyLogs(),
      ]);

      const completed = todayTasks.filter((t) => t.status === 'completed');
      const pending = todayTasks.filter((t) => t.status !== 'completed');

      // CRITICAL REALITY CHECK: Never fabricate fake completions!
      const realityStatus =
        completed.length === 0
          ? `STRICT REALITY CHECK: Yogesh has completed 0 tasks so far today (${pending.length} pending tasks).
Do NOT say or pretend any task is completed.
Do NOT say "The Anchor held" or praise completed routines unless actually marked completed.
Give him a direct, inspiring startup protocol to focus on his #1 highest-leverage pending task immediately and avoid context switching.`
          : `REAL COMPLETED TASKS (${completed.length} completed out of ${todayTasks.length}):
${completed.map((t) => `- [COMPLETED] ${t.title}`).join('\n')}
Acknowledge these exact achievements without exaggerating.`;

      const reviewPrompt = `You are Yogesh Verma's elite executive performance coach and mentor.
Current Date: ${todayStr}

=== CURRENT ACTUAL EXECUTION STATUS ===
${realityStatus}

Pending tasks scheduled for today (${pending.length}):
${pending.map((t) => `- [${t.priority.toUpperCase()}] (${t.mode.toUpperCase()}) ${t.title}: ${t.description || ''}`).join('\n') || 'None'}

Recent daily reflections logged in DB:
${recentLogs.slice(0, 3).map((l) => `[${l.date}] Focus: ${l.plannedNext || 'N/A'} | Reflection: ${l.keyTakeaway || 'N/A'}`).join('\n') || 'No previous logs recorded yet.'}

Provide an elite, real-time tactical breakdown:
1. Wins & Compound Momentum (Reflect real status accurately)
2. Action Plan for High-Priority Unfinished Items (Ruthlessly triage using 80/20)
3. Strategic Advice: Sleep Peacefully and Conquer Tomorrow`;

      const result = await callGemini(
        reviewPrompt,
        'You are an elite, highly truthful executive founder mentor. Strictly avoid inventing or assuming completed tasks that are not done.'
      );

      // Save real review to MongoDB Atlas
      await setAppSetting(settingKey, {
        text: result,
        date: todayStr,
        savedAt: new Date().toISOString(),
      });

      return NextResponse.json({ success: true, result, cached: false });
    }

    // 3. BUSINESS MARKETING & SEO STRATEGY
    if (action === 'business_content') {
      const productNames: Record<string, string> = {
        fasly: 'Fasly Agriculture App (https://fasly.in/) - Agri & Farmer Advisory App',
        campus: 'Campus Student Community (https://delegatecampus.in/) - College & Student Tech Platform',
        delegatework: 'Delegatework (https://delegatework.in/) - Modern Teams & Async Collaboration',
        delegatespace: 'Delegatespace Studio (https://www.delegatespace.com/) - High-End Product & Mobile Engineering Agency',
      };

      const targetProduct = productNames[product] || product || 'Delegatespace Ecosystem';
      const userPrompt =
        prompt ||
        `Generate a high-converting marketing & SEO action plan for ${targetProduct}. Include 1 viral social post hook, 2 high-intent SEO blog titles with target keywords, and 1 conversion tip.`;

      const result = await callGemini(
        userPrompt,
        `You are the Chief Marketing Officer and SEO growth strategist for Yogesh Verma's products.`
      );

      await setAppSetting(`ai_latest_marketing_${product || 'ecosystem'}`, {
        text: result,
        date: todayStr,
        savedAt: new Date().toISOString(),
      });

      return NextResponse.json({ success: true, result });
    }

    // 4. TECHNICAL DEPTH & INTERVIEW DRILL
    if (action === 'job_prep') {
      const topicGuides: Record<string, string> = {
        dsa: 'Data Structures & Algorithms (LeetCode Medium/Hard, Graphs, DP, Trees, Two Pointers)',
        system_design: 'Distributed System Design (High-Level HLD & Low-Level LLD, Caching, DB Sharding, Microservices)',
        flutter: 'Flutter Architecture (Riverpod 2.0, Bloc, Platform Channels, Custom Painters, Impeller)',
        react_native: 'React Native New Architecture (Fabric, TurboModules in C++, JSI, Reanimated 3, Performance)',
        ios: 'Native iOS (Swift 6 Concurrency, Actors, SwiftUI vs UIKit, Combine, Memory Profiling)',
        communication: 'Senior Engineer Behavioral Interview (STAR method, English fluency, Trade-off articulation)',
      };

      const targetTopic = topicGuides[topic] || topic || 'Senior Software Engineer Interview Prep';
      const userPrompt =
        prompt ||
        `Provide an elite technical interview drill on "${targetTopic}". Include 1 real-world scenario/question, the optimal approach/pattern to solve it, and common pitfall to avoid.`;

      const result = await callGemini(
        userPrompt,
        `You are a Principal Engineer and FAANG hiring manager training Yogesh Verma for senior tech leadership roles.`
      );

      await setAppSetting(`ai_latest_techdrill_${topic || 'general'}`, {
        text: result,
        date: todayStr,
        savedAt: new Date().toISOString(),
      });

      return NextResponse.json({ success: true, result });
    }

    // 5. DIRECT TASK CREATION INTO MONGODB
    if (action === 'create_task') {
      const { title, description, mode = 'business', priority = 'high', category = 'general' } = body;
      if (!title) {
        return NextResponse.json({ success: false, error: 'Task title is required' }, { status: 400 });
      }
      const newTask = await createTask({
        title,
        description,
        mode,
        category,
        timeframe: 'today',
        priority,
        status: 'pending',
        aiGenerated: true,
      });
      return NextResponse.json({ success: true, task: newTask });
    }

    // 6. DEFAULT CUSTOM PROMPT
    if (prompt) {
      const result = await callGemini(prompt);
      await setAppSetting('ai_latest_custom_prompt', {
        prompt,
        result,
        date: todayStr,
        savedAt: new Date().toISOString(),
      });
      return NextResponse.json({ success: true, result });
    }

    return NextResponse.json({ success: false, error: 'Invalid action or missing prompt' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Gemini processing failed' },
      { status: 500 }
    );
  }
}
