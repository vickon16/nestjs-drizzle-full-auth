import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/redis.service';
export declare class AuthGuard implements CanActivate {
    private readonly jwtService;
    private readonly redis;
    constructor(jwtService: JwtService, redis: RedisService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
    private verifyToken;
}
