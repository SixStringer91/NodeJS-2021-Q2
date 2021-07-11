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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const task_entity_1 = require("./entities/task.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let TasksService = class TasksService {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }
    async findAll(boardId) {
        const tasks = await this.tasksRepository.find({ boardId });
        return tasks.map(task_entity_1.Task.toResponse);
    }
    async create(task) {
        const newTask = this.tasksRepository.create(task);
        const createdTask = await this.tasksRepository.save(newTask);
        return task_entity_1.Task.toResponse(createdTask);
    }
    async findOne(boardId, id) {
        const findTask = await this.tasksRepository.findOne({ boardId, id });
        if (findTask)
            return task_entity_1.Task.toResponse(findTask);
        return null;
    }
    async update(obj) {
        const findedTask = await this.tasksRepository.findOne(obj.id);
        if (!findedTask)
            return null;
        const reducedData = Object.assign(Object.assign({}, findedTask), obj);
        const updatedTask = await this.tasksRepository.update(obj.id, reducedData);
        if (updatedTask.affected)
            return task_entity_1.Task.toResponse(reducedData);
        return null;
    }
    async removeTask(id) {
        const deletionRes = await this.tasksRepository.delete(id);
        if (deletionRes.affected)
            return true;
        return false;
    }
};
TasksService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map