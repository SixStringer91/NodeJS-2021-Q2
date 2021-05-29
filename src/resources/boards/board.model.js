const uuid = require('uuid');

class Board {
  constructor({ id = uuid.v4(), title = 'BOARD', columns = [] }) {
    this.id = id;
    this.title = title;
    this.columns = [...columns];
  }

  static columnIdGenerator(columns) {
    return columns.map((el) => ({ ...el, id: uuid.v4() }));
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
