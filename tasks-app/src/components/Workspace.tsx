import type {WorkspaceType} from "../types/DefaultType"
import type { ModalType } from "../types/DefaultType";

import TaskBoard from "./TaskBoard";

import "./styles/Workspace.css"
import "./forms/DefaultFormStyle.css"

interface Props {
    workspace: WorkspaceType;
    onModalOpened: (modal: ModalType, workspaceId: string, message?: string, boardId?: string, taskId?: string) => void;
}

function Workspace({workspace, onModalOpened}: Props) {
    const {workspaceId, name, boards} = workspace;

    const handleOnAddBoardModalOpened = () => {
        onModalOpened("createBoard", workspaceId);
    }

    const handleOnAddTaskModalOpened = (boardId: string) => {
        onModalOpened("createTask", workspaceId, boardId);
    }

    const handleDeletingWorkspace = () => {
        onModalOpened("userConfirmation", workspaceId, "Are you sure you want to delete workspace? (this can't be undone)");
    }
    const handleBoardDeleted = (boardId: string) => {
        onModalOpened("userConfirmation", workspaceId, "Are you sure you want to delete board? (this can't be undone)", boardId);
    }
    const handleTaskDeleted = (boardId: string, taskId: string) => {
        onModalOpened("userConfirmation", workspaceId, "Are you sure you want to delete task? (this can't be undone)", boardId, taskId);
    }

    return (
        <div className="default-workspace">
            <h2>Workspace: {name}</h2>
            {boards.length === 0 && <span>No task boards</span>}
            <ul>
                {boards.map(board =>
                <li key={board.taskBoardId} className="boards-list">
                    <TaskBoard board={board}
                        onTaskModalOpened={handleOnAddTaskModalOpened}
                        onBoardDeleted={handleBoardDeleted}
                        onTaskDeleted={handleTaskDeleted}
                    >
                    </TaskBoard>
                </li>)}
            </ul>
            <span>workspace id: {workspaceId}</span>
            <button onClick={handleOnAddBoardModalOpened}
                className="add-button"
            >Add board</button>
            <button onClick={handleDeletingWorkspace}>Delete Workspace</button>
        </div>
    );
}

export default Workspace