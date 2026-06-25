import type { WorkspaceType } from "../types/DefaultType";
import { ModalStoreSelectors } from "./utilities/modals/ModalStoreSelectors";
import { MODALS, STATUSES } from "./utilities/modals/ModalTypes";

import TaskBoard from "./TaskBoard";

import "./styles/Workspace.css";
import "./forms/DefaultFormStyle.css";

interface Props {
  workspace: WorkspaceType;
}

function Workspace({ workspace }: Props) {
  const { ModalOpened } = ModalStoreSelectors();

  if (!workspace) return;

  const { workspaceId, name, boards } = workspace;

  const handleOnAddBoardModalOpened = () => {
    ModalOpened({ type: MODALS.CREATE_BOARD, workspaceId: workspaceId });
  };

  const handleOnAddTaskModalOpened = (boardId: string) => {
    ModalOpened({
      type: MODALS.CREATE_TASK,
      workspaceId: workspaceId,
      boardId: boardId,
    });
  };

  const handleDeletingWorkspace = () => {
    ModalOpened({
      type: MODALS.USER_CONFIRMATION,
      message:
        "Are you sure you want to delete workspace? (this can't be undone)",
      workspaceId: workspaceId,
      modalStatus: STATUSES.DELETE_WORKSPACE,
    });
  };
  const handleBoardDeleted = (boardId: string) => {
    ModalOpened({
      type: MODALS.USER_CONFIRMATION,
      message: "Are you sure you want to delete board? (this can't be undone)",
      workspaceId: workspaceId,
      boardId: boardId,
      modalStatus: STATUSES.DELETE_BOARD,
    });
  };
  const handleTaskDeleted = (boardId: string, taskId: string) => {
    ModalOpened({
      type: MODALS.USER_CONFIRMATION,
      message: "Are you sure you want to delete task? (this can't be undone)",
      workspaceId: workspaceId,
      boardId: boardId,
      taskId: taskId,
      modalStatus: STATUSES.DELETE_TASK,
    });
  };

  return (
    <div className="default-workspace">
      <h2>Workspace: {name}</h2>
      {boards.length === 0 && <span>No task boards</span>}
      <ul>
        {boards.map((board) => (
          <li key={board.taskBoardId} className="boards-list">
            <TaskBoard
              board={board}
              onTaskModalOpened={handleOnAddTaskModalOpened}
              onBoardDeleted={handleBoardDeleted}
              onTaskDeleted={handleTaskDeleted}
            />
          </li>
        ))}
      </ul>
      <span>workspace id: {workspaceId}</span>
      <button onClick={handleOnAddBoardModalOpened} className="add-button">
        Add board
      </button>
      <button onClick={handleDeletingWorkspace}>Delete Workspace</button>
    </div>
  );
}

export default Workspace;
