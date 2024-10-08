"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRelations = exports.posts = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const constants_1 = require("./constants");
const user_schema_1 = require("./user.schema");
const drizzle_orm_1 = require("drizzle-orm");
const comment_schema_1 = require("./comment.schema");
exports.posts = (0, pg_core_1.pgTable)('posts', {
    ...constants_1.defaultFields,
    title: (0, pg_core_1.text)('title').notNull(),
    content: (0, pg_core_1.text)('content').notNull(),
    userId: (0, pg_core_1.uuid)('userId')
        .references(() => user_schema_1.users.id, { onDelete: 'cascade' })
        .notNull(),
});
exports.postsRelations = (0, drizzle_orm_1.relations)(exports.posts, ({ one, many }) => ({
    user: one(user_schema_1.users, {
        fields: [exports.posts.userId],
        references: [user_schema_1.users.id],
    }),
    comments: many(comment_schema_1.comments),
}));
//# sourceMappingURL=post.schema.js.map