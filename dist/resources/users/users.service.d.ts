import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    getAll(): Promise<Omit<User, "password">[]>;
    createUser(user: User): Promise<import("./entities/user.entity").IUserToRes>;
    getUser(id: string): Promise<import("./entities/user.entity").IUserToRes>;
    updateUser(obj: Omit<User, 'password' | 'name' | 'login'>): Promise<import("./entities/user.entity").IUserToRes>;
    deleteUser(id: string): Promise<boolean>;
    auth({ login, password }: {
        login: any;
        password: any;
    }): Promise<unknown>;
}
