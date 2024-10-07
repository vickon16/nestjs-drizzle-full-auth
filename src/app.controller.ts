import { Controller, Get } from '@nestjs/common';
import { WinstonService } from './logger/winston.service';

@Controller()
export class AppController {
  constructor(private readonly ws: WinstonService) {}
  @Get('/health')
  healthCheck() {
    this.ws.verbose(
      JSON.stringify({ status: 'ok', message: 'Health check successful' }),
    );
    return { status: 'ok', message: 'Health check successful' };
  }
}
