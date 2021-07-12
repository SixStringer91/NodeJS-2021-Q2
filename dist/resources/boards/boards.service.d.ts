import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
export declare class BoardsService {
    private readonly boardsRepository;
    constructor(boardsRepository: Repository<Board>);
    findAll(): Promise<Board[]>;
    create(board: Board): Promise<Board>;
    findOne(id: string): Promise<Board>;
    update(obj: any): Promise<Board>;
    remove(id: string): Promise<boolean>;
}
