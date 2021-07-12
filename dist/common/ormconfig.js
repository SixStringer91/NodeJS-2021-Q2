"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const user_entity_1 = require("../resources/users/entities/user.entity");
const board_entity_1 = require("../resources/boards/entities/board.entity");
const task_entity_1 = require("../resources/tasks/entities/task.entity");
dotenv_1.default.config({
    path: path_1.default.join(__dirname, '../../.env')
});
const config = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || process.env.DB_HOST,
    port: parseInt(process.env.POSTGRES_PORT) ||
        parseInt(process.env.DB_PORT),
    username: process.env.POSTGRES_USER || process.env.DB_USERNAME,
    password: process.env.POSTGRES_PASSWORD || process.env.DB_PASSWORD,
    database: process.env.POSTGRES_DB || process.env.DB_NAME,
    entities: [user_entity_1.User, board_entity_1.Board, task_entity_1.Task],
    synchronize: false,
    migrations: ['../../dist/migration/**.{js,ts}'],
    migrationsTableName: 'migrations_typeorm',
    migrationsRun: true,
    cli: {
        migrationsDir: "src/migration"
    }
};
exports.default = config;
//# sourceMappingURL=ormconfig.js.map