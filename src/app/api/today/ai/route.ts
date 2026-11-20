// src/app/api/today/ai/route.ts
import { NextResponse } from 'next/server';
import { callGemini, generateSmartSchedule } from '@/lib/today/gemini';
import { getTasks } from '@/lib/today/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, prompt, product, topic, energyLevel = 'high' } = body;

    if (action === 'schedule') {
      const todayTasks = await getTasks({ timeframe: 'today' });
      const schedule = await generateSmartSchedule(todayTasks, energyLevel);
      return NextResponse.json({ success: true, result: schedule });
    }

    if (action === 'business_content') {
      const productNames: Record<string, string> = {
        fasly: 'Fasly Agriculture App (https://fasly.in/) - Agri/Farmer app',
        campus: 'Campus Student Community (https://delegatecampus.in/) - College & Student platform',
        delegatework: 'Delegatework (https://delegatework.in/) - Modern Teams & Async Collaboration platform',
        delegatespace: 'Delegatespace (https://www.delegatespace.com/) - Software Development & Product Studio',
      };

      const targetProduct = productNames[product] || product || 'Delegatespace Ecosystem';
      const userPrompt =
        prompt ||
        `Generate a high-converting marketing & SEO action plan for ${targetProduct}. Include 1 viral social post hook, 2 high-intent SEO blog titles with target keywords, and 1 conversion tip.`;

      const result = await callGemini(
        userPrompt,
        `You are the Chief Marketing Officer and SEO growth strategist for Yogesh Verma's products.`
      );
      return NextResponse.json({ success: true, result });
    }

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
      return NextResponse.json({ success: true, result });
    }

    if (action === 'daily_review') {
      const todayTasks = await getTasks({ timeframe: 'today' });
      const completed = todayTasks.filter((t) => t.status === 'completed');
      const pending = todayTasks.filter((t) => t.status !== 'completed');

      const reviewPrompt = `Analyze Yogesh's daily output today:
- Total tasks today: ${todayTasks.length}
- Completed (${completed.length}): ${completed.map((t) => t.title).join(', ') || 'None yet'}
- Pending (${pending.length}): ${pending.map((t) => t.title).join(', ') || 'All clear!'}

Give an inspiring, strategic performance breakdown:
1. Wins & Compound momentum
2. Action plan for high-priority unfinished items
3. Strategic advice to sleep peacefully and conquer tomorrow morning.`;

      const result = await callGemini(
        reviewPrompt,
        `You are Yogesh Verma's elite personal mentor and performance coach.`
      );
      return NextResponse.json({ success: true, result });
    }

    // Default custom prompt
    if (prompt) {
      const result = await callGemini(prompt);
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

