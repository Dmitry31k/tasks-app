import AddBoardForm from "../components/forms/AddBoardForm";
import AddTaskForm from "../components/forms/AddTaskForm";
import AddWorkspaceForm from "../components/forms/AddWorkspaceForm";
import UserNotificationForm from "../components/forms/other/UserNotificationForm";
import UserConfirmationForm from "../components/forms/other/UserConfirmation";

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
    userNotification: UserNotificationForm,
    userConfirmation: UserConfirmationForm,
} as const;

export type ModalType = keyof typeof MODALS;

export type AppData = 
| {type: "workspace"; data: WorkspaceType}
| {type: "board"; data: BoardType}
| {type: "task"; data: TaskType};

export type ModalInfo = {
    type: ModalType | null;
    workspaceId: string | null;
    message: string | null;
    boardId: string | null;
    taskId: string | null;
}