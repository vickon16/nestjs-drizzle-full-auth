"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const winston_service_1 = require("./logger/winston.service");
const core_1 = require("@nestjs/core");
const winston_interceptor_1 = require("./logger/winston.interceptor");
const app_controller_1 = require("./app.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot({ isGlobal: true }), user_module_1.UserModule, auth_module_1.AuthModule],
        controllers: [app_controller_1.AppController],
        providers: [
            winston_service_1.WinstonService,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: winston_interceptor_1.WinstonInterceptor,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map