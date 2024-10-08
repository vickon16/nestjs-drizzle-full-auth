"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultFields = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
exports.defaultFields = {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    createdAt: (0, pg_core_1.timestamp)('createdAt', { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updatedAt', { withTimezone: true })
        .notNull()
        .defaultNow()
        .$onUpdate(() => (0, drizzle_orm_1.sql) `NOW()`),
};
//# sourceMappingURL=constants.js.map