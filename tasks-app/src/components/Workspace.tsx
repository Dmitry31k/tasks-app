import type {WorkspaceType} from "../types/DefaultType"
import TaskBoard from "./TaskBoard";

import "./styles/Workspace.css"

interface Props {
    workspace: WorkspaceType;
}

function Workspace({workspace}: Props) {
    const {workspaceId, name, boards} = workspace;

    return (
        <p className="default-workspace">
            <h2>Workspace: {name}</h2>
            {boards.length === 0 && <span>No task boards</span>}
            <ul>
                {boards.map(board =>
                <li key={board.taskBoardId} className="boards-list">
                    <TaskBoard board={board} >
                    </TaskBoard>
                </li>)}
            </ul>
            <span>workspace id: {workspaceId}</span>
        </p>
    );
}

export default Workspace