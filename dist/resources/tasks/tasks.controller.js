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
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const task_entity_1 = require("./entities/task.entity");
const auth_guard_1 = require("../login/auth.guard");
let TasksController = class TasksController {
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    async findAll(boardId) {
        const tasks = await this.tasksService.findAll(boardId);
        if (tasks.length)
            return tasks;
        throw new common_1.HttpException('Task not found', common_1.HttpStatus.NOT_FOUND);
    }
    async create(boardId, body) {
        const newTask = await this.tasksService.create(Object.assign(Object.assign({}, body), { boardId }));
        if (newTask)
            return newTask;
        throw new common_1.HttpException('Task not found', common_1.HttpStatus.NOT_FOUND);
    }
    async findOne(boardId, taskId) {
        const task = await this.tasksService.findOne(boardId, taskId);
        if (task) {
            return task;
        }
        throw new common_1.HttpException('Task not found', common_1.HttpStatus.NOT_FOUND);
    }
    async update(taskId, body) {
        const updatedTask = await this.tasksService.update(Object.assign(Object.assign({}, body), { id: taskId }));
        if (updatedTask)
            return updatedTask;
        throw new common_1.HttpException('Task not found', common_1.HttpStatus.NOT_FOUND);
    }
    async remove(id) {
        const taskFinded = await this.tasksService.removeTask(id);
        if (taskFinded) {
            return 'The task has been deleted';
        }
        throw new common_1.HttpException('Task not found', common_1.HttpStatus.NOT_FOUND);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Param('boardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "findAll", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Param('boardId')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, task_entity_1.Task]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "create", null);
__decorate([
    common_1.Get(':taskId'),
    __param(0, common_1.Param('boardId')),
    __param(1, common_1.Param('taskId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "findOne", null);
__decorate([
    common_1.Put(':taskId'),
    __param(0, common_1.Param('taskId')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, task_entity_1.Task]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "remove", null);
TasksController = __decorate([
    common_1.Controller('/boards/:boardId/tasks'),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
exports.TasksController = TasksController;
//# sourceMappingURL=tasks.controller.js.map