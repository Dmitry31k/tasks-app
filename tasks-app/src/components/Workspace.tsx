import { useState } from "react";
import type {BoardType, WorkspaceType} from "../types/DefaultType"
import TaskBoard from "./TaskBoard";
import AddBoardForm from "./forms/AddBoardForm";

import "./styles/Workspace.css"

interface Props {
    workspace: WorkspaceType;
}

function Workspace({workspace}: Props) {
    const {workspaceId, name, boards} = workspace;

    const [actualTaskBoards, updateActualTaskBoards] = useState(boards);
    const [bShowBoardForm, updateShowBoardForm] = useState(false);

    const handleBoardsAdded = (board: BoardType) => {
        updateActualTaskBoards(oldBoards => [...oldBoards, board])
    }

    return (
        <div className="default-workspace">
            <h2>Workspace: {name}</h2>
            {actualTaskBoards.length === 0 && <span>No task boards</span>}
            <ul>
                {actualTaskBoards.map(board =>
                <li key={board.taskBoardId} className="boards-list">
                    <TaskBoard board={board} >
                    </TaskBoard>
                </li>)}
            </ul>
            <span>workspace id: {workspaceId}</span>
            <button onClick={() => updateShowBoardForm(!bShowBoardForm)}>Add board</button>
            {bShowBoardForm && 
                <AddBoardForm onBoardAdded={handleBoardsAdded}>
                </AddBoardForm>
            }
        </div>
    );
}

export default Workspace