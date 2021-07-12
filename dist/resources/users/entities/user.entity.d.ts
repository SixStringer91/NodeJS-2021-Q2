import { Task } from '../../tasks/entities/task.entity';
export interface IUserToRes extends Omit<User, 'password'> {
    token: string;
    message: string;
}
export declare class User {
    id: string;
    name: string | null;
    login: string;
    password: string;
    tasks: Task[];
    private static _toResponse;
    static get toResponse(): (user: User) => IUserToRes;
    static set toResponse(value: (user: User) => IUserToRes);
}
