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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const task_entity_1 = require("../../tasks/entities/task.entity");
const jwt = require('jsonwebtoken');
let User = User_1 = class User {
    static get toResponse() {
        return User_1._toResponse;
    }
    static set toResponse(value) {
        User_1._toResponse = value;
    }
};
User._toResponse = (user) => {
    const { id, name, login, tasks } = user;
    const token = jwt.sign({ id: user.id }, process.env['JWT_SECRET_KEY'], { expiresIn: 60 * 60 * 24 });
    return {
        id,
        name,
        login,
        token,
        tasks
    };
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 40, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 40 }),
    __metadata("design:type", String)
], User.prototype, "login", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 200 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.OneToMany(() => task_entity_1.Task, (task) => task.userId, {
        cascade: true
    }),
    __metadata("design:type", Array)
], User.prototype, "tasks", void 0);
User = User_1 = __decorate([
    typeorm_1.Entity({
        name: 'user'
    })
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map