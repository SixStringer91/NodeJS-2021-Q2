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
exports.Task = void 0;
const typeorm_1 = require("typeorm");
const board_entity_1 = require("../../boards/entities/board.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let Task = class Task {
    constructor() {
        this.columnId = null;
    }
    static toResponse(task) {
        return {
            ...task
        };
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Task.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 200 }),
    __metadata("design:type", String)
], Task.prototype, "title", void 0);
__decorate([
    typeorm_1.Column('integer'),
    __metadata("design:type", Number)
], Task.prototype, "order", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 200 }),
    __metadata("design:type", String)
], Task.prototype, "description", void 0);
__decorate([
    typeorm_1.Column('uuid', { nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "columnId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User, user => user.tasks, {
        onDelete: 'SET NULL',
        nullable: true
    }),
    typeorm_1.Column('uuid', { name: 'userIdId', nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => board_entity_1.Board, board => board.tasks, {
        onDelete: 'CASCADE',
        nullable: true
    }),
    typeorm_1.Column('uuid', { name: 'boardIdId', nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "boardId", void 0);
Task = __decorate([
    typeorm_1.Entity()
], Task);
exports.Task = Task;
//# sourceMappingURL=task.entity.js.map