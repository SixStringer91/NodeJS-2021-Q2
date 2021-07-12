"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthGuard {
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const header = req.headers['x-access-token'] || req.headers.authorization;
        const sessionToken = header ? header.replace(/^Bearer\s+/, '') : '';
        if (!sessionToken) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        else {
            return new Promise(resolve => {
                jsonwebtoken_1.default.verify(sessionToken, process.env.JWT_SECRET_KEY, (_err, decoded) => {
                    if (decoded) {
                        typeorm_1.getRepository(user_entity_1.User)
                            .findOne({
                            where: { id: decoded.id }
                        })
                            .then(() => {
                            resolve(true);
                        }, () => {
                            throw new common_1.HttpException('Unauthorized error', common_1.HttpStatus.UNAUTHORIZED);
                        });
                    }
                    else {
                        throw new common_1.HttpException('Unauthorized error', common_1.HttpStatus.UNAUTHORIZED);
                    }
                });
            });
        }
    }
}
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map