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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const class_validator_1 = require("class-validator");
const redis_service_1 = require("../redis.service");
let AuthGuard = class AuthGuard {
    constructor(jwtService, redis) {
        this.jwtService = jwtService;
        this.redis = redis;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const prevAccessToken = this.extractTokenFromHeader(req);
        if (!prevAccessToken)
            throw new common_1.UnauthorizedException();
        try {
            const decodedPrevAccessPayload = this.jwtService.decode(prevAccessToken);
            const newAccessPayload = this.verifyToken('access', prevAccessToken);
            if (!newAccessPayload) {
                const prevTokens = await this.redis.redisClient.get(decodedPrevAccessPayload.sub);
                if (!prevTokens || !(0, class_validator_1.isArray)(JSON.parse(prevTokens))) {
                    throw new common_1.UnauthorizedException();
                }
                const [accessToken, refreshToken] = JSON.parse(prevTokens);
                if (accessToken !== prevAccessToken) {
                    throw new common_1.UnauthorizedException();
                }
                const newRefreshPayload = this.verifyToken('refresh', refreshToken);
                if (!newRefreshPayload) {
                    throw new common_1.UnauthorizedException();
                }
            }
            req['claims'] = decodedPrevAccessPayload;
            return true;
        }
        catch (error) {
            throw new common_1.UnauthorizedException();
        }
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' && !!token ? token : undefined;
    }
    verifyToken(type, token) {
        try {
            const payload = this.jwtService.verify(token, {
                secret: type === 'access'
                    ? process.env.ACCESS_TOKEN_SECRET
                    : process.env.REFRESH_TOKEN_SECRET,
            });
            return payload;
        }
        catch (error) {
            return null;
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        redis_service_1.RedisService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map