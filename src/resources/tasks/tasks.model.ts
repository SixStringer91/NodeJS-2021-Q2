import { v4 as uuid } from 'uuid';

export default class Task {
  title:string;

  order:number;

  description:string;

  userId:string | null;

  boardsId:string;

  columnId:string;

  id: string;

  constructor({
    title,
    order,
    description,
    userId,
    boardsId,
    columnId,
  }:Task) {
    this.id = uuid();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardsId = boardsId;
    this.columnId = columnId;
  }

  static toResponse(task:Task):Task {
    const {
      id, title, order, description, userId, boardsId, columnId,
    } = task;
    return {
      id, title, order, description, userId, boardsId, columnId,
    };
  }
}
