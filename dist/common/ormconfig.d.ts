import { User } from '../resources/users/entities/user.entity';
import { Board } from '../resources/boards/entities/board.entity';
import { Task } from '../resources/tasks/entities/task.entity';
declare const config: {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    entities: (typeof User | typeof Board | typeof Task)[];
    synchronize: boolean;
    migrationsTableName: string;
    migrationsRun: boolean;
    cli: {
        migrationsDir: string;
    };
};
export default config;
