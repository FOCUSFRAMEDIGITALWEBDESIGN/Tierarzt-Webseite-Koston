import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const administrators = sqliteTable('administrators', {
  userId: text('user_id').primaryKey(),
  slot: text('slot').notNull().unique(),
  createdAt: text('created_at').notNull(),
});
export const settings = sqliteTable('settings', { key: text('key').primaryKey(), value: text('value').notNull() });
export const trainings = sqliteTable('trainings', {
  id: text('id').primaryKey(), person: text('person').notNull(), category: text('category').notNull(),
  title: text('title').notNull(), provider: text('provider').notNull().default(''),
  location: text('location').notNull().default(''), date: text('date').notNull().default(''),
  endDate: text('end_date').notNull().default(''), description: text('description').notNull().default(''),
  published: integer('published').notNull().default(1), createdAt: text('created_at').notNull(), updatedAt: text('updated_at').notNull(),
});
export const images = sqliteTable('images', {
  id: text('id').primaryKey(), storageKey: text('storage_key'), source: text('source').notNull().default(''),
  title: text('title').notNull(), alt: text('alt').notNull(), category: text('category').notNull().default('Praxis'),
  person: text('person').notNull().default(''), position: integer('position').notNull().default(0),
  published: integer('published').notNull().default(1), contentType: text('content_type').notNull().default('image/jpeg'), createdAt: text('created_at').notNull(),
});
export const requestLimits = sqliteTable('request_limits', {
  scope: text('scope').primaryKey(), windowStart: integer('window_start').notNull(), count: integer('count').notNull(),
});
export const adminEvents = sqliteTable('admin_events', {
  id: text('id').primaryKey(), userId: text('user_id').notNull(), action: text('action').notNull(),
  targetId: text('target_id').notNull(), createdAt: text('created_at').notNull(),
});
export const adminPasswords = sqliteTable('admin_passwords', {
  userId: text('user_id').primaryKey(), passwordHash: text('password_hash').notNull(),
  version: integer('version').notNull(), updatedAt: text('updated_at').notNull(),
});
export const adminSessions = sqliteTable('admin_sessions', {
  tokenHash: text('token_hash').primaryKey(), userId: text('user_id').notNull(),
  passwordVersion: integer('password_version').notNull(), expiresAt: integer('expires_at').notNull(), createdAt: integer('created_at').notNull(),
});
