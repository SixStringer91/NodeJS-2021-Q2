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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const typeorm_1 = require("typeorm");
const task_entity_1 = require("../../tasks/entities/task.entity");
let Board = class Board {
    constructor() {
        this.title = 'BOARD';
    }
    static toResponse(board) {
        const { id, title, columns, tasks } = board;
        return {
            id,
            title,
            columns,
            tasks
        };
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Board.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 200 }),
    __metadata("design:type", Object)
], Board.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], Board.prototype, "columns", void 0);
__decorate([
    typeorm_1.OneToMany(() => task_entity_1.Task, (task) => task.boardId),
    __metadata("design:type", Array)
], Board.prototype, "tasks", void 0);
Board = __decorate([
    typeorm_1.Entity({
        name: 'board'
    })
], Board);
exports.Board = Board;
//# sourceMappingURL=board.entity.js.map