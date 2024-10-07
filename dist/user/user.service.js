"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const drizzle_orm_1 = require("drizzle-orm");
const constant_1 = require("../constant");
const redis_service_1 = require("../redis.service");
const schema = require("../schemas");
let UserService = class UserService {
    constructor(db, redis) {
        this.db = db;
        this.redis = redis;
    }
    async getUsers() {
        return this.db.query.users.findMany();
    }
    async getUserBy(payload, by) {
        let user;
        if (by === 'id') {
            user = await this.db.query.users.findFirst({
                where: (0, drizzle_orm_1.eq)(schema.users.id, payload),
            });
        }
        else if (by === 'email') {
            user = await this.db.query.users.findFirst({
                where: (0, drizzle_orm_1.eq)(schema.users.email, payload),
            });
        }
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        return user;
    }
    async createUser(dto) {
        const foundUser = await this.db.query.users.findFirst({
            where: (0, drizzle_orm_1.eq)(schema.users.email, dto.email),
        });
        if (!!foundUser) {
            throw new common_1.ConflictException('User already exist');
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
    async updateUser(id, dto) {
        const user = await this.db.query.users.findFirst({
            where: (0, drizzle_orm_1.eq)(schema.users.id, id),
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const updatedUser = await this.db
            .update(schema.users)
            .set(dto)
            .where((0, drizzle_orm_1.eq)(schema.users.id, id))
            .returning();
        return updatedUser[0];
    }
    async deleteUser(id) {
        const user = await this.db.query.users.findFirst({
            where: (0, drizzle_orm_1.eq)(schema.users.id, id),
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        await this.db.delete(schema.users).where((0, drizzle_orm_1.eq)(schema.users.id, id));
        await this.redis.redisClient.del(id);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constant_1.DATABASE_CONNECTION)),
    __metadata("design:paramtypes", [Object, redis_service_1.RedisService])
], UserService);
//# sourceMappingURL=user.service.js.map