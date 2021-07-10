import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Board } from '../../boards/entities/board.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 200 })
  title: string;

  @Column('integer')
  order: number;

  @Column('varchar', { length: 200 })
  description: string;

  @Column('uuid', { nullable: true })
  columnId: string | null = null;

  @ManyToOne(() => User, (user) => user.tasks, {
    onDelete: 'SET NULL',
    nullable: true
  })
  @Column('uuid', { name: 'userIdId', nullable: true })
  userId: string | null;

  @ManyToOne(() => Board, (board) => board.tasks, {
    onDelete: 'CASCADE',
    nullable: true
  })
  @Column('uuid', { name: 'boardIdId', nullable: true })
  boardId: string;

  static toResponse(task: Task): Task {
    return {
      ...task
    };
  }
}
