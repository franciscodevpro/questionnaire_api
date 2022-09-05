import { Controller, Get, Request } from '@nestjs/common';
import express from 'express';

@Controller('api/me')
export class MeController {
  @Get()
  find(@Request() request: express.Request) {
    console.log(request['user']);
    return request['user'];
  }
}
