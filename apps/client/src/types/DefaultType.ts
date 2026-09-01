export interface TaskType {
    taskId: string;
    title: string;
}

export interface BoardType {
    taskBoardId: string;
    name: string;
    tasks: TaskType[];
}

export interface WorkspaceType {
    workspaceId: string;
    name: string;
    boards: BoardType[];
}