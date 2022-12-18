import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('healthz')
export class HealthController {
  @Get()
  getHealthCheck(@Res() res: Response) {
    res.status(HttpStatus.OK).json({ message: 'We are live' });
  }
}
