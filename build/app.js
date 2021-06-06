"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const path_1 = __importDefault(require("path"));
const yamljs_1 = __importDefault(require("yamljs"));
const logger_1 = require("./middlewares/logger");
const user_router_1 = __importDefault(require("./resources/users/user.router"));
const board_router_1 = __importDefault(require("./resources/boards/board.router"));
const tasks_router_1 = __importDefault(require("./resources/tasks/tasks.router"));
const error_handler_1 = require("./middlewares/error.handler");
const app = express_1.default();
const swaggerDocument = yamljs_1.default.load(path_1.default.join(__dirname, '../doc/api.yaml'));
app.use(express_1.default.json());
app.use('/doc', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use(logger_1.logerRequests);
app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
        res.send('Service is running!');
        return;
    }
    next();
});
app.use('/users', user_router_1.default);
app.use('/boards', board_router_1.default);
app.use('/boards/:boardsId/tasks', tasks_router_1.default);
app.use((err, _req, res, next) => {
    error_handler_1.handleError(err, res);
    next();
});
process.on('uncaughtException', error_handler_1.uncaughtException);
process.on('unhandledRejection', error_handler_1.unhandledRejection);
// setTimeout(() => {
//   throw new Error('Oops!');
// }, 1500);
// setTimeout(() => {
//   Promise.reject(new Error(' Reject Oops!'));
// }, 1500);
exports.default = app;
//# sourceMappingURL=app.js.map