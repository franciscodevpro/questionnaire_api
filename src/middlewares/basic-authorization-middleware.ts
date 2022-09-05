import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { httpUnauthorizedError } from '../helpers/errors';
import {
  divideBearerValue,
  getBasicUserPassword,
  validateBearerValueStructure,
} from '../helpers/auth';
import { DeviceRepository } from '../device/device.repository';
import { ApplierRepository } from '../applier/applier.repository';

@Injectable()
export class BasicAuthorizationMiddleware implements NestMiddleware {
  constructor(
    private readonly deviceRepository: DeviceRepository,
    private readonly applierRepository: ApplierRepository,
  ) {}

  async use(req: Request, _: Response, next: NextFunction) {
    if (req['authError'] === null) return next();
    req['authError'] = httpUnauthorizedError();

    if (!validateBearerValueStructure(req.headers['authorization'] as string))
      return next();

    const [__, basic] = divideBearerValue(
      req.headers['authorization'] as string,
    );

    const [applierId, pin] = getBasicUserPassword(basic);

    if (!applierId || !pin) return next();

    const applier = await this.applierRepository.findOne(applierId);
    if (!applier) return next();

    const device = await this.deviceRepository.findOneByPin(pin);
    if (!device) return next();

    req['device'] = device;
    req['applier'] = applier;
    req['authError'] = null;

    return next();
  }
}
