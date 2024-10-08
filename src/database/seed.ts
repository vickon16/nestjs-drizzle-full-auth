// this file is not to be run with the application
// it is only to be used for putting data into the database

import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schemas';
import 'dotenv/config';
import { faker } from '@faker-js/faker';
import { Table, getTableName, sql } from 'drizzle-orm';

const pool = new Pool({
  host: process.env.POSTGRES_HOST!,
  password: process.env.POSTGRES_PASSWORD!,
  port: Number(process.env.POSTGRES_PORT)!,
  user: process.env.POSTGRES_USER!,
  database: process.env.POSTGRES_DB!,
  ssl: false,
});

const db = drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;

async function resetTable(table: Table) {
  return db.execute(
    sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`),
  );
}

async function main() {
  // delete all tables first
  for (const table of [
    schema.users,
    schema.profiles,
    schema.posts,
    schema.comments,
    schema.groups,
    schema.userToGroup,
  ]) {
    // await db.delete(table); // clear tables without truncating / resetting ids
    await resetTable(table);
  }

  const userIds = await Promise.all(
    Array(50)
      .fill('')
      .map(async () => {
        const user = await db
          .insert(schema.users)
          .values({
            email: faker.internet.email(),
            username: faker.person.firstName() + ' ' + faker.person.lastName(),
            phone: faker.phone.number(),
            password: 'password',
          })
          .returning();

        return user[0].id;
      }),
  );

  const postIds = await Promise.all(
    Array(50)
      .fill('')
      .map(async () => {
        const post = await db
          .insert(schema.posts)
          .values({
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraph(),
            userId: faker.helpers.arrayElement(userIds),
          })
          .returning();

        return post[0].id;
      }),
  );

  await Promise.all(
    Array(50)
      .fill('')
      .map(async () => {
        const comment = await db
          .insert(schema.comments)
          .values({
            text: faker.lorem.sentence(),
            userId: faker.helpers.arrayElement(userIds),
            postId: faker.helpers.arrayElement(postIds),
          })
          .returning();

        return comment[0].id;
      }),
  );

  const insertedGroups = await db
    .insert(schema.groups)
    .values([{ name: 'JS' }, { name: 'TS' }])
    .returning();

  const groupIds = insertedGroups.map((group) => group.id);

  await Promise.all(
    userIds.map(async (userId) => {
      return await db
        .insert(schema.userToGroup)
        .values({ userId, groupId: faker.helpers.arrayElement(groupIds) })
        .returning();
    }),
  );
}

main()
  .then(() => console.log('Seeding completed successfully'))
  .catch((err) => {
    console.error(err);
    process.exit(0);
  });
