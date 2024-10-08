import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { defaultFields } from './constants';
import { users } from './user.schema';
import { relations } from 'drizzle-orm';
import { posts } from './post.schema';

export const comments = pgTable('comments', {
  ...defaultFields,
  text: text('text').notNull(),
  userId: uuid('userId')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  postId: uuid('postId')
    .references(() => posts.id, { onDelete: 'cascade' })
    .notNull(),
});

export const commentsRelations = relations(comments, ({ one }) => ({
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
}));
