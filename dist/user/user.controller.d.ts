import { UpdateUserDto } from './user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
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
    getUserBy(req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        username: string;
        email: string;
        phone: string;
        password: string;
    }>;
    findOneById(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        username: string;
        email: string;
        phone: string;
        password: string;
    }>;
    updateUser(req: any, dto: UpdateUserDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        username: string;
        email: string;
        phone: string;
        password: string;
    }>;
    deleteUser(req: any): Promise<void>;
}
