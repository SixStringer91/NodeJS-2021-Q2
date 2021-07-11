"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const common_1 = require("@nestjs/common");
let LoginService = class LoginService {
    create(createLoginDto) {
        return 'This action adds a new login';
    }
    findAll() {
        return `This action returns all login`;
    }
    findOne(id) {
        return `This action returns a #${id} login`;
    }
    update(id, updateLoginDto) {
        return `This action updates a #${id} login`;
    }
    remove(id) {
        return `This action removes a #${id} login`;
    }
};
LoginService = __decorate([
    common_1.Injectable()
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map