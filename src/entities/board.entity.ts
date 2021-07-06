import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { Task } from './task.entity';

interface IColumn {
  title: string;
  order:number;
}

@Entity({
  name: 'board'
})
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 200 })
  title = 'BOARD';

  @Column({ type: 'jsonb', nullable: true })
  columns: IColumn[];

  @OneToMany(() => Task, (task:Task) => task.boardId)
  tasks: Task[];

  static toResponse(board:Board):Board {
    const {
      id, title, columns, tasks
    } = board;
    return {
      id, title, columns, tasks
    };
  }
}
