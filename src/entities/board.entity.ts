import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('varchar', { length: 25 })
  title = 'BOARD';

  @Column({ type: 'jsonb', nullable: true })
  columns: IColumn[];

  static toResponse(board:Board):Board {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}
