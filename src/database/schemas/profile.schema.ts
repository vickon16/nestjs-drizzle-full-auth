import { jsonb, pgTable, uuid } from 'drizzle-orm/pg-core';
import { defaultFields } from './constants';
import { users } from './user.schema';
import { relations } from 'drizzle-orm';

export const profiles = pgTable('profiles', {
  ...defaultFields,
  metadata: jsonb('metadata'),
  userId: uuid('userId')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
});

export const profileRelations = relations(profiles, ({ one }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id],
  }),
}));
