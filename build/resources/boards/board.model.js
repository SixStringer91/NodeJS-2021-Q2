"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Board {
    constructor({ title = 'BOARD', columns = [] }) {
        this.id = uuid_1.v4();
        this.title = title;
        this.columns = [...columns];
    }
    static toResponse(board) {
        const { id, title, columns } = board;
        return { id, title, columns };
    }
}
exports.default = Board;
//# sourceMappingURL=board.model.js.map