import { UsersService } from './users.service';
import { IUserToRes, User } from './entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(body: User): Promise<IUserToRes | void>;
    findAll(): Promise<Omit<User, 'password'>[] | void>;
    findOne(id: string): Promise<IUserToRes | void>;
    update(id: string, body: User): Promise<IUserToRes | void>;
    remove(id: string): Promise<string | void>;
}
