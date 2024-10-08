"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRelations = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const constants_1 = require("./constants");
const drizzle_orm_1 = require("drizzle-orm");
const profile_schema_1 = require("./profile.schema");
const post_schema_1 = require("./post.schema");
const comment_schema_1 = require("./comment.schema");
const userToGroup_schema_1 = require("./userToGroup.schema");
exports.users = (0, pg_core_1.pgTable)('users', {
    ...constants_1.defaultFields,
    username: (0, pg_core_1.varchar)('username', { length: 100 }).notNull(),
    email: (0, pg_core_1.varchar)('email', { length: 100 }).notNull(),
    phone: (0, pg_core_1.varchar)('phone', { length: 50 }).notNull(),
    password: (0, pg_core_1.text)('password').notNull(),
});
exports.userRelations = (0, drizzle_orm_1.relations)(exports.users, ({ many, one }) => ({
    profile: one(profile_schema_1.profiles),
    posts: many(post_schema_1.posts),
    comments: many(comment_schema_1.comments),
    userToGroup: many(userToGroup_schema_1.userToGroup),
}));
//# sourceMappingURL=user.schema.js.map