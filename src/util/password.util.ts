export class PasswordUtil {
  public comparePassword(plainText: string, encrypted: string) {
    return plainText === encrypted;
  }

  public encryptPassword(plainText: string): string {
    return plainText;
  }
}
