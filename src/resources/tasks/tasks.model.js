const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  }) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(board) {
    const { title, order, description, userId, boardId, columnId } = board;
    return { title, order, description, userId, boardId, columnId };
  }
}

module.exports = Task;
