"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    username: (0, pg_core_1.varchar)('username', { length: 50 }).notNull(),
    email: (0, pg_core_1.varchar)('email', { length: 100 }).notNull(),
    phone: (0, pg_core_1.varchar)('phone', { length: 15 }).notNull(),
    password: (0, pg_core_1.text)('password').notNull(),
    createdAt: (0, pg_core_1.timestamp)('createdAt', { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updatedAt', { withTimezone: true })
        .notNull()
        .defaultNow()
        .$onUpdate(() => (0, drizzle_orm_1.sql) `NOW()`),
});
exports.default = users;
//# sourceMappingURL=user-schema.js.map