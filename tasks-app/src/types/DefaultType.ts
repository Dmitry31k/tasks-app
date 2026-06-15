import AddBoardForm from "../components/forms/AddBoardForm";
import AddTaskForm from "../components/forms/AddTaskForm";
import AddWorkspaceForm from "../components/forms/AddWorkspaceForm";

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

export const MODALS = {
    createWorkspace: AddWorkspaceForm,
    createBoard: AddBoardForm,
    createTask: AddTaskForm,
} as const;

export type ModalType = keyof typeof MODALS;

export type AppData = 
| {type: "workspace"; data: WorkspaceType}
| {type: "board"; data: BoardType}
| {type: "task"; data: TaskType};