import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { RedisService } from 'src/redis.service';
import * as schema from 'src/schemas';
import { CreateUserDto, UpdateUserDto } from './user.dto';
export declare class UserService {
    private readonly db;
    private readonly redis;
    constructor(db: NodePgDatabase<typeof schema>, redis: RedisService);
    getUsers(): Promise<{
        [x: string]: unknown;
    }[]>;
    getUserBy(payload: string, by: 'id' | 'email'): Promise<{
        id: string;
        username: string;
        email: string;
        phone: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createUser(dto: CreateUserDto): Promise<{
        id: string;
        username: string;
        email: string;
        phone: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateUser(id: string, dto: UpdateUserDto): Promise<{
        id: string;
        username: string;
        email: string;
        phone: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteUser(id: string): Promise<void>;
}
