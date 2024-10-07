import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/constant';
import { RedisService } from 'src/redis.service';
import * as schema from 'src/schemas';
import { CreateUserDto, TUser, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
    private readonly redis: RedisService,
  ) {}

  async getUsers() {
    return this.db.query.users.findMany();
  }

  async getUserBy(payload: string, by: 'id' | 'email') {
    let user: TUser | undefined;

    if (by === 'id') {
      user = await this.db.query.users.findFirst({
        where: eq(schema.users.id, payload),
      });
    } else if (by === 'email') {
      user = await this.db.query.users.findFirst({
        where: eq(schema.users.email, payload),
      });
    }

    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  async createUser(dto: CreateUserDto) {
    const foundUser = await this.db.query.users.findFirst({
      where: eq(schema.users.email, dto.email),
    });

    if (!!foundUser) {
      throw new ConflictException('User already exist');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const [newUser] = await this.db
      .insert(schema.users)
      .values({
        ...dto,
        password: hashedPassword,
      })
      .returning();

    return newUser;
  }

  async updateUser(id: string, dto: UpdateUserDto) {
    const user = await this.db.query.users.findFirst({
      where: eq(schema.users.id, id),
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.db
      .update(schema.users)
      .set(dto)
      .where(eq(schema.users.id, id))
      .returning();

    return updatedUser[0];
  }

  async deleteUser(id: string) {
    const user = await this.db.query.users.findFirst({
      where: eq(schema.users.id, id),
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.db.delete(schema.users).where(eq(schema.users.id, id));
    await this.redis.redisClient.del(id);
  }
}
