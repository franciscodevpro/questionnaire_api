import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { AccessToken } from 'src/login/entities/token.entity';

@Injectable()
export class TokenUtil {
  public generateToken(): AccessToken {
    const token = crypto.randomUUID();
    const tokenExpiration = Date.now() + 180000; // set 3 minutes of expiration
    return { token, tokenExpiration };
  }
}
