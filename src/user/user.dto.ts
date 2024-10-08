import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { users } from 'src/database/schemas';
import { ApiProperty } from '@nestjs/swagger';

export type TUser = InferSelectModel<typeof users>;

export class User implements TUser {
  @ApiProperty({ example: 'fladuf-faldfuald-fadfuilaiud-fadfiuao' })
  id: string;

  @ApiProperty({ example: 'John Doe' })
  username: string;

  @ApiProperty({ example: 'johndoe@gmail.com' })
  email: string;

  @ApiProperty({ example: '1234567890' })
  phone: string;

  @ApiProperty({ example: 'password234^^' })
  password: string;

  @ApiProperty({ example: '2021-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2021-01-01T00:00:00.000Z' })
  updatedAt: Date;
}

export class CreateUserDto implements InferInsertModel<typeof users> {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  username: string;

  @ApiProperty({ example: 'johndoe@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  @Length(3, 100)
  email: string;

  @ApiProperty({ example: '1234567890' })
  @IsNumberString()
  @IsNotEmpty()
  @MinLength(8)
  phone: string;

  @ApiProperty({ example: 'password234^^' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
