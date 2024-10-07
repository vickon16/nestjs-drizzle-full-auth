import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { WinstonService } from './logger/winston.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { WinstonInterceptor } from './logger/winston.interceptor';
import { AppController } from './app.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, AuthModule],
  controllers: [AppController],
  providers: [
    WinstonService,
    {
      provide: APP_INTERCEPTOR,
      useClass: WinstonInterceptor, // Optionally for logging every request and response,
    },
  ],
})
export class AppModule {}
