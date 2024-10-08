"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsRelations = exports.comments = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const constants_1 = require("./constants");
const user_schema_1 = require("./user.schema");
const drizzle_orm_1 = require("drizzle-orm");
const post_schema_1 = require("./post.schema");
exports.comments = (0, pg_core_1.pgTable)('comments', {
    ...constants_1.defaultFields,
    text: (0, pg_core_1.text)('text').notNull(),
    userId: (0, pg_core_1.uuid)('userId')
        .references(() => user_schema_1.users.id, { onDelete: 'cascade' })
        .notNull(),
    postId: (0, pg_core_1.uuid)('postId')
        .references(() => post_schema_1.posts.id, { onDelete: 'cascade' })
        .notNull(),
});
exports.commentsRelations = (0, drizzle_orm_1.relations)(exports.comments, ({ one }) => ({
    user: one(user_schema_1.users, {
        fields: [exports.comments.userId],
        references: [user_schema_1.users.id],
    }),
    post: one(post_schema_1.posts, {
        fields: [exports.comments.postId],
        references: [post_schema_1.posts.id],
    }),
}));
//# sourceMappingURL=comment.schema.js.map