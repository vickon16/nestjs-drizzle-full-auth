import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './auth.dto';
import { RedisService } from 'src/redis.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly redis;
    constructor(userService: UserService, jwtService: JwtService, redis: RedisService);
    private issueTokens;
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
    logout(id: string): Promise<void>;
}
