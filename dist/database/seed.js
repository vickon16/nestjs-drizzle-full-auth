"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_postgres_1 = require("drizzle-orm/node-postgres");
const pg_1 = require("pg");
const schema = require("./schemas");
require("dotenv/config");
const faker_1 = require("@faker-js/faker");
const drizzle_orm_1 = require("drizzle-orm");
const pool = new pg_1.Pool({
    host: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    ssl: false,
});
const db = (0, node_postgres_1.drizzle)(pool, { schema });
async function resetTable(table) {
    return db.execute(drizzle_orm_1.sql.raw(`TRUNCATE TABLE ${(0, drizzle_orm_1.getTableName)(table)} RESTART IDENTITY CASCADE`));
}
async function main() {
    for (const table of [
        schema.users,
        schema.profiles,
        schema.posts,
        schema.comments,
        schema.groups,
        schema.userToGroup,
    ]) {
        await resetTable(table);
    }
    const userIds = await Promise.all(Array(50)
        .fill('')
        .map(async () => {
        const user = await db
            .insert(schema.users)
            .values({
            email: faker_1.faker.internet.email(),
            username: faker_1.faker.person.firstName() + ' ' + faker_1.faker.person.lastName(),
            phone: faker_1.faker.phone.number(),
            password: 'password',
        })
            .returning();
        return user[0].id;
    }));
    const postIds = await Promise.all(Array(50)
        .fill('')
        .map(async () => {
        const post = await db
            .insert(schema.posts)
            .values({
            title: faker_1.faker.lorem.sentence(),
            content: faker_1.faker.lorem.paragraph(),
            userId: faker_1.faker.helpers.arrayElement(userIds),
        })
            .returning();
        return post[0].id;
    }));
    await Promise.all(Array(50)
        .fill('')
        .map(async () => {
        const comment = await db
            .insert(schema.comments)
            .values({
            text: faker_1.faker.lorem.sentence(),
            userId: faker_1.faker.helpers.arrayElement(userIds),
            postId: faker_1.faker.helpers.arrayElement(postIds),
        })
            .returning();
        return comment[0].id;
    }));
    const insertedGroups = await db
        .insert(schema.groups)
        .values([{ name: 'JS' }, { name: 'TS' }])
        .returning();
    const groupIds = insertedGroups.map((group) => group.id);
    await Promise.all(userIds.map(async (userId) => {
        return await db
            .insert(schema.userToGroup)
            .values({ userId, groupId: faker_1.faker.helpers.arrayElement(groupIds) })
            .returning();
    }));
}
main()
    .then(() => console.log('Seeding completed successfully'))
    .catch((err) => {
    console.error(err);
    process.exit(0);
});
//# sourceMappingURL=seed.js.map