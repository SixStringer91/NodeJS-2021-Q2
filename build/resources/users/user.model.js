"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class User {
    constructor({ id = uuid_1.v4(), name = 'USER', login = 'user', password = 'P@55w0rd' } = {}) {
        this['id'] = id;
        this['name'] = name;
        this['login'] = login;
        this['password'] = password;
    }
    static toResponse(user) {
        const { id, name, login } = user;
        if (id && name && login) {
            return { id, name, login };
        }
        return null;
    }
}
exports.default = User;
//# sourceMappingURL=user.model.js.map