import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class CheckAuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    console.log(req['authError']);
    if (req['authError']) {
      res.status(401);
      return res.json(req['authError']);
    }

    return next();
  }
}
