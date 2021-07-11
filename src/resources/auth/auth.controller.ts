import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  HttpCode
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('login')
export class AuthController {
  private readonly loginService: UsersService;

  constructor(loginService: UsersService) {
    this.loginService = loginService;
  }

  @Post()
  @HttpCode(200)
  async create(
    @Body('login') login: UserLoginDto['login'],
    @Body('password') password: UserLoginDto['password']
  ) {
    const isLogin = await this.loginService.auth({ login, password });
    if (isLogin) {
      return isLogin;
    }
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }
}
