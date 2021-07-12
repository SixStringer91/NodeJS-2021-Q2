"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const admin_creator_1 = require("./utils/admin.creator");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.join(__dirname, '../.env')
});
async function bootstrap() {
    const isFastify = JSON.parse(process.env.USE_FASTIFY.toLowerCase());
    const app = isFastify
        ? await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter())
        : await core_1.NestFactory.create(app_module_1.AppModule);
    admin_creator_1.createUserAdmin();
    await app.listen(8080, '0.0.0.0');
    console.log(`enabled ${isFastify ? 'fastify' : 'express'}`);
}
bootstrap();
//# sourceMappingURL=main.js.map