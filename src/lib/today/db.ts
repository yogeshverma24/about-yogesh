// src/lib/today/db.ts
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import {
  TaskItem,
  HabitItem,
  FinancialRecord,
  MilestoneItem,
  PersonalProfile,
  TodayDashboardState,
  FounderChecklistItem,
} from './types';
import {
  initialProfile,
  initialTasks,
  initialHabits,
  initialFinances,
  initialMilestones,
} from './seed';
import { INITIAL_FOUNDER_CHECKLIST } from './scheduleData';
import {
  TaskModel,
  HabitModel,
  FinanceModel,
  MilestoneModel,
  ProfileModel,
  SettingsModel,
} from './models';

const DATA_DIR = path.join(process.cwd(), '.data');
const STORE_FILE = path.join(DATA_DIR, 'today-store.json');

// Global cache for connection in development
let isMongoConnected = false;
let mongoConnectionPromise: Promise<boolean> | null = null;

async function checkMongoConnection(): Promise<boolean> {
  const uri = process.env.MONGODB_URI;
  if (!uri) return false;

  if (mongoose.connection.readyState === 1) {
    isMongoConnected = true;
    return true;
  }

  if (mongoConnectionPromise) {
    return await mongoConnectionPromise;
  }

  mongoConnectionPromise = (async () => {
    try {
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 2000,
        connectTimeoutMS: 2000,
      });
      isMongoConnected = true;
      console.log('✓ Connected to MongoDB Atlas for /today');
      return true;
    } catch (err: any) {
      isMongoConnected = false;
      // Silently fall back to persistent local JSON store
      return false;
    } finally {
      mongoConnectionPromise = null;
    }
  })();

  return await mongoConnectionPromise;
}

// ----------------- LOCAL JSON STORE FALLBACK -----------------

function ensureLocalDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    try {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    } catch {}
  }
}

function getLocalState(): TodayDashboardState & { settings: Record<string, any> } {
  ensureLocalDataDir();
  if (!fs.existsSync(STORE_FILE)) {
    const initialState = {
      profile: initialProfile,
      tasks: initialTasks,
      habits: initialHabits,
      finances: initialFinances,
      milestones: initialMilestones,
      settings: {},
    };
    try {
      fs.writeFileSync(STORE_FILE, JSON.stringify(initialState, null, 2), 'utf-8');
    } catch {}
    return initialState;
  }

  try {
    const raw = fs.readFileSync(STORE_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return {
      profile: parsed.profile || initialProfile,
      tasks: parsed.tasks || initialTasks,
      habits: parsed.habits || initialHabits,
      finances: parsed.finances || initialFinances,
      milestones: parsed.milestones || initialMilestones,
      founderChecklist: parsed.founderChecklist || INITIAL_FOUNDER_CHECKLIST,
      activeRotationWeek: parsed.activeRotationWeek || 1,
      weeklyHoursLogged: parsed.weeklyHoursLogged || 14.5,
      settings: parsed.settings || {},
    };
  } catch {
    return {
      profile: initialProfile,
      tasks: initialTasks,
      habits: initialHabits,
      finances: initialFinances,
      milestones: initialMilestones,
      founderChecklist: INITIAL_FOUNDER_CHECKLIST,
      activeRotationWeek: 1,
      weeklyHoursLogged: 14.5,
      settings: {},
    };
  }
}

function saveLocalState(state: Partial<TodayDashboardState & { settings?: Record<string, any> }>) {
  ensureLocalDataDir();
  const current = getLocalState();
  const updated = {
    ...current,
    ...state,
    settings: {
      ...current.settings,
      ...(state.settings || {}),
    },
  };
  try {
    fs.writeFileSync(STORE_FILE, JSON.stringify(updated, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write local store:', err);
  }
}

// ----------------- UNIFIED API -----------------

export async function getDashboardState(): Promise<TodayDashboardState> {
  const hasMongo = await checkMongoConnection();

  if (hasMongo) {
    try {
      let [tasks, habits, finances, milestones, profileDoc] = await Promise.all([
        TaskModel.find().lean(),
        HabitModel.find().lean(),
        FinanceModel.find().lean(),
        MilestoneModel.find().lean(),
        ProfileModel.findOne().lean(),
      ]);

      // Seed MongoDB if empty
      if (tasks.length === 0) {
        await TaskModel.insertMany(initialTasks);
        tasks = await TaskModel.find().lean();
      }
      if (habits.length === 0) {
        await HabitModel.insertMany(initialHabits);
        habits = await HabitModel.find().lean();
      }
      if (finances.length === 0) {
        await FinanceModel.insertMany(initialFinances);
        finances = await FinanceModel.find().lean();
      }
      if (milestones.length === 0) {
        await MilestoneModel.insertMany(initialMilestones);
        milestones = await MilestoneModel.find().lean();
      }
      let profile = profileDoc as unknown as PersonalProfile;
      if (!profile) {
        const created = await ProfileModel.create(initialProfile);
        profile = created.toObject() as unknown as PersonalProfile;
      }

      return {
        tasks: tasks.map((t: any) => ({ ...t, id: t.id || t._id.toString() })),
        habits: habits.map((h: any) => ({ ...h, id: h.id || h._id.toString() })),
        finances: finances.map((f: any) => ({ ...f, id: f.id || f._id.toString() })),
        milestones: milestones.map((m: any) => ({ ...m, id: m.id || m._id.toString() })),
        profile: profile || initialProfile,
      };
    } catch {
      // Fall through to local state on mongo query error
    }
  }

  const local = getLocalState();
  return {
    tasks: local.tasks,
    habits: local.habits,
    finances: local.finances,
    milestones: local.milestones,
    profile: local.profile,
    founderChecklist: local.founderChecklist || INITIAL_FOUNDER_CHECKLIST,
    activeRotationWeek: local.activeRotationWeek || 1,
    weeklyHoursLogged: local.weeklyHoursLogged || 14.5,
  };
}

export async function updateFounderSchedule(updates: {
  founderChecklist?: FounderChecklistItem[];
  activeRotationWeek?: number;
  weeklyHoursLogged?: number;
}): Promise<{
  founderChecklist: FounderChecklistItem[];
  activeRotationWeek: number;
  weeklyHoursLogged: number;
}> {
  const local = getLocalState();
  if (updates.founderChecklist) local.founderChecklist = updates.founderChecklist;
  if (updates.activeRotationWeek !== undefined) local.activeRotationWeek = updates.activeRotationWeek;
  if (updates.weeklyHoursLogged !== undefined) local.weeklyHoursLogged = updates.weeklyHoursLogged;

  saveLocalState({
    founderChecklist: local.founderChecklist,
    activeRotationWeek: local.activeRotationWeek,
    weeklyHoursLogged: local.weeklyHoursLogged,
  });

  return {
    founderChecklist: local.founderChecklist || INITIAL_FOUNDER_CHECKLIST,
    activeRotationWeek: local.activeRotationWeek || 1,
    weeklyHoursLogged: local.weeklyHoursLogged || 14.5,
  };
}

export async function getTasks(filter?: {
  mode?: string;
  timeframe?: string;
  category?: string;
  status?: string;
}): Promise<TaskItem[]> {
  const state = await getDashboardState();
  let list = state.tasks;

  if (filter?.mode && filter.mode !== 'all') {
    list = list.filter((t) => t.mode === filter.mode);
  }
  if (filter?.timeframe && filter.timeframe !== 'all') {
    list = list.filter((t) => t.timeframe === filter.timeframe);
  }
  if (filter?.category && filter.category !== 'all') {
    list = list.filter((t) => t.category === filter.category);
  }
  if (filter?.status && filter.status !== 'all') {
    list = list.filter((t) => t.status === filter.status);
  }

  return list;
}

export async function createTask(item: Partial<TaskItem>): Promise<TaskItem> {
  const newTask: TaskItem = {
    id: item.id || `task-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    title: item.title || 'Untitled Task',
    description: item.description || '',
    mode: item.mode || 'personal',
    category: item.category || 'general',
    timeframe: item.timeframe || 'today',
    status: item.status || 'pending',
    priority: item.priority || 'medium',
    dueDate: item.dueDate || new Date().toISOString().split('T')[0],
    reminderTime: item.reminderTime,
    checklist: item.checklist || [],
    tags: item.tags || [],
    aiGenerated: item.aiGenerated || false,
    notes: item.notes || '',
    externalLink: item.externalLink,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const hasMongo = await checkMongoConnection();
  if (hasMongo) {
    try {
      await TaskModel.create(newTask);
    } catch {}
  }

  // Also sync locally
  const local = getLocalState();
  local.tasks.unshift(newTask);
  saveLocalState({ tasks: local.tasks });

  return newTask;
}

export async function updateTask(id: string, updates: Partial<TaskItem>): Promise<TaskItem | null> {
  const hasMongo = await checkMongoConnection();
  let updatedTask: TaskItem | null = null;

  if (hasMongo) {
    try {
      const doc = await TaskModel.findOneAndUpdate(
        { id },
        { ...updates, updatedAt: new Date().toISOString() },
        { new: true }
      ).lean();
      if (doc) {
        updatedTask = { ...(doc as any), id: (doc as any).id || (doc as any)._id.toString() };
      }
    } catch {}
  }

  const local = getLocalState();
  const index = local.tasks.findIndex((t) => t.id === id);
  if (index !== -1) {
    local.tasks[index] = {
      ...local.tasks[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    saveLocalState({ tasks: local.tasks });
    if (!updatedTask) updatedTask = local.tasks[index];
  }

  return updatedTask;
}

export async function deleteTask(id: string): Promise<boolean> {
  const hasMongo = await checkMongoConnection();
  if (hasMongo) {
    try {
      await TaskModel.deleteOne({ id });
    } catch {}
  }

  const local = getLocalState();
  const filtered = local.tasks.filter((t) => t.id !== id);
  saveLocalState({ tasks: filtered });
  return true;
}

export async function getHabits(): Promise<HabitItem[]> {
  const state = await getDashboardState();
  return state.habits;
}

export async function toggleHabit(id: string, dateStr: string): Promise<HabitItem | null> {
  const state = await getDashboardState();
  const habit = state.habits.find((h) => h.id === id);
  if (!habit) return null;

  const exists = habit.completedDates.includes(dateStr);
  let newDates: string[];
  if (exists) {
    newDates = habit.completedDates.filter((d) => d !== dateStr);
  } else {
    newDates = [...habit.completedDates, dateStr];
  }

  const newStreak = exists ? Math.max(0, habit.streak - 1) : habit.streak + 1;
  const newBestStreak = Math.max(habit.bestStreak, newStreak);

  const updates = {
    completedDates: newDates,
    streak: newStreak,
    bestStreak: newBestStreak,
  };

  const hasMongo = await checkMongoConnection();
  if (hasMongo) {
    try {
      await HabitModel.findOneAndUpdate({ id }, updates);
    } catch {}
  }

  const local = getLocalState();
  const idx = local.habits.findIndex((h) => h.id === id);
  if (idx !== -1) {
    local.habits[idx] = { ...local.habits[idx], ...updates };
    saveLocalState({ habits: local.habits });
    return local.habits[idx];
  }

  return { ...habit, ...updates };
}

export async function createHabit(habit: Partial<HabitItem>): Promise<HabitItem> {
  const newHabit: HabitItem = {
    id: habit.id || `habit-${Date.now()}`,
    title: habit.title || 'New Habit',
    mode: habit.mode || 'personal',
    category: habit.category || 'health',
    frequency: habit.frequency || 'daily',
    streak: 0,
    bestStreak: 0,
    completedDates: [],
    icon: habit.icon || 'check-circle',
    notes: habit.notes || '',
  };

  const hasMongo = await checkMongoConnection();
  if (hasMongo) {
    try {
      await HabitModel.create(newHabit);
    } catch {}
  }

  const local = getLocalState();
  local.habits.push(newHabit);
  saveLocalState({ habits: local.habits });
  return newHabit;
}

export async function getFinances(): Promise<FinancialRecord[]> {
  const state = await getDashboardState();
  return state.finances;
}

export async function createFinance(record: Partial<FinancialRecord>): Promise<FinancialRecord> {
  const newRecord: FinancialRecord = {
    id: record.id || `fin-${Date.now()}`,
    type: record.type || 'expense',
    title: record.title || 'Untitled Entry',
    amount: record.amount || 0,
    targetAmount: record.targetAmount,
    category: record.category || 'general',
    date: record.date || new Date().toISOString().split('T')[0],
    month: record.month || new Date().toISOString().substring(0, 7),
    notes: record.notes || '',
  };

  const hasMongo = await checkMongoConnection();
  if (hasMongo) {
    try {
      await FinanceModel.create(newRecord);
    } catch {}
  }

  const local = getLocalState();
  local.finances.push(newRecord);
  saveLocalState({ finances: local.finances });
  return newRecord;
}

export async function deleteFinance(id: string): Promise<boolean> {
  const hasMongo = await checkMongoConnection();
  if (hasMongo) {
    try {
      await FinanceModel.deleteOne({ id });
    } catch {}
  }
  const local = getLocalState();
  local.finances = local.finances.filter((f) => f.id !== id);
  saveLocalState({ finances: local.finances });
  return true;
}

export async function getMilestones(): Promise<MilestoneItem[]> {
  const state = await getDashboardState();
  return state.milestones;
}

export async function updateMilestoneProgress(id: string, progress: number): Promise<MilestoneItem | null> {
  const updates = {
    progress: Math.min(100, Math.max(0, progress)),
    status: (progress >= 100 ? 'achieved' : progress > 0 ? 'in_progress' : 'not_started') as any,
  };

  const hasMongo = await checkMongoConnection();
  if (hasMongo) {
    try {
      await MilestoneModel.findOneAndUpdate({ id }, updates);
    } catch {}
  }

  const local = getLocalState();
  const idx = local.milestones.findIndex((m) => m.id === id);
  if (idx !== -1) {
    local.milestones[idx] = { ...local.milestones[idx], ...updates };
    saveLocalState({ milestones: local.milestones });
    return local.milestones[idx];
  }

  return null;
}

export async function updateProfile(updates: Partial<PersonalProfile>): Promise<PersonalProfile> {
  const hasMongo = await checkMongoConnection();
  if (hasMongo) {
    try {
      await ProfileModel.findOneAndUpdate({}, updates, { upsert: true });
    } catch {}
  }

  const local = getLocalState();
  local.profile = { ...local.profile, ...updates };
  saveLocalState({ profile: local.profile });
  return local.profile;
}

export async function getAppSetting(key: string): Promise<any> {
  const local = getLocalState();
  return local.settings?.[key];
}

export async function setAppSetting(key: string, value: any): Promise<void> {
  const local = getLocalState();
  if (!local.settings) local.settings = {};
  local.settings[key] = value;
  saveLocalState({ settings: local.settings });

  const hasMongo = await checkMongoConnection();
  if (hasMongo) {
    try {
      await SettingsModel.findOneAndUpdate({ key }, { value }, { upsert: true });
    } catch {}
  }
}

