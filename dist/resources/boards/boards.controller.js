"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardsController = void 0;
const common_1 = require("@nestjs/common");
const board_entity_1 = require("./entities/board.entity");
const boards_service_1 = require("./boards.service");
const auth_guard_1 = require("../login/auth.guard");
let BoardsController = class BoardsController {
    constructor(boardsService) {
        this.boardsService = boardsService;
    }
    async findAll() {
        const boards = await this.boardsService.findAll();
        if (boards) {
            return boards;
        }
        throw new common_1.HttpException('Boards not found', common_1.HttpStatus.NOT_FOUND);
    }
    async findOne(id) {
        const board = await this.boardsService.findOne(id);
        if (board) {
            return board;
        }
        throw new common_1.HttpException('Board not found', common_1.HttpStatus.NOT_FOUND);
    }
    async create(body) {
        const newBoard = await this.boardsService.create(Object.assign({}, body));
        if (newBoard) {
            return newBoard;
        }
        throw new common_1.HttpException('board not created', common_1.HttpStatus.BAD_REQUEST);
    }
    async update(id, body) {
        const newBoard = await this.boardsService.update(Object.assign(Object.assign({}, body), { id }));
        if (newBoard) {
            return newBoard;
        }
        throw new common_1.HttpException('board not found', common_1.HttpStatus.BAD_REQUEST);
    }
    async remove(id) {
        const boardFinded = await this.boardsService.remove(id);
        if (boardFinded) {
            return 'The board has been deleted';
        }
        throw new common_1.HttpException('board not found', common_1.HttpStatus.BAD_REQUEST);
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "findOne", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [board_entity_1.Board]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "create", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "remove", null);
BoardsController = __decorate([
    common_1.Controller('boards'),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [boards_service_1.BoardsService])
], BoardsController);
exports.BoardsController = BoardsController;
//# sourceMappingURL=boards.controller.js.map