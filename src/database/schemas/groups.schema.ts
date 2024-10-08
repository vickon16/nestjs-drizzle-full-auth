import { relations } from 'drizzle-orm';
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { userToGroup } from './userToGroup.schema';

export const groups = pgTable('groups', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
});

export const groupsRelations = relations(groups, ({ many }) => ({
  userToGroup: many(userToGroup),
}));
