"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const admin_creator_1 = require("./utils/admin.creator");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    admin_creator_1.createUserAdmin();
    await app.listen(8080);
}
bootstrap();
//# sourceMappingURL=main.js.map