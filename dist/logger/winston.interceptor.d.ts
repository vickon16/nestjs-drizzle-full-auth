import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { WinstonService } from './winston.service';
import { Observable } from 'rxjs';
export declare class WinstonInterceptor implements NestInterceptor {
    private readonly winstonService;
    constructor(winstonService: WinstonService);
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>>;
}
