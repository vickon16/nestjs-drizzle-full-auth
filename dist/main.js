"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const helmet_1 = require("helmet");
const swagger_1 = require("@nestjs/swagger");
const winston_service_1 = require("./logger/winston.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useLogger(app.get(winston_service_1.WinstonService));
    app.use((0, helmet_1.default)());
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: process.env.CLIENT_URL,
        credentials: true,
        allowedHeaders: [
            'Accept',
            'Authorization',
            'Content-Type',
            'X-Requested-With',
        ],
        methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('NestJS Drizzle Auth')
        .setDescription('My API description')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(5000);
}
bootstrap();
//# sourceMappingURL=main.js.map