"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_handler_1 = require("../../middlewares/error.handler");
const user_model_1 = __importDefault(require("./user.model"));
const user_service_1 = require("./user.service");
const tasks_service_1 = require("../tasks/tasks.service");
const router = express_1.default.Router();
router.route('/').get(async (_req, res, next) => {
    const users = await user_service_1.getAll();
    if (users) {
        res.json(users.map(user_model_1.default.toResponse));
    }
    else
        next(new error_handler_1.ErrorHandler(404));
});
router.route('/:userId').get(async (req, res, next) => {
    const user = await user_service_1.getUser(req.params.userId);
    if (user) {
        res.json(user_model_1.default.toResponse(user));
    }
    else
        next(new error_handler_1.ErrorHandler(404, 'User not found'));
});
router.route('/').post(async (req, res, next) => {
    const newUser = await user_service_1.createUser(new user_model_1.default(req.body));
    if (newUser) {
        res.status(201).json(user_model_1.default.toResponse(newUser));
    }
    else
        next(new error_handler_1.ErrorHandler(404, 'bad result'));
});
router.route('/:userId').put(async (req, res, next) => {
    const newBoard = await user_service_1.updateUser({
        ...req.body,
        id: req.params.userId
    });
    if (newBoard) {
        res.status(200).json(user_model_1.default.toResponse(newBoard));
    }
    else
        next(new error_handler_1.ErrorHandler(401, 'bad result'));
});
router.route('/:userId').delete(async (req, res, next) => {
    const userFinded = await user_service_1.deleteUser(req.params.userId);
    if (userFinded) {
        await tasks_service_1.ifUserDeleted(req.params.userId);
        res.status(204).send('The board has been deleted');
    }
    else
        next(new error_handler_1.ErrorHandler(404, 'Board not found'));
});
exports.default = router;
//# sourceMappingURL=user.router.js.map