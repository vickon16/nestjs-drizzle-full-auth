import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { RedisService } from 'src/redis.service';
import * as schema from 'src/database/schemas';
import { CreateUserDto, UpdateUserDto } from './user.dto';
export declare class UserService {
    private readonly db;
    private readonly redis;
    constructor(db: NodePgDatabase<typeof schema>, redis: RedisService);
    getUsers(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        username: string;
        email: string;
        phone: string;
        password: string;
        posts: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            content: string;
            userId: string;
        }[];
        comments: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            text: string;
            postId: string;
        }[];
        profile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            metadata: unknown;
        };
    }[]>;
    getUserBy(payload: string, by: 'id' | 'email'): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        username: string;
        email: string;
        phone: string;
        password: string;
    }>;
    createUser(dto: CreateUserDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        username: string;
        email: string;
        phone: string;
        password: string;
    }>;
    updateUser(id: string, dto: UpdateUserDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        username: string;
        email: string;
        phone: string;
        password: string;
    }>;
    deleteUser(id: string): Promise<void>;
}
