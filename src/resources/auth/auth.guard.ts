import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  HttpException,
  Injectable
} from '@nestjs/common';
import { getRepository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import jwt from 'jsonwebtoken';
import { UsersService } from 'resources/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly loginService: UsersService;

  constructor(loginService: UsersService) {
    this.loginService = loginService;
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const req = context.switchToHttp().getRequest();
    const header =
      <string>req.headers['x-access-token'] || req.headers.authorization;
    const sessionToken = header ? header.replace(/^Bearer\s+/, '') : '';
    if (!sessionToken) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    } else {
      return new Promise(resolve => {
        jwt.verify(
          sessionToken,
          process.env.JWT_SECRET_KEY as string,
          (_err, decoded) => {
            if (decoded) {
              this.loginService.getUser(decoded.id).then(
                () => {
                  resolve(true);
                },
                () => {
                  throw new HttpException(
                    'Unauthorized error',
                    HttpStatus.UNAUTHORIZED
                  );
                }
              );
            } else {
              throw new HttpException(
                'Unauthorized error',
                HttpStatus.UNAUTHORIZED
              );
            }
          }
        );
      });
    }
  }
}
