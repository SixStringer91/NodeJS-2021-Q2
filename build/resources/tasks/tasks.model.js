"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Task {
    constructor({ title, order, description, userId, boardId, columnId }) {
        this.id = uuid_1.v4();
        this.title = title;
        this.order = order;
        this.description = description;
        this.userId = userId;
        this.boardId = boardId;
        this.columnId = columnId;
    }
    static toResponse(task) {
        const { id, title, order, description, userId, boardId, columnId } = task;
        return {
            id, title, order, description, userId, boardId, columnId
        };
    }
}
exports.default = Task;
//# sourceMappingURL=tasks.model.js.map