import AddWorkspaceForm from "../../forms/AddWorkspaceForm";
import AddBoardForm from "../../forms/AddBoardForm";
import AddTaskForm from "../../forms/AddTaskForm";
import UserConfirmationForm from "../../forms/other/UserConfirmation";
import UserNotificationForm from "../../forms/other/UserNotificationForm";

import type { ReactNode } from "react";

export enum MODALS {
  CREATE_WORKSPACE = "CREATE_WORKSPACE",
  CREATE_BOARD = "CREATE_BOARD",
  CREATE_TASK = "CREATE_TASK",
  USER_NOTIFICATION = "USER_NOTIFICATION",
  USER_CONFIRMATION = "USER_CONFIRMATION",
}

export enum STATUSES {
  DELETE_WORKSPACE = "DELETE_WORKSPACE",
  DELETE_BOARD = "DELETE_BOARD",
  DELETE_TASK = "DELETE_TASK",
}

export const ModalsMap: Record<MODALS, ReactNode> = {
  [MODALS.CREATE_WORKSPACE]: <AddWorkspaceForm />,
  [MODALS.CREATE_BOARD]: <AddBoardForm />,
  [MODALS.CREATE_TASK]: <AddTaskForm />,
  [MODALS.USER_NOTIFICATION]: <UserNotificationForm />,
  [MODALS.USER_CONFIRMATION]: <UserConfirmationForm />,
};

export type ModalType = keyof typeof MODALS;

export type ModalInfo = {
  type: ModalType;
  workspaceId?: string;
  message?: string;
  boardId?: string;
  taskId?: string;
  modalStatus?: STATUSES;
};
