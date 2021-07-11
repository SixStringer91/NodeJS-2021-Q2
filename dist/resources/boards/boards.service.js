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
exports.BoardsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const board_entity_1 = require("./entities/board.entity");
let BoardsService = class BoardsService {
    constructor(boardsRepository) {
        this.boardsRepository = boardsRepository;
    }
    async findAll() {
        const boards = await this.boardsRepository.find({ where: {} });
        return boards.map(board_entity_1.Board.toResponse);
    }
    async create(board) {
        const newUser = this.boardsRepository.create(board);
        const createdBoard = await this.boardsRepository.save(newUser);
        return board_entity_1.Board.toResponse(createdBoard);
    }
    async findOne(id) {
        const board = await this.boardsRepository.findOne(id);
        if (board)
            return board_entity_1.Board.toResponse(board);
        return null;
    }
    async update(obj) {
        const findedTask = await this.boardsRepository.findOne(obj.id);
        if (!findedTask)
            return null;
        const reducedData = { ...findedTask, ...obj };
        const updatedBoard = await this.boardsRepository.update(obj.id, reducedData);
        if (updatedBoard.affected)
            return board_entity_1.Board.toResponse(reducedData);
        return null;
    }
    async remove(id) {
        const deletionRes = await this.boardsRepository.delete(id);
        if (deletionRes.affected)
            return true;
        return false;
    }
};
BoardsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(board_entity_1.Board)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], BoardsService);
exports.BoardsService = BoardsService;
//# sourceMappingURL=boards.service.js.map