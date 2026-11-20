// src/lib/today/types.ts

export type DashboardMode = 'overview' | 'personal' | 'business' | 'job';

export type Timeframe = 'today' | 'week' | 'month' | 'six_months';

export type TaskPriority = 'high' | 'medium' | 'low';

export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface ChecklistItem {
  id: string;
  text: string;
  done: boolean;
}

export interface TaskItem {
  id: string;
  title: string;
  description?: string;
  mode: DashboardMode;
  category: string; // personal: 'info'|'finance'|'goals' | business: 'fasly'|'campus'|'delegatework'|'delegatespace' | job: 'dsa'|'system_design'|'flutter'|'react_native'|'ios'|'communication'
  timeframe: Timeframe;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string; // YYYY-MM-DD
  reminderTime?: string; // e.g. "10:30 AM"
  checklist?: ChecklistItem[];
  tags?: string[];
  aiGenerated?: boolean;
  notes?: string;
  externalLink?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface HabitItem {
  id: string;
  title: string;
  mode: DashboardMode;
  category: string;
  frequency: 'daily' | 'weekly';
  streak: number;
  bestStreak: number;
  completedDates: string[]; // ['2026-11-20', '2026-11-19']
  icon?: string;
  notes?: string;
}

export interface FinancialRecord {
  id: string;
  type: 'income' | 'expense' | 'investment' | 'goal';
  title: string;
  amount: number;
  targetAmount?: number;
  category: string; // 'freelance' | 'agency' | 'servers' | 'sip' | 'emergency_fund' | 'marketing' | 'personal'
  date: string;
  month: string; // '2026-11'
  notes?: string;
}

export interface MilestoneItem {
  id: string;
  title: string;
  mode: DashboardMode;
  timeframe: 'month' | 'six_months';
  category: string;
  targetDate: string;
  progress: number; // 0 - 100
  metric: string; // e.g., "50/50 LeetCode", "₹5L MRR", "10k Active Farmers"
  status: 'not_started' | 'in_progress' | 'achieved';
  keyResults: string[];
}

export interface TimeBlock {
  id: string;
  title: string;
  hours: number;
  description: string;
  category: string;
}

export interface DaySchedule {
  dayKey: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  dayName: string;
  shortDay: string;
  focusTitle: string;
  totalHours: number;
  timeWindow: string;
  isWeekend: boolean;
  tag: string;
  blocks: TimeBlock[];
}

export interface ProductRotationWeek {
  weekNumber: 1 | 2 | 3 | 4;
  title: string;
  primaryFocus: string;
  secondaryFocus: string;
  description: string;
}

export interface FounderChecklistItem {
  id: string;
  text: string;
  done: boolean;
}

export interface PersonalProfile {
  name: string;
  role: string;
  energyLevel: 'high' | 'medium' | 'low';
  dailyFocusStatement: string;
  currentStreak: number;
  morningRoutineCompleted: boolean;
  nightReviewCompleted: boolean;
  waterIntakeGlasses: number;
  sleepHours: number;
}

export interface TodayDashboardState {
  tasks: TaskItem[];
  habits: HabitItem[];
  finances: FinancialRecord[];
  milestones: MilestoneItem[];
  profile: PersonalProfile;
  founderChecklist?: FounderChecklistItem[];
  activeRotationWeek?: number;
  weeklyHoursLogged?: number;
}

