"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasks_model_1 = __importDefault(require("./tasks.model"));
const board_service_1 = require("../boards/board.service");
const tasks_service_1 = __importDefault(require("./tasks.service"));
const error_handler_1 = require("../../middlewares/error.handler");
const router = express_1.default.Router({ mergeParams: true });
router.route('/').get(async (req, res, next) => {
    const { boardsId } = req.params;
    if (boardsId) {
        const boardCheck = await board_service_1.getBoard(boardsId);
        const tasks = await tasks_service_1.default.getAll(boardsId);
        if (tasks && boardCheck)
            res.status(200).json(tasks.map(tasks_model_1.default.toResponse));
    }
    else
        next(new error_handler_1.ErrorHandler(404, 'Tasks not found'));
});
router.route('/:taskId').get(async (req, res, next) => {
    const { boardsId, taskId } = req.params;
    if (boardsId && taskId) {
        const boardCheck = await board_service_1.getBoard(boardsId);
        const task = await tasks_service_1.default.getTask(taskId);
        if (task && boardCheck) {
            res.status(200).json(tasks_model_1.default.toResponse(task));
        }
        else
            next(new error_handler_1.ErrorHandler(404, 'Task not found'));
    }
    else
        next(new error_handler_1.ErrorHandler(404, 'Task not found'));
});
router.route('/').post(async (req, res, next) => {
    const { boardsId } = req.params;
    if (boardsId) {
        const boardCheck = await board_service_1.getBoard(boardsId);
        const newTask = await tasks_service_1.default.createTask(new tasks_model_1.default({ ...req.body, boardId: boardsId }));
        if (newTask && boardCheck)
            res.status(201).json(tasks_model_1.default.toResponse(newTask));
    }
    else
        next(new error_handler_1.ErrorHandler(404, 'Bad result'));
});
router.route('/:taskId').put(async (req, res, next) => {
    const updatedTask = await tasks_service_1.default.updateTask({
        ...req.body,
        id: req.params['taskId']
    });
    if (updatedTask)
        res.status(200).json(tasks_model_1.default.toResponse(updatedTask));
    else
        next(new error_handler_1.ErrorHandler(404, 'Task not found'));
});
router.route('/:taskId').delete(async (req, res, next) => {
    const { taskId } = req.params;
    if (taskId) {
        const taskFinded = await tasks_service_1.default.deleteTask(taskId);
        if (taskFinded) {
            res.status(204).send('The task has been deleted');
        }
    }
    else
        next(new error_handler_1.ErrorHandler(404, 'Board not found'));
});
exports.default = router;
//# sourceMappingURL=tasks.router.js.map