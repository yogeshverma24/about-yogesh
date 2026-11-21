// src/lib/today/hubData.ts

export type OperatingHubId =
  | 'client_sprint'
  | 'product_roadmap'
  | 'testing_qa'
  | 'sunday_sprint'
  | 'weekly_planning'
  | 'seo_command'
  | 'learning_hub';

// 1. Client Projects & CRM
export interface ClientProject {
  id: string;
  clientName: string;
  companyName: string;
  projectTitle: string;
  budget: string;
  stage: 'lead' | 'discovery' | 'proposal' | 'sprint' | 'review' | 'delivered';
  targetDeadline: string;
  progressPercent: number;
  channel: string;
  nextDeliverable: string;
  notes: string;
  deliverables: Array<{ id: string; title: string; done: boolean }>;
}

export const INITIAL_CLIENT_PROJECTS: ClientProject[] = [
  {
    id: 'cp-1',
    clientName: 'Rahul Mehta',
    companyName: 'AeroSync Logistics',
    projectTitle: 'Real-Time Fleet & Dispatch Mobile App (Flutter & Node.js)',
    budget: '₹1,80,000 Milestone',
    stage: 'sprint',
    targetDeadline: '2026-11-28',
    progressPercent: 75,
    channel: 'LinkedIn Inbound',
    nextDeliverable: 'Push location telemetry & driver offline queue to staging',
    notes: 'Client values swift execution. Saturday 4-hour block dedicated to completing driver trip reconciliation logic.',
    deliverables: [
      { id: 'd-1', title: 'Implement background driver location telemetry service', done: true },
      { id: 'd-2', title: 'Design offline sync queue with SQLite local cache', done: true },
      { id: 'd-3', title: 'Integrate real-time socket events with dispatch web dashboard', done: false },
      { id: 'd-4', title: 'Push staging APK build for client sign-off', done: false },
    ],
  },
  {
    id: 'cp-2',
    clientName: 'Siddharth Roy',
    companyName: 'KitePay Financial',
    projectTitle: 'Cross-Platform Neo-Banking Dashboard UI & Performance Audit',
    budget: '₹1,20,000 Milestone',
    stage: 'proposal',
    targetDeadline: '2026-12-05',
    progressPercent: 30,
    channel: 'Direct Referral',
    nextDeliverable: 'Finalize scope agreement & initial 50% milestone advance',
    notes: 'Client reviewed Delegatespace portfolio case study. Very interested in our Swift/Flutter architecture depth.',
    deliverables: [
      { id: 'd-5', title: 'Complete architectural audit of existing React Native app', done: true },
      { id: 'd-6', title: 'Submit 3-week milestone scope & contract terms', done: true },
      { id: 'd-7', title: 'Kickoff call & repo onboarding', done: false },
    ],
  },
  {
    id: 'cp-3',
    clientName: 'Elena Rostova',
    companyName: 'OmniDesk Nordic',
    projectTitle: 'B2B Async Standup Integration for Engineering Teams',
    budget: '$2,500 USD',
    stage: 'discovery',
    targetDeadline: '2026-12-12',
    progressPercent: 15,
    channel: 'Delegatework Inbound Demo',
    nextDeliverable: 'Run consultative demo call highlighting custom API connectors',
    notes: 'Came through Delegatework organic SEO search. Looking for custom enterprise deployment.',
    deliverables: [
      { id: 'd-8', title: 'Qualify team size & SSO requirements', done: true },
      { id: 'd-9', title: 'Record custom 5-minute video walkthrough for their CTO', done: false },
    ],
  },
];

// 2. Product Roadmap & Versions
export interface RoadmapItem {
  id: string;
  title: string;
  type: 'feature' | 'ui_ux' | 'bugfix' | 'performance';
  status: 'planned' | 'in_progress' | 'ready' | 'shipped';
}

export interface ProductVersion {
  id: string;
  productId: 'delegatework' | 'fasly' | 'campus' | 'delegatespace';
  productName: string;
  versionNumber: string;
  status: 'live' | 'in_development' | 'qa' | 'planned';
  targetReleaseDate: string;
  headline: string;
  items: RoadmapItem[];
}

export const INITIAL_PRODUCT_VERSIONS: ProductVersion[] = [
  {
    id: 'ver-dw-1',
    productId: 'delegatework',
    productName: 'Delegatework',
    versionNumber: 'v1.2.0',
    status: 'in_development',
    targetReleaseDate: '2026-12-01',
    headline: 'Async Standup Automation & Slack/Teams Bi-Directional Webhooks',
    items: [
      { id: 'dw-i1', title: 'Automated 9am async standup prompt with rich Markdown summaries', type: 'feature', status: 'ready' },
      { id: 'dw-i2', title: 'Slack & Microsoft Teams incoming webhook integration', type: 'feature', status: 'in_progress' },
      { id: 'dw-i3', title: 'Mobile responsive standup card UI overhaul for iOS Safari', type: 'ui_ux', status: 'in_progress' },
      { id: 'dw-i4', title: 'Fix timezone offset bug in standup daily reminder cron', type: 'bugfix', status: 'ready' },
      { id: 'dw-i5', title: 'Optimize initial dashboard bundle size (< 120KB)', type: 'performance', status: 'planned' },
    ],
  },
  {
    id: 'ver-dw-2',
    productId: 'delegatework',
    productName: 'Delegatework',
    versionNumber: 'v1.3.0',
    status: 'planned',
    targetReleaseDate: '2027-01-15',
    headline: 'AI Standup Summaries & Sprint Velocity Intelligence',
    items: [
      { id: 'dw-i6', title: 'Gemini-powered weekly engineering velocity & blocker digest', type: 'feature', status: 'planned' },
      { id: 'dw-i7', title: 'GitHub / GitLab PR auto-linking to daily standup items', type: 'feature', status: 'planned' },
      { id: 'dw-i8', title: 'Dark mode contrast refinement for high-contrast OLED screens', type: 'ui_ux', status: 'planned' },
    ],
  },
  {
    id: 'ver-fa-1',
    productId: 'fasly',
    productName: 'Fasly',
    versionNumber: 'v2.1.0',
    status: 'in_development',
    targetReleaseDate: '2026-12-10',
    headline: 'Winter Rabi Crop Advisory & Offline Disease Scanner',
    items: [
      { id: 'fa-i1', title: 'Regional crop advisory feed with Hindi & regional language toggle', type: 'feature', status: 'ready' },
      { id: 'fa-i2', title: 'On-device leaf blight diagnostic classifier (TensorFlow Lite)', type: 'feature', status: 'in_progress' },
      { id: 'fa-i3', title: 'High-contrast large touch targets for outdoor sunlight readability', type: 'ui_ux', status: 'ready' },
      { id: 'fa-i4', title: 'Resolve image compression artifacting on low-end Android phones', type: 'bugfix', status: 'in_progress' },
    ],
  },
  {
    id: 'ver-ca-1',
    productId: 'campus',
    productName: 'DelegateCampus',
    versionNumber: 'v1.4.0',
    status: 'in_development',
    targetReleaseDate: '2026-12-05',
    headline: 'Off-Campus Tech Job Board & Verified Student Discussions',
    items: [
      { id: 'ca-i1', title: 'Verified fresher & internship listings with 1-click apply links', type: 'feature', status: 'ready' },
      { id: 'ca-i2', title: 'College-specific community forum threads & upvoting', type: 'feature', status: 'in_progress' },
      { id: 'ca-i3', title: 'Interactive DSA roadmap checklist for tech interview prep', type: 'feature', status: 'planned' },
      { id: 'ca-i4', title: 'Smooth swipe transitions between discussion posts', type: 'ui_ux', status: 'ready' },
    ],
  },
  {
    id: 'ver-ds-1',
    productId: 'delegatespace',
    productName: 'Delegatespace',
    versionNumber: 'v2.0.0',
    status: 'in_development',
    targetReleaseDate: '2026-11-30',
    headline: 'Studio Portfolio Showcase & Client Milestone Portal',
    items: [
      { id: 'ds-i1', title: 'Interactive mobile & web client case studies with architecture diagrams', type: 'feature', status: 'ready' },
      { id: 'ds-i2', title: 'Client live milestone tracking link & sprint sign-off dashboard', type: 'feature', status: 'in_progress' },
      { id: 'ds-i3', title: 'Luxury dark obsidian aesthetic with KaTeX mathematical formulas', type: 'ui_ux', status: 'ready' },
      { id: 'ds-i4', title: 'Direct WhatsApp & Calendly booking integration', type: 'feature', status: 'ready' },
    ],
  },
];

// 3. Testing, Regression Suite & Release Readiness
export interface RegressionTestItem {
  id: string;
  category: 'auth' | 'core_workflows' | 'payments' | 'mobile_responsive' | 'performance';
  title: string;
  description: string;
  status: 'passed' | 'failed' | 'pending';
}

export const INITIAL_REGRESSION_SUITE: RegressionTestItem[] = [
  { id: 'rt-1', category: 'auth', title: 'JWT / Session Persistence across Reloads', description: 'Token refresh, expired session redirection to lockscreen.', status: 'passed' },
  { id: 'rt-2', category: 'core_workflows', title: 'Delegatework Standup Generation & Markdown Output', description: 'Ensure standup form properly serializes checklists and timestamps.', status: 'passed' },
  { id: 'rt-3', category: 'core_workflows', title: 'Fasly Crop Advisory Offline Cache Load', description: 'Ensure previous advisory content displays even without network.', status: 'passed' },
  { id: 'rt-4', category: 'core_workflows', title: 'Campus Job Application Link External Handling', description: 'Verify external links open correctly and do not trigger app navigation errors.', status: 'passed' },
  { id: 'rt-5', category: 'mobile_responsive', title: 'iOS Safari Viewport Height & Input Focus Keyboard Glitches', description: 'Ensure 100dvh prevents jumpy bottom toolbar behavior.', status: 'passed' },
  { id: 'rt-6', category: 'mobile_responsive', title: 'Android Chrome Modal Scrolling & Backdrop Blur', description: 'Modal backdrop-blur renders cleanly without frame drops.', status: 'passed' },
  { id: 'rt-7', category: 'performance', title: 'Next.js Production Webpack Build Compilation (< 2.0s)', description: 'Zero TypeScript errors, static export verification.', status: 'passed' },
  { id: 'rt-8', category: 'performance', title: 'Lighthouse Core Web Vitals (LCP < 1.5s, CLS < 0.05)', description: 'Audit home, about, services, and /today dashboard routes.', status: 'pending' },
];

// 4. Sunday Milestone & Feature Spec
export interface SundaySprintSpec {
  rotationWeek: number;
  productName: string;
  featureTitle: string;
  featureObjective: string;
  timelineSchedule: Array<{ timeWindow: string; title: string; hours: number; output: string }>;
  architectureFlow: Array<{ step: number; name: string; details: string }>;
  acceptanceCriteria: Array<{ id: string; text: string; done: boolean }>;
}

export const CURRENT_SUNDAY_SPEC: SundaySprintSpec = {
  rotationWeek: 1,
  productName: 'Delegatework (Teams & Async Platform)',
  featureTitle: 'Async Team Daily Standup Engine & Automated AI Rollup',
  featureObjective: 'Eliminate mandatory morning Zoom calls by providing a sub-60-second async standup flow with structured Today/Yesterday/Blockers and an automated Slack digest.',
  timelineSchedule: [
    { timeWindow: '09:00 AM – 01:00 PM (4.0h)', title: 'Primary Architecture & Standup Input UI', hours: 4, output: 'Modal form, autosave state, keyboard shortcuts & responsive layout.' },
    { timeWindow: '02:00 PM – 04:00 PM (2.0h)', title: 'Database Schema & Webhook Dispatcher', hours: 2, output: 'API endpoints for submitting standups and dispatching to Slack channels.' },
    { timeWindow: '04:30 PM – 06:30 PM (2.0h)', title: 'Secondary Integration: Campus Tech Job Linker', hours: 2, output: 'Connect student profile links directly to off-campus openings.' },
    { timeWindow: '07:00 PM – 08:00 PM (1.0h)', title: 'End-to-End Regression Checks', hours: 1, output: 'Verify user permissions, input sanitation & offline resilience.' },
    { timeWindow: '08:00 PM – 09:00 PM (1.0h)', title: 'Next-Week Sprint Planning & Metrics Review', hours: 1, output: 'Audit 39.5 hours, finalize Week 2 priorities.' },
    { timeWindow: '09:00 PM – 10:00 PM (1.0h)', title: 'Buffer & PR Merge', hours: 1, output: 'Clean git commits, documentation updates.' },
  ],
  architectureFlow: [
    { step: 1, name: 'Client Input State', details: 'React state with local debounce saving draft in indexedDB/localStorage.' },
    { step: 2, name: 'API Route (/api/standup)', details: 'Next.js App router edge function validating session and payload size.' },
    { step: 3, name: 'Dual Persistence', details: 'Writes to MongoDB Atlas cluster with local JSON fallback cache.' },
    { step: 4, name: 'Webhook Event', details: 'Async job dispatches formatted block message to configured Slack incoming webhook.' },
  ],
  acceptanceCriteria: [
    { id: 'ac-1', text: 'User can submit 3 pillars: What I shipped, What I will do today, Blockers', done: true },
    { id: 'ac-2', text: 'Form prevents accidental closure with dirty state prompt', done: false },
    { id: 'ac-3', text: 'Formatted summary card renders cleanly in team feed', done: false },
    { id: 'ac-4', text: 'Zero layout shift on mobile viewports (< 400px)', done: true },
  ],
};

// 5. SEO Review & Company Website Optimization
export interface SEOKeywordTarget {
  id: string;
  keyword: string;
  targetProduct: string;
  currentRank: string;
  monthlyVolume: string;
  difficulty: 'Low' | 'Medium' | 'High';
  targetUrl: string;
  status: 'Ranking' | 'Indexed' | 'Drafting' | 'Targeted';
}

export const INITIAL_SEO_TARGETS: SEOKeywordTarget[] = [
  { id: 'seo-1', keyword: 'Best lightweight Microsoft Teams alternative', targetProduct: 'Delegatework', currentRank: '#14', monthlyVolume: '2,400', difficulty: 'Medium', targetUrl: 'https://delegatework.in/compare/teams', status: 'Ranking' },
  { id: 'seo-2', keyword: 'Async standup software for software engineers', targetProduct: 'Delegatework', currentRank: '#8', monthlyVolume: '1,800', difficulty: 'Low', targetUrl: 'https://delegatework.in/features/async-standup', status: 'Ranking' },
  { id: 'seo-3', keyword: 'Winter rabi crop advisory mobile app India', targetProduct: 'Fasly', currentRank: '#6', monthlyVolume: '4,500', difficulty: 'Low', targetUrl: 'https://fasly.in/advisory/winter-crops', status: 'Ranking' },
  { id: 'seo-4', keyword: 'Off-campus software engineer internship 2026', targetProduct: 'Campus', currentRank: '#19', monthlyVolume: '8,200', difficulty: 'High', targetUrl: 'https://delegatecampus.in/jobs/internships', status: 'Indexed' },
  { id: 'seo-5', keyword: 'Flutter and Swift app development studio Delhi NCR', targetProduct: 'Delegatespace', currentRank: '#11', monthlyVolume: '1,200', difficulty: 'Medium', targetUrl: 'https://www.delegatespace.com/services', status: 'Ranking' },
];

// 6. Sales & Communication Learning Hub
export interface PracticeSessionLog {
  id: string;
  date: string;
  track: 'communication' | 'sales';
  title: string;
  durationMinutes: number;
  score: number; // 1-10
  keyTakeaway: string;
  frameworkUsed: string; // e.g. "STAR Technique", "SPIN Selling", "BLUF"
}

export const INITIAL_PRACTICE_SESSIONS: PracticeSessionLog[] = [
  {
    id: 'ps-1',
    date: '2026-11-20',
    track: 'communication',
    title: 'Explaining Redis Eviction Policies & Distributed Caching Trade-offs',
    durationMinutes: 20,
    score: 8.5,
    keyTakeaway: 'Great clarity on Cache-Aside vs Write-Through. Need to reduce filler words ("um", "like") when explaining edge cases.',
    frameworkUsed: 'PREP (Point, Reason, Example, Point)',
  },
  {
    id: 'ps-2',
    date: '2026-11-19',
    track: 'sales',
    title: 'Consultative B2B Discovery Pitch for AeroSync Logistics',
    durationMinutes: 25,
    score: 9.0,
    keyTakeaway: 'Anchored on cost of driver downtime rather than technical hours. Client agreed on milestone-based sprint pricing.',
    frameworkUsed: 'Value-First Discovery Call Formula',
  },
  {
    id: 'ps-3',
    date: '2026-11-18',
    track: 'communication',
    title: 'STAR Story Drill: Resolving High-Severity Production Outage in Mobile App',
    durationMinutes: 15,
    score: 8.0,
    keyTakeaway: 'Strong emphasis on Action & Result metrics (reduced crash rate from 4.2% to 0.05%). Keep the Situation under 45 seconds.',
    frameworkUsed: 'STAR (Situation, Task, Action, Result)',
  },
  {
    id: 'ps-4',
    date: '2026-11-17',
    track: 'sales',
    title: 'Overcoming Objection: "Why hire your studio instead of hiring a full-time in-house developer?"',
    durationMinutes: 20,
    score: 8.5,
    keyTakeaway: 'Demonstrated that Delegatespace provides immediate senior execution without 3-month hiring lag or recruiter overhead.',
    frameworkUsed: 'Feel-Felt-Found + ROI Framing',
  },
];

