import { v4 as uuid } from 'uuid';

interface IColumn {
  title: string;
  order:number;
}

export default class Board {
  id:string;

  title:string;

  columns:IColumn[];

  constructor({ title = 'BOARD', columns = [] }:Board) {
    this.id = uuid();
    this.title = title;
    this.columns = [...columns];
  }

  static toResponse(board:Board):Board {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}
