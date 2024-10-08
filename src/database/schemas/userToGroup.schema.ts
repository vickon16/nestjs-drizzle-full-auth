import { index, pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core';
import { groups } from './groups.schema';
import { users } from './user.schema';
import { relations } from 'drizzle-orm';

// many to many. this is a join table
export const userToGroup = pgTable(
  'user_to_group',
  {
    userId: uuid('userId')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    groupId: uuid('groupId')
      .references(() => groups.id, { onDelete: 'cascade' })
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.groupId] }),
    userIdIndex: index('userIdIndex').on(table.userId),
  }),
);

export const userToGroupRelations = relations(userToGroup, ({ one }) => ({
  user: one(users, {
    fields: [userToGroup.userId],
    references: [users.id],
  }),
  group: one(groups, {
    fields: [userToGroup.groupId],
    references: [groups.id],
  }),
}));
