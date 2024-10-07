import { WinstonService } from './logger/winston.service';
export declare class AppController {
    private readonly ws;
    constructor(ws: WinstonService);
    healthCheck(): {
        status: string;
        message: string;
    };
}
