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
exports.WinstonInterceptor = void 0;
const common_1 = require("@nestjs/common");
const winston_service_1 = require("./winston.service");
const rxjs_1 = require("rxjs");
let WinstonInterceptor = class WinstonInterceptor {
    constructor(winstonService) {
        this.winstonService = winstonService;
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const { url, method } = request;
        this.winstonService.log(`Incoming request: ${method} ${url}`);
        const now = Date.now();
        return next.handle().pipe((0, rxjs_1.tap)(() => {
            const responseTime = Date.now() - now;
            this.winstonService.log(`Outgoing response: ${request.method} ${request.url} ${responseTime}ms`);
        }));
    }
};
exports.WinstonInterceptor = WinstonInterceptor;
exports.WinstonInterceptor = WinstonInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [winston_service_1.WinstonService])
], WinstonInterceptor);
//# sourceMappingURL=winston.interceptor.js.map