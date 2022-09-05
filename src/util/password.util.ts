import * as bcrypt from 'bcrypt';

export class PasswordUtil {
  public async comparePassword(
    plainText: string,
    hash: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainText, hash);
  }

  public async hashPassword(plainText: string): Promise<string> {
    const salt = Number(process.env.HASH_SALT) || 10;
    return bcrypt.hash(plainText, salt);
  }
}
