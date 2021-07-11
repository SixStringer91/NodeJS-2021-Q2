import { UsersService } from '../users/users.service';
import { UserLoginDto } from './dto/user-login.dto';
export declare class AuthController {
    private readonly loginService;
    constructor(loginService: UsersService);
    create(login: UserLoginDto['login'], password: UserLoginDto['password']): Promise<unknown>;
}
