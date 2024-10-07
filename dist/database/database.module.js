"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const constant_1 = require("../constant");
const pg_1 = require("pg");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const schema = require("../schemas");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: constant_1.DATABASE_CONNECTION,
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const pool = new pg_1.Pool({
                        host: configService.getOrThrow('POSTGRES_HOST'),
                        port: configService.getOrThrow('POSTGRES_PORT'),
                        user: configService.getOrThrow('POSTGRES_USER'),
                        password: configService.getOrThrow('POSTGRES_PASSWORD'),
                        database: configService.getOrThrow('POSTGRES_DB'),
                        ssl: false,
                    });
                    return (0, node_postgres_1.drizzle)(pool, { schema });
                },
            },
        ],
        exports: [constant_1.DATABASE_CONNECTION],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map