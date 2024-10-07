import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DATABASE_CONNECTION } from 'src/constant';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from 'src/schemas';

@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const pool = new Pool({
          host: configService.getOrThrow('POSTGRES_HOST'),
          port: configService.getOrThrow('POSTGRES_PORT'),
          user: configService.getOrThrow('POSTGRES_USER'),
          password: configService.getOrThrow('POSTGRES_PASSWORD'),
          database: configService.getOrThrow('POSTGRES_DB'),
          ssl: false,
        });

        return drizzle(pool, { schema });
      },
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
