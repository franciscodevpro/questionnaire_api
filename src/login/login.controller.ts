import { Body, Controller, Post } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { LoginService } from './login.service';

@Controller('api/')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const loginResult = await this.loginService.login(loginDto);
    if (!loginResult)
      throw new HttpException(
        'Login and password combination error',
        HttpStatus.BAD_REQUEST,
      );
    return loginResult;
  }

  @Post('signup')
  signup(@Body() signupDto: SignUpDto) {
    return this.loginService.signup(signupDto);
  }
}
