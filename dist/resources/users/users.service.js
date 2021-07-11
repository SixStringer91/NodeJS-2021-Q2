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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getAll() {
        const userRepository = await this.userRepository.find({ where: {} });
        const toResponse = userRepository.map(user_entity_1.User.toResponse);
        return toResponse;
    }
    async createUser(user) {
        const newUser = this.userRepository.create({
            name: user.name,
            login: user.login,
            password: bcrypt_1.default.hashSync(user.password, 10)
        });
        const updatedUser = await this.userRepository.save(newUser);
        return user_entity_1.User.toResponse(updatedUser);
    }
    async getUser(id) {
        console.log(id);
        const user = await this.userRepository.findOne(id);
        if (user)
            return user_entity_1.User.toResponse(user);
        return null;
    }
    async updateUser(obj) {
        const findedUser = await this.userRepository.findOne(obj.id);
        if (!findedUser)
            return null;
        const reducedData = { ...findedUser, ...obj };
        const updatedUser = await this.userRepository.update(obj.id, reducedData);
        if (updatedUser.affected)
            return user_entity_1.User.toResponse(reducedData);
        return null;
    }
    async deleteUser(id) {
        const deletionRes = await this.userRepository.delete(id);
        if (deletionRes.affected)
            return true;
        return false;
    }
    async auth({ login, password }) {
        const user = await this.userRepository.findOne({ login });
        console.log(login);
        return new Promise((resolve, reject) => {
            if (user) {
                bcrypt_1.default.compare(password, user.password, (_err, matches) => {
                    if (matches) {
                        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 * 24 });
                        resolve({
                            ...user_entity_1.User.toResponse(user),
                            token,
                            message: 'Successfully authenticated.'
                        });
                    }
                    reject();
                });
            }
        });
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map