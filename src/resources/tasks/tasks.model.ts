import { v4 as uuid } from 'uuid';

export default class Task {
  title:string;

  order:number;

  description:string;

  userId:string | null;

  boardId:string;

  columnId:string;

  id: string;

  constructor({
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  }:Task) {
    this.id = uuid();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task:Task):Task {
    const {
      id, title, order, description, userId, boardId, columnId
    } = task;
    return {
      id, title, order, description, userId, boardId, columnId
    };
  }
}
