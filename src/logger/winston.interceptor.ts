import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { WinstonService } from './winston.service';
import { Observable, tap } from 'rxjs';

@Injectable()
export class WinstonInterceptor implements NestInterceptor {
  constructor(private readonly winstonService: WinstonService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { url, method } = request;

    this.winstonService.log(`Incoming request: ${method} ${url}`);

    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - now;
        this.winstonService.log(
          `Outgoing response: ${request.method} ${request.url} ${responseTime}ms`,
        );
      }),
    );
  }
}
