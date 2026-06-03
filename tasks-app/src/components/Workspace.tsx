import { useState } from "react";

import type {BoardType, WorkspaceType} from "../types/DefaultType"
import type { TaskType } from "../types/DefaultType";

import TaskBoard from "./TaskBoard";
import AddBoardForm from "./forms/AddBoardForm";

import "./styles/Workspace.css"
import "./forms/DefaultFormStyle.css"

interface Props {
    workspace: WorkspaceType;
    onBoardAdded: (board: BoardType, workspaceId: string) => void;
    onTaskAdded: (task: TaskType, BoardId: string) => void;
}

function Workspace({workspace, onBoardAdded, onTaskAdded}: Props) {
    const {workspaceId, name, boards} = workspace;

    const [bShowBoardForm, updateShowBoardForm] = useState(false);

    const handleBoardAdded = (board: BoardType) => {
        onBoardAdded(board, workspaceId);
    }

    return (
        <div className="default-workspace">
            <h2>Workspace: {name}</h2>
            {boards.length === 0 && <span>No task boards</span>}
            <ul>
                {boards.map(board =>
                <li key={board.taskBoardId} className="boards-list">
                    <TaskBoard board={board} onTaskAdded={onTaskAdded} >
                    </TaskBoard>
                </li>)}
            </ul>
            <span>workspace id: {workspaceId}</span>
            <button onClick={() => updateShowBoardForm(!bShowBoardForm)}
                className="add-button"
            >Add board</button>
            {bShowBoardForm && 
                <AddBoardForm onBoardAdded={handleBoardAdded}>
                </AddBoardForm>
            }
        </div>
    );
}

export default Workspace