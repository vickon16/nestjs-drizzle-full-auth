import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ type: String, example: 'johndoe@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ example: 'password234^^' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export type LoginType = {
  email: string;
  password: string;
};
