import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, User } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './auth.dto';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @ApiCreatedResponse({
    type: User,
  })
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Register user' })
  @ApiCreatedResponse({
    type: User,
    description: 'Register user',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    await this.userService.createUser(dto);
    return await this.authService.login(dto);
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    await this.authService.logout(req.claims.sub);
    return { message: 'Logged out successfully' };
  }
}
