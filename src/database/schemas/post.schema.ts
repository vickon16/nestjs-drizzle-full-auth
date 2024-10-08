import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { defaultFields } from './constants';
import { users } from './user.schema';
import { relations } from 'drizzle-orm';
import { comments } from './comment.schema';

export const posts = pgTable('posts', {
  ...defaultFields,
  title: text('title').notNull(),
  content: text('content').notNull(),
  userId: uuid('userId')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
});

export const postsRelations = relations(posts, ({ one, many }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
  comments: many(comments),
}));
