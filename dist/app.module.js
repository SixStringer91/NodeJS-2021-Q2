"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const http_error_filter_1 = require("./shared/http-error.filter");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./resources/users/users.module");
const boards_module_1 = require("./resources/boards/boards.module");
const tasks_module_1 = require("./resources/tasks/tasks.module");
const login_module_1 = require("./resources/auth/login.module");
const core_1 = require("@nestjs/core");
const logging_interceptor_1 = require("./shared/logging.interceptor");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const user_entity_1 = require("./resources/users/entities/user.entity");
const board_entity_1 = require("./resources/boards/entities/board.entity");
const task_entity_1 = require("./resources/tasks/entities/task.entity");
dotenv_1.default.config({
    path: path_1.default.join(__dirname, '../.env')
});
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: () => ({
                    type: 'postgres',
                    host: process.env.POSTGRES_HOST || process.env.DB_HOST,
                    port: parseInt(process.env.POSTGRES_PORT) ||
                        parseInt(process.env.DB_PORT),
                    username: process.env.POSTGRES_USER || process.env.DB_USERNAME,
                    password: process.env.POSTGRES_PASSWORD || process.env.DB_PASSWORD,
                    database: process.env.POSTGRES_DB || process.env.DB_NAME,
                    entities: [user_entity_1.User, board_entity_1.Board, task_entity_1.Task],
                    synchronize: true
                }),
                inject: [config_1.ConfigService]
            }),
            users_module_1.UsersModule,
            boards_module_1.BoardsModule,
            tasks_module_1.TasksModule,
            login_module_1.LoginModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_FILTER,
                useClass: http_error_filter_1.HttpErrorFilter
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: logging_interceptor_1.LoggingInterceptor
            }
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map