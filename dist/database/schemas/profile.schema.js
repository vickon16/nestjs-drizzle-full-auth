"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRelations = exports.profiles = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const constants_1 = require("./constants");
const user_schema_1 = require("./user.schema");
const drizzle_orm_1 = require("drizzle-orm");
exports.profiles = (0, pg_core_1.pgTable)('profiles', {
    ...constants_1.defaultFields,
    metadata: (0, pg_core_1.jsonb)('metadata'),
    userId: (0, pg_core_1.uuid)('userId')
        .references(() => user_schema_1.users.id, { onDelete: 'cascade' })
        .notNull(),
});
exports.profileRelations = (0, drizzle_orm_1.relations)(exports.profiles, ({ one }) => ({
    user: one(user_schema_1.users, {
        fields: [exports.profiles.userId],
        references: [user_schema_1.users.id],
    }),
}));
//# sourceMappingURL=profile.schema.js.map