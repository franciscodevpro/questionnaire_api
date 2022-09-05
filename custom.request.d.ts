import { Applier } from './applier/entities/applier.entity';
import { Device } from './device/entities/device.entity';
import { User } from './user/entities/user.entity';

declare namespace Express {
  export interface Request {
    user?: User;
    device?: Device;
    applier?: Applier;
    authError?: {
      error?: string;
    };
  }
}
