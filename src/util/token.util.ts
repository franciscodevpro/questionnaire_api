import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { AccessToken } from 'src/login/entities/token.entity';

@Injectable()
export class TokenUtil {
  public generateToken(): AccessToken {
    const token = crypto.randomUUID();
    const tokenExpiration = Date.now() + 1800000; // set 30 minutes of expiration
    return { token, tokenExpiration };
  }
}
