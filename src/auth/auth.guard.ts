import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isArray } from 'class-validator';
import { Request } from 'express';
import { RedisService } from 'src/redis.service';
import { ClaimsPayload } from 'src/types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redis: RedisService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const prevAccessToken = this.extractTokenFromHeader(req);
    if (!prevAccessToken) throw new UnauthorizedException();

    try {
      const decodedPrevAccessPayload = this.jwtService.decode(
        prevAccessToken,
      ) as ClaimsPayload;

      const newAccessPayload = this.verifyToken('access', prevAccessToken);
      if (!newAccessPayload) {
        const prevTokens = await this.redis.redisClient.get(
          decodedPrevAccessPayload.sub,
        );

        if (!prevTokens || !isArray(JSON.parse(prevTokens))) {
          throw new UnauthorizedException();
        }

        const [accessToken, refreshToken] = JSON.parse(prevTokens);

        if (accessToken !== prevAccessToken) {
          throw new UnauthorizedException();
        }

        const newRefreshPayload = this.verifyToken('refresh', refreshToken);

        if (!newRefreshPayload) {
          throw new UnauthorizedException();
        }
      }

      req['claims'] = decodedPrevAccessPayload;
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' && !!token ? token : undefined;
  }

  private verifyToken(type: 'access' | 'refresh', token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret:
          type === 'access'
            ? process.env.ACCESS_TOKEN_SECRET
            : process.env.REFRESH_TOKEN_SECRET,
      });
      return payload as ClaimsPayload;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return null;
    }
  }
}
