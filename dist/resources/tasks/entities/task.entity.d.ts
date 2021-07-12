export declare class Task {
    id: string;
    title: string;
    order: number;
    description: string;
    columnId: string | null;
    userId: string | null;
    boardId: string;
    static toResponse(task: Task): Task;
}
