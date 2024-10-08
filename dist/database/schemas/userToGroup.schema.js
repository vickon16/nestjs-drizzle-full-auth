"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userToGroupRelations = exports.userToGroup = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const groups_schema_1 = require("./groups.schema");
const user_schema_1 = require("./user.schema");
const drizzle_orm_1 = require("drizzle-orm");
exports.userToGroup = (0, pg_core_1.pgTable)('user_to_group', {
    userId: (0, pg_core_1.uuid)('userId')
        .references(() => user_schema_1.users.id, { onDelete: 'cascade' })
        .notNull(),
    groupId: (0, pg_core_1.uuid)('groupId')
        .references(() => groups_schema_1.groups.id, { onDelete: 'cascade' })
        .notNull(),
}, (table) => ({
    pk: (0, pg_core_1.primaryKey)({ columns: [table.userId, table.groupId] }),
    userIdIndex: (0, pg_core_1.index)('userIdIndex').on(table.userId),
}));
exports.userToGroupRelations = (0, drizzle_orm_1.relations)(exports.userToGroup, ({ one }) => ({
    user: one(user_schema_1.users, {
        fields: [exports.userToGroup.userId],
        references: [user_schema_1.users.id],
    }),
    group: one(groups_schema_1.groups, {
        fields: [exports.userToGroup.groupId],
        references: [groups_schema_1.groups.id],
    }),
}));
//# sourceMappingURL=userToGroup.schema.js.map