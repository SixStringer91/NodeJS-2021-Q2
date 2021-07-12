"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrelloDb1626057786688 = void 0;
class TrelloDb1626057786688 {
    constructor() {
        this.name = 'TrelloDb1626057786688';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "board" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(200) NOT NULL, "columns" jsonb, CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(200) NOT NULL, "order" integer NOT NULL, "description" character varying(200) NOT NULL, "columnId" uuid, "userIdId" uuid, "boardIdId" uuid, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(40), "login" character varying(40) NOT NULL, "password" character varying(200) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_29c593b244774c65824ae1df648" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_61a750180758aaf4a589ccefaa9" FOREIGN KEY ("boardIdId") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_61a750180758aaf4a589ccefaa9"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_29c593b244774c65824ae1df648"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "board"`);
    }
}
exports.TrelloDb1626057786688 = TrelloDb1626057786688;
//# sourceMappingURL=1626057786688-Trello_db.js.map