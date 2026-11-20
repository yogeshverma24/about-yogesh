// src/lib/today/models.ts
import mongoose, { Schema, Document, Model } from 'mongoose';
import { TaskItem, HabitItem, FinancialRecord, MilestoneItem, PersonalProfile } from './types';

// Task Schema
const TaskSchema = new Schema<TaskItem>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    mode: { type: String, enum: ['personal', 'business', 'job'], required: true },
    category: { type: String, required: true },
    timeframe: { type: String, enum: ['today', 'week', 'month', 'six_months'], required: true },
    status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
    priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
    dueDate: { type: String },
    reminderTime: { type: String },
    checklist: [
      {
        id: String,
        text: String,
        done: Boolean,
      },
    ],
    tags: [String],
    aiGenerated: { type: Boolean, default: false },
    notes: String,
    externalLink: String,
    completedAt: String,
  },
  { timestamps: true }
);

// Habit Schema
const HabitSchema = new Schema<HabitItem>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    mode: { type: String, enum: ['personal', 'business', 'job'], required: true },
    category: { type: String, required: true },
    frequency: { type: String, enum: ['daily', 'weekly'], default: 'daily' },
    streak: { type: Number, default: 0 },
    bestStreak: { type: Number, default: 0 },
    completedDates: [String],
    icon: String,
    notes: String,
  },
  { timestamps: true }
);

// Finance Schema
const FinanceSchema = new Schema<FinancialRecord>(
  {
    id: { type: String, required: true, unique: true },
    type: { type: String, enum: ['income', 'expense', 'investment', 'goal'], required: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    targetAmount: Number,
    category: { type: String, required: true },
    date: { type: String, required: true },
    month: { type: String, required: true },
    notes: String,
  },
  { timestamps: true }
);

// Milestone Schema
const MilestoneSchema = new Schema<MilestoneItem>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    mode: { type: String, enum: ['personal', 'business', 'job'], required: true },
    timeframe: { type: String, enum: ['month', 'six_months'], required: true },
    category: { type: String, required: true },
    targetDate: { type: String, required: true },
    progress: { type: Number, default: 0 },
    metric: { type: String, required: true },
    status: { type: String, enum: ['not_started', 'in_progress', 'achieved'], default: 'in_progress' },
    keyResults: [String],
  },
  { timestamps: true }
);

// Profile Schema
const ProfileSchema = new Schema<PersonalProfile>(
  {
    name: { type: String, default: 'Yogesh Verma' },
    role: { type: String, default: 'Founder & Senior Software Solutions Developer' },
    energyLevel: { type: String, enum: ['high', 'medium', 'low'], default: 'high' },
    dailyFocusStatement: { type: String, default: 'Build relentlessly, master engineering depth, and compound daily habits.' },
    currentStreak: { type: Number, default: 14 },
    morningRoutineCompleted: { type: Boolean, default: false },
    nightReviewCompleted: { type: Boolean, default: false },
    waterIntakeGlasses: { type: Number, default: 4 },
    sleepHours: { type: Number, default: 7.5 },
  },
  { timestamps: true }
);

// Settings Schema (for custom password, reminders, etc.)
const SettingsSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    value: Schema.Types.Mixed,
  },
  { timestamps: true }
);

export const TaskModel: Model<any> =
  mongoose.models.TodayTask || mongoose.model('TodayTask', TaskSchema);

export const HabitModel: Model<any> =
  mongoose.models.TodayHabit || mongoose.model('TodayHabit', HabitSchema);

export const FinanceModel: Model<any> =
  mongoose.models.TodayFinance || mongoose.model('TodayFinance', FinanceSchema);

export const MilestoneModel: Model<any> =
  mongoose.models.TodayMilestone || mongoose.model('TodayMilestone', MilestoneSchema);

export const ProfileModel: Model<any> =
  mongoose.models.TodayProfile || mongoose.model('TodayProfile', ProfileSchema);

export const SettingsModel: Model<any> =
  mongoose.models.TodaySettings || mongoose.model('TodaySettings', SettingsSchema);
