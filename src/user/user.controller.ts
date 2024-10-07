import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDto } from './user.dto';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@UseGuards(AuthGuard)
@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Get('user')
  async getUserBy(@Request() req) {
    return await this.userService.getUserBy(req.claims.sub, 'id');
  }

  @Get('user/:id')
  async findOneById(@Param('id') id: string) {
    return await this.userService.getUserBy(id, 'id');
  }

  @Patch('user')
  async updateUser(@Request() req, @Body() dto: UpdateUserDto) {
    return await this.userService.updateUser(req.claims.sub, dto);
  }

  @Delete('user')
  async deleteUser(@Request() req) {
    return await this.userService.deleteUser(req.claims.sub);
  }
}
