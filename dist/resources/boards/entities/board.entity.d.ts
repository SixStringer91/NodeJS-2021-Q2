import { Task } from '../../tasks/entities/task.entity';
interface IColumn {
    title: string;
    order: number;
}
export declare class Board {
    id: string;
    title: string;
    columns: IColumn[];
    tasks: Task[];
    static toResponse(board: Board): Board;
}
export {};
