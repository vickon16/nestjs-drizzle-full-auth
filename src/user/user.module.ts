import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/redis.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtService, RedisService],
  exports: [UserService],
})
export class UserModule {}
