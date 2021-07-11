import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
export declare class LoginService {
    create(createLoginDto: CreateLoginDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateLoginDto: UpdateLoginDto): string;
    remove(id: number): string;
}
