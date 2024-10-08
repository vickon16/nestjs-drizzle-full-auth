import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './auth.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
    register(dto: CreateUserDto): Promise<{
        access_token: string;
    }>;
    logout(req: any): Promise<{
        message: string;
    }>;
}
