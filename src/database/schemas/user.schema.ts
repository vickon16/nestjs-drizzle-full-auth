import { pgTable, text, varchar } from 'drizzle-orm/pg-core';
import { defaultFields } from './constants';
import { relations } from 'drizzle-orm';
import { profiles } from './profile.schema';
import { posts } from './post.schema';
import { comments } from './comment.schema';
import { userToGroup } from './userToGroup.schema';

export const users = pgTable('users', {
  ...defaultFields,
  username: varchar('username', { length: 100 }).notNull(),
  email: varchar('email', { length: 100 }).notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  password: text('password').notNull(),
});

export const userRelations = relations(users, ({ many, one }) => ({
  profile: one(profiles),
  posts: many(posts),
  comments: many(comments),
  userToGroup: many(userToGroup),
}));
