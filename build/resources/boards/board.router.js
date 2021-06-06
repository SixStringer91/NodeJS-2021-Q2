"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const board_service_1 = require("./board.service");
const board_model_1 = __importDefault(require("./board.model"));
const tasks_service_1 = require("../tasks/tasks.service");
const error_handler_1 = require("../../middlewares/error.handler");
const router = express_1.default.Router();
router.route('/').get(async (_req, res, next) => {
    const boards = await board_service_1.getAll();
    if (boards) {
        res.json(boards.map(board_model_1.default.toResponse));
    }
    else
        next(new error_handler_1.ErrorHandler(404));
});
router.route('/:boardId').get(async (req, res, next) => {
    const board = await board_service_1.getBoard(req.params.boardId);
    if (board) {
        res.json(board_model_1.default.toResponse(board));
    }
    else
        next(new error_handler_1.ErrorHandler(404, 'Board not found'));
});
router.route('/').post(async (req, res, next) => {
    const newBoard = await board_service_1.createBoard(new board_model_1.default(req.body));
    if (newBoard) {
        res.status(201).json(board_model_1.default.toResponse(newBoard));
    }
    else
        next(new error_handler_1.ErrorHandler(404));
});
router.route('/:boardId').put(async (req, res, next) => {
    const newBoard = await board_service_1.updateBoard({
        ...req.body,
        id: req.params.boardId
    });
    if (newBoard) {
        res.status(200).json(board_model_1.default.toResponse(newBoard));
    }
    else
        next(new error_handler_1.ErrorHandler(401));
});
router.route('/:boardId').delete(async (req, res, next) => {
    const boardFinded = await board_service_1.deleteBoard(req.params.boardId);
    if (boardFinded) {
        await tasks_service_1.deleteAllTasks(req.params.boardId);
        res.status(204).send('The board has been deleted');
    }
    else
        next(new error_handler_1.ErrorHandler(404, 'Board not found'));
});
exports.default = router;
//# sourceMappingURL=board.router.js.map