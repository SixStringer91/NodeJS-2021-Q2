"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserAdmin = void 0;
const typeorm_1 = require("typeorm");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_entity_1 = require("../resources/users/entities/user.entity");
const createUserAdmin = async () => {
    const userRepository = typeorm_1.getRepository(user_entity_1.User);
    const findedUser = await userRepository.findOne({ login: 'admin' });
    if (!findedUser) {
        const newUser = userRepository.create({
            name: 'admin',
            login: 'admin',
            password: bcrypt_1.default.hashSync('admin', 10)
        });
        await userRepository.save(newUser);
        console.log('user admin was succsesful created');
        return;
    }
    console.log('user admin is exists in database');
};
exports.createUserAdmin = createUserAdmin;
//# sourceMappingURL=admin.creator.js.map