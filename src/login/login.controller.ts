import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { LoginService } from './login.service';

@Controller('api/')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.loginService.login(loginDto);
  }

  @Post('signup')
  signup(@Body() signupDto: SignUpDto) {
    return this.loginService.signup(signupDto);
  }
}
