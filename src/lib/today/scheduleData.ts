// src/lib/today/scheduleData.ts
import { DaySchedule, ProductRotationWeek, FounderChecklistItem } from './types';

export const MASTER_WEEKLY_SCHEDULE: DaySchedule[] = [
  {
    dayKey: 'monday',
    dayName: 'Monday',
    shortDay: 'Mon',
    focusTitle: 'Technical Skills & Weekly Planning',
    totalHours: 3.5,
    timeWindow: '7:30 PM – 11:00 PM',
    isWeekend: false,
    tag: 'Technical & Strategy',
    blocks: [
      {
        id: 'mon-1',
        title: 'Flutter / SwiftUI Deep Dive',
        hours: 1.5,
        description: 'Focus on production skills that accelerate career depth and DelegateSpace mobile apps.',
        category: 'learning',
      },
      {
        id: 'mon-2',
        title: 'Product Backlog & Priorities Audit',
        hours: 1.0,
        description: 'Review issue backlogs, customer requests, and lock in the 3 must-win outcomes for this week.',
        category: 'planning',
      },
      {
        id: 'mon-3',
        title: 'Technical Research & Architecture',
        hours: 1.0,
        description: 'Evaluate system architecture, API contracts, and engineering feasibility for upcoming features.',
        category: 'architecture',
      },
    ],
  },
  {
    dayKey: 'tuesday',
    dayName: 'Tuesday',
    shortDay: 'Tue',
    focusTitle: 'Sales & Client Acquisition',
    totalHours: 3.5,
    timeWindow: '7:30 PM – 11:00 PM',
    isWeekend: false,
    tag: 'Highest Business Priority',
    blocks: [
      {
        id: 'tue-1',
        title: 'Find & Qualify Potential Clients',
        hours: 1.0,
        description: 'Target businesses needing high-quality mobile apps, web apps, SaaS tools, or backend engineering.',
        category: 'lead_generation',
      },
      {
        id: 'tue-2',
        title: 'Personalised Outreach & Networking',
        hours: 1.5,
        description: 'Send high-intent, consultative direct outreach, engage founders, and build relationship pipeline.',
        category: 'outreach',
      },
      {
        id: 'tue-3',
        title: 'Follow-ups, Proposals & CRM Pipeline',
        hours: 1.0,
        description: 'Follow up with active conversations, draft project scopes, and update CRM lead status.',
        category: 'crm_proposals',
      },
    ],
  },
  {
    dayKey: 'wednesday',
    dayName: 'Wednesday',
    shortDay: 'Wed',
    focusTitle: 'Client Delivery & Operations',
    totalHours: 3.5,
    timeWindow: '7:30 PM – 11:00 PM',
    isWeekend: false,
    tag: 'Client Revenue & Studio',
    blocks: [
      {
        id: 'wed-1',
        title: 'Paid Client Delivery or Project Scoping',
        hours: 2.0,
        description: 'High-focus execution on active client milestones, deliverables, and technical scoping.',
        category: 'client_work',
      },
      {
        id: 'wed-2',
        title: 'Portfolio, Case Studies & Proof of Work',
        hours: 1.0,
        description: 'Document completed projects, write technical case studies, and polish Delegatespace portfolio.',
        category: 'portfolio',
      },
      {
        id: 'wed-3',
        title: 'Freelancer Coordination & Operations Admin',
        hours: 0.5,
        description: 'Review contractor commits, align deliverables, and manage administrative invoices.',
        category: 'operations',
      },
    ],
  },
  {
    dayKey: 'thursday',
    dayName: 'Thursday',
    shortDay: 'Thu',
    focusTitle: 'DelegateSpace & DelegateWork Growth',
    totalHours: 3.5,
    timeWindow: '7:30 PM – 11:00 PM',
    isWeekend: false,
    tag: 'B2B & Platform Growth',
    blocks: [
      {
        id: 'thu-1',
        title: 'SEO Review & Company Website Optimization',
        hours: 1.0,
        description: 'Audit organic search rankings, site vitals, meta tags, and inbound traffic conversion.',
        category: 'seo',
      },
      {
        id: 'thu-2',
        title: 'DelegateWork Demos & B2B Prospects',
        hours: 1.5,
        description: 'Conduct product demonstrations, demo recording, and engage engineering teams on async workflows.',
        category: 'b2b_demos',
      },
      {
        id: 'thu-3',
        title: 'Service Offers & Thought Leadership Content',
        hours: 1.0,
        description: 'Draft high-value development packages and publish LinkedIn insights on modern team execution.',
        category: 'content_marketing',
      },
    ],
  },
  {
    dayKey: 'friday',
    dayName: 'Friday',
    shortDay: 'Fri',
    focusTitle: 'Campus & Fasly Growth',
    totalHours: 3.5,
    timeWindow: '7:30 PM – 11:00 PM',
    isWeekend: false,
    tag: 'Product User Expansion',
    blocks: [
      {
        id: 'fri-1',
        title: 'Campus User Growth & Student Engagement',
        hours: 1.25,
        description: 'Curate verified tech job postings, engage student developer communities, and analyze retention.',
        category: 'campus_growth',
      },
      {
        id: 'fri-2',
        title: 'Fasly User Acquisition & Farmer Feedback',
        hours: 1.25,
        description: 'Publish crop advisory content, review farmer app feedback, and expand regional agricultural outreach.',
        category: 'fasly_growth',
      },
      {
        id: 'fri-3',
        title: 'Growth Analytics & Experiment Synthesis',
        hours: 1.0,
        description: 'Evaluate conversion funnels, test new onboarding copy, and prepare next week growth sprint.',
        category: 'analytics',
      },
    ],
  },
  {
    dayKey: 'saturday',
    dayName: 'Saturday',
    shortDay: 'Sat',
    focusTitle: 'Development & Maintenance (Existing Products & Client Delivery)',
    totalHours: 11.0,
    timeWindow: 'Full-Day Uninterrupted Sprint',
    isWeekend: true,
    tag: 'Engineering Maintenance & Delivery',
    blocks: [
      {
        id: 'sat-1',
        title: 'Client Projects Sprint',
        hours: 4.0,
        description: 'Implement core client features, resolve high-priority bug tickets, and hit contract deadlines.',
        category: 'client_delivery',
      },
      {
        id: 'sat-2',
        title: 'Existing Product Improvements & UI/UX Polish',
        hours: 4.0,
        description: 'Deploy version upgrades, optimize layout response, and eliminate production bugs across live apps.',
        category: 'product_maintenance',
      },
      {
        id: 'sat-3',
        title: 'Testing, Regression Suite & Release Readiness',
        hours: 2.0,
        description: 'Run automated end-to-end regression tests, verify build artifacts, and stage production releases.',
        category: 'qa_releases',
      },
      {
        id: 'sat-4',
        title: 'Development Review & Sunday Milestone Lock',
        hours: 1.0,
        description: 'Review Saturday code merges and clearly define Sunday primary milestone scope.',
        category: 'review',
      },
    ],
  },
  {
    dayKey: 'sunday',
    dayName: 'Sunday',
    shortDay: 'Sun',
    focusTitle: 'Product Development & Testing (Products in Development)',
    totalHours: 11.0,
    timeWindow: 'Full-Day Deep Product Sprint',
    isWeekend: true,
    tag: 'Deep Product Sprint',
    blocks: [
      {
        id: 'sun-1',
        title: 'Primary Product Sprint',
        hours: 6.0,
        description: 'One product, one meaningful feature or end-to-end workflow built to completion.',
        category: 'primary_sprint',
      },
      {
        id: 'sun-2',
        title: 'Secondary Product or Integration',
        hours: 2.0,
        description: 'Ship a smaller, clearly scoped module, API connector, or third-party service integration.',
        category: 'secondary_sprint',
      },
      {
        id: 'sun-3',
        title: 'Testing & Quality Checks',
        hours: 1.0,
        description: 'Thoroughly verify completed workflows, validate edge cases, and ensure stability.',
        category: 'testing',
      },
      {
        id: 'sun-4',
        title: 'Next-Week Planning & Metrics Review',
        hours: 1.0,
        description: 'Analyze weekly KPIs, complete Founder Weekly Checklist, and lock in the upcoming week.',
        category: 'weekly_planning',
      },
      {
        id: 'sun-5',
        title: 'Buffer Block',
        hours: 1.0,
        description: 'Handle unexpected bugs, documentation catch-up, or spillover tasks before the week starts.',
        category: 'buffer',
      },
    ],
  },
];

export const PRODUCT_ROTATION_WEEKS: ProductRotationWeek[] = [
  {
    weekNumber: 1,
    title: 'Week 1: DelegateWork Sprint',
    primaryFocus: 'DelegateWork (Teams & Async Workflows)',
    secondaryFocus: 'DelegateCampus (Student Community)',
    description: 'Prioritise product demos, team workspace features, paying customer onboarding, and async boards.',
  },
  {
    weekNumber: 2,
    title: 'Week 2: DelegatePrep / Job Sprint',
    primaryFocus: 'DelegatePrep & Career Mastery',
    secondaryFocus: 'DelegateWork (B2B Prospects)',
    description: 'Focus on completing end-to-end interview simulation flows, technical depth, and system design mock questions.',
  },
  {
    weekNumber: 3,
    title: 'Week 3: Fasly Agriculture Sprint',
    primaryFocus: 'Fasly (Farmer Advisory & Crops)',
    secondaryFocus: 'DelegateCampus (Job Board)',
    description: 'Prioritise user growth, farmer disease detection updates, regional partnerships, and community feedback.',
  },
  {
    weekNumber: 4,
    title: 'Week 4: Highest-Priority Launch Sprint',
    primaryFocus: 'Highest-Priority Product (Launch Ready)',
    secondaryFocus: 'Testing, Hardening & Maintenance',
    description: 'Double down on the product nearest to monetization or launch; run regression suite and performance polish.',
  },
];

export const INITIAL_FOUNDER_CHECKLIST: FounderChecklistItem[] = [
  { id: 'fc-1', text: 'Complete 5 weekday work sessions (3.5 hours each)', done: false },
  { id: 'fc-2', text: 'Identify and contact suitable client prospects', done: false },
  { id: 'fc-3', text: 'Follow up on active leads and proposals', done: false },
  { id: 'fc-4', text: 'Review SEO progress and qualified enquiries', done: false },
  { id: 'fc-5', text: 'Complete one primary development milestone', done: false },
  { id: 'fc-6', text: 'Test and document completed changes', done: false },
  { id: 'fc-7', text: 'Review Campus and Fasly growth metrics', done: false },
  { id: 'fc-8', text: 'Choose next week main product and top 3 outcomes', done: false },
];

/**
 * Get current day of week schedule
 */
export function getScheduleForDay(dayIndex: number): DaySchedule {
  // Sunday = 0, Monday = 1, ..., Saturday = 6
  // We map: 1 -> monday (0), 2 -> tuesday (1), 3 -> wednesday (2), 4 -> thursday (3), 5 -> friday (4), 6 -> saturday (5), 0 -> sunday (6)
  const map: Record<number, number> = {
    1: 0,
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
    0: 6,
  };
  const idx = map[dayIndex] ?? 0;
  return MASTER_WEEKLY_SCHEDULE[idx];
}

