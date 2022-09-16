import { Controller, Get } from '@nestjs/common';

@Controller('api/')
export class HealthCheckController {
  @Get('healthcheck')
  healthcheck() {
    return { ok: true };
  }
}
