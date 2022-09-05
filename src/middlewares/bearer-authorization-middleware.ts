import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { httpUnauthorizedError } from '../helpers/errors';
import {
  divideBearerValue,
  validateBearerValueStructure,
} from '../helpers/auth';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class BearerAuthorizationMiddleware implements NestMiddleware {
  constructor(private readonly userRepository: UserRepository) {}

  async use(req: Request, _: Response, next: NextFunction) {
    if (req['authError'] === null) return next();
    req['authError'] = httpUnauthorizedError();

    if (!validateBearerValueStructure(req.headers['x-access-token'] as string))
      return next();

    const [__, token] = divideBearerValue(
      req.headers['x-access-token'] as string,
    );

    const user = await this.userRepository.findOneByToken(token);

    if (!user) return next();

    if (user.tokenExpiration <= Date.now()) return next();

    req['user'] = {
      ...user,
      token: undefined,
      tokenExpiration: undefined,
      password: undefined,
    };
    req['hasBeenAuth'] = true;
    req['authError'] = null;

    return next();
  }
}
