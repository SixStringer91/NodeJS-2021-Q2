import { Board } from './entities/board.entity';
import { BoardsService } from './boards.service';
export declare class BoardsController {
    private readonly boardsService;
    constructor(boardsService: BoardsService);
    findAll(): Promise<Board[]>;
    findOne(id: string): Promise<Board>;
    create(body: Board): Promise<Board>;
    update(id: string, body: Body): Promise<Board>;
    remove(id: string): Promise<string>;
}
