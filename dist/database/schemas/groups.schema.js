"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupsRelations = exports.groups = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const userToGroup_schema_1 = require("./userToGroup.schema");
exports.groups = (0, pg_core_1.pgTable)('groups', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    name: (0, pg_core_1.text)('name').notNull(),
});
exports.groupsRelations = (0, drizzle_orm_1.relations)(exports.groups, ({ many }) => ({
    userToGroup: many(userToGroup_schema_1.userToGroup),
}));
//# sourceMappingURL=groups.schema.js.map