"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinstonService = void 0;
const common_1 = require("@nestjs/common");
const winston_logger_1 = require("./winston.logger");
let WinstonService = class WinstonService {
    log(message) {
        winston_logger_1.winstonLogger.info(message);
    }
    error(message, trace) {
        winston_logger_1.winstonLogger.error(message, { trace });
    }
    warn(message) {
        winston_logger_1.winstonLogger.warn(message);
    }
    debug(message) {
        winston_logger_1.winstonLogger.debug(message);
    }
    verbose(message) {
        winston_logger_1.winstonLogger.verbose(message);
    }
};
exports.WinstonService = WinstonService;
exports.WinstonService = WinstonService = __decorate([
    (0, common_1.Injectable)()
], WinstonService);
//# sourceMappingURL=winston.service.js.map