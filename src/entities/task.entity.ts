import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm';
import { Board } from './board.entity';
import { User } from './user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 40 })
  title: string;

  @Column('integer')
  order: number;

  @Column('varchar', { length: 140 })
  description: string;

  @Column('uuid', { nullable: true })
  columnId: string | null = null;

  @ManyToOne(() => User, (user) => user.tasks, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @Column('uuid', { name: 'userIdId', nullable: true }) 
  userId: string | null;

  @ManyToOne(() => Board, (board) => board.tasks, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @Column('uuid', { name: 'boardIdId', nullable: true })
  boardId: string;

  static toResponse(task:Task):Task {
    return {
      ...task
    };
  }
}
