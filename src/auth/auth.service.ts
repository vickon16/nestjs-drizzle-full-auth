import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { ClaimsPayload } from 'src/types';
import { RedisService } from 'src/redis.service';
import { TUser } from 'src/user/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly redis: RedisService,
  ) {}

  private async issueTokens(user: TUser) {
    const payload: ClaimsPayload = {
      username: user.username,
      sub: user.id,
      email: user.email,
    };

    try {
      const access_token = this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: '120s',
      });

      const refresh_token = this.jwtService.sign(payload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '7d',
      });

      await this.redis.redisClient.set(
        user.id,
        JSON.stringify([access_token, refresh_token]),
      );

      return { access_token, refresh_token };
    } catch (error) {
      return { access_token: '', refresh_token: '' };
    }
  }

  async login(dto: LoginDto) {
    const user = await this.userService.getUserBy(dto.email, 'email');
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { access_token } = await this.issueTokens(user);
    if (!access_token)
      throw new InternalServerErrorException('No token generated');
    return { access_token };
  }

  async logout(id: string) {
    await this.redis.redisClient.del(id);
  }
}
