import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { PasswordUtil } from '../util/password.util';
import { TokenUtil } from '../util/token.util';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { AccessToken } from './entities/token.entity';

@Injectable()
export class LoginService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenUtil: TokenUtil,
    private readonly passwordUtil: PasswordUtil,
  ) {}

  async login(loginDto: LoginDto): Promise<AccessToken> {
    const { login, password } = loginDto;
    const user = await this.userRepository.findOneByLogin(login);
    if (!user) return null;

    if (!this.passwordUtil.comparePassword(password, user.password))
      return null;

    const { token, tokenExpiration } = this.tokenUtil.generateToken();
    await this.userRepository.update(user.id, { token, tokenExpiration });

    return {
      token,
      tokenExpiration,
    };
  }

  async signup(signupDto: SignUpDto): Promise<AccessToken> {
    const { token, tokenExpiration } = this.tokenUtil.generateToken();
    const { login, password, name } = signupDto;
    const encryptedPassword = this.passwordUtil.encryptPassword(password);
    await this.userRepository.create({
      login,
      name,
      token,
      tokenExpiration,
      password: encryptedPassword,
    });
    return { token, tokenExpiration };
  }
}
