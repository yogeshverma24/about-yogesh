// src/lib/today/gemini.ts
import { TaskItem } from './types';

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
  error?: {
    code?: number;
    message?: string;
    status?: string;
  };
}

/**
 * Retrieve Gemini API key from environment variables or .env file
 */
function getGeminiApiKey(): string {
  let key = (process.env.GEMINI_KEY || process.env.GEMINI_API_KEY || '').replace(/["']/g, '').trim();
  if (!key) {
    try {
      // Direct filesystem fallback for development / local runtime
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const fs = require('fs');
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const path = require('path');
      const envPath = path.resolve(process.cwd(), '.env');
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        const match = content.match(/GEMINI_KEY=["']?([^"'\r\n]+)["']?/);
        if (match) {
          key = match[1].trim();
        }
      }
    } catch {
      // Ignore fs errors in non-node runtimes
    }
  }
  return key;
}

/**
 * Verified working Gemini models (in order of latency and availability)
 */
const CANDIDATE_MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-flash-lite-latest',
  'gemini-3.1-flash-lite',
  'gemini-3.5-flash',
  'gemini-3.8-flash',
];

/**
 * Call Google Gemini API directly with live dynamic AI generation.
 * Strictly avoids any static dummy or mock text.
 */
export async function callGemini(prompt: string, systemInstruction?: string): Promise<string> {
  const apiKey = getGeminiApiKey();

  if (!apiKey) {
    throw new Error('GEMINI_KEY is not set. Please provide a valid Gemini API key in your .env file.');
  }

  let lastError = '';

  for (const model of CANDIDATE_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const body: any = {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
      };

      if (systemInstruction) {
        body.system_instruction = {
          parts: [{ text: systemInstruction }],
        };
      }

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = (await res.json()) as GeminiResponse;

      if (res.ok) {
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text && text.trim().length > 0) {
          return text.trim();
        }
      } else {
        lastError = data.error?.message || `HTTP ${res.status}: ${res.statusText}`;
      }
    } catch (err: any) {
      lastError = err?.message || 'Network error / request aborted';
    }
  }

  throw new Error(`Gemini AI generation failed across available models. ${lastError}`);
}

/**
 * Generate an optimized daily timetable using live Gemini intelligence
 */
export async function generateSmartSchedule(tasks: TaskItem[], energyLevel: string): Promise<string> {
  const taskSummary = tasks
    .filter((t) => t.timeframe === 'today')
    .map((t) => `- [${t.priority.toUpperCase()}] (${t.mode.toUpperCase()}) ${t.title}`)
    .join('\n');

  const prompt = `You are Yogesh Verma's elite executive AI operating strategist.
Yogesh balances a full-time software engineering job with a rigorous 39.5-hour weekly founder operating schedule:
- Weekday Evenings (5 days × 3.5 hours = 17.5h): 7:30 PM – 11:00 PM uninterrupted founder sprint
- Weekend Days (2 days × 11 hours = 22.0h):
  - Saturday 11h: Client project delivery (Delegatespace Studio) & existing product maintenance
  - Sunday 11h: Core product sprint & release lock
- Ventures: Delegatespace Studio, Delegatework (Teams async collaboration), Fasly (Agriculture app), DelegateCampus (Student community).

Founder Priorities:
1. Revenue & client delivery
2. Valuable product execution
3. Audience, SEO, and organic distribution

Energy Level Today: "${energyLevel}".
Current Tasks for Today:
${taskSummary || 'No specific tasks entered yet. Suggest an optimal 3.5h evening operating block.'}

Provide an actionable, structured, time-blocked execution plan with exact timestamps, breaks, and high-impact momentum advice. Keep it punchy, practical, and founder-focused.`;

  return await callGemini(
    prompt,
    'You are an elite executive productivity advisor and founder strategist. Produce concrete, real-time tactical schedules.'
  );
}
