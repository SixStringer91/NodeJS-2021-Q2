const uuid = require('uuid');

class Task {
  constructor({
    id = uuid.v4(),
    title = 'BOARD',
    columns = []
  }) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  };

  static columnIdGenerator(column) {
   return column.map(el => ({...el, id: uuid.v4()}));
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  };
};

module.exports = Task;