import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30 })
  title: string;

  @Column()
  order: number;

  @Column({ type: 'varchar', length: 30 })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  userId: string | null;

  @Column({ type: 'varchar', nullable: true })
  boardId: string | null;

  @Column({ type: 'varchar', nullable: true })
  columnId: string | null;

  static toResponse(task:Task):Task {
    const {
      id, title, order, description, userId, boardId, columnId
    } = task;
    return {
      id, title, order, description, userId, boardId, columnId
    };
  }
}
