import { UpdateUserDto } from './user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(): Promise<{
        [x: string]: unknown;
    }[]>;
    getUserBy(req: any): Promise<{
        id: string;
        username: string;
        email: string;
        phone: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findOneById(id: string): Promise<{
        id: string;
        username: string;
        email: string;
        phone: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateUser(req: any, dto: UpdateUserDto): Promise<{
        id: string;
        username: string;
        email: string;
        phone: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteUser(req: any): Promise<void>;
}
