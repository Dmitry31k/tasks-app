import Workspace from "./components/Workspace"
import AddWorkspaceForm from "./components/forms/AddWorkspaceForm"

import { workspacesList } from "./data/WorkspaceList"
import { useState } from "react";

import type { BoardType, WorkspaceType } from "./types/DefaultType";
import type { TaskType } from "./types/DefaultType";

import "./NormalazingStyles.css"
import "./App.css"

function App() {
    const [activeWorkspace, setActiveWorkspace] = useState(0);
    const [totalWorkspaces, updateTotalWorkspaces] = useState(workspacesList);
    const [bHideAddWorkspaceForm, updateHideWorkspaceForm] = useState(true);

    const handleSwitchNextWorkspace = () => {
        if (totalWorkspaces.length === 0)
        return;

        if (activeWorkspace < totalWorkspaces.length - 1) {
            setActiveWorkspace(activeWorkspace + 1);
        }
        else {
            setActiveWorkspace(0);
        }
    }
    const handleSwitchPrevWorkspace = () => {
        if (totalWorkspaces.length === 0)
        return;

        if (activeWorkspace <= 0) {
            setActiveWorkspace(totalWorkspaces.length - 1);
        }
        else {
            setActiveWorkspace(activeWorkspace - 1);
        }
    }

    const handleWorkspaceAdded = (workspace: WorkspaceType) => {
        updateTotalWorkspaces(oldWorkspaces => {
            const newWorkspacesList = [...oldWorkspaces, workspace]; 
            setActiveWorkspace(newWorkspacesList.length - 1);
            updateHideWorkspaceForm(true);
            return newWorkspacesList;
        });
    }

    const handleBoardAdded = (board: BoardType, workspaceId: string) => {
        updateTotalWorkspaces(oldWorkspacesList => 
            oldWorkspacesList.map(
                workspace => workspace.workspaceId === workspaceId ? {
                ...workspace,
                boards: [...workspace.boards, board]
            }
            : workspace)
        );
    }

    const handleTaskAdded = (task: TaskType, boardId: string) => {
        updateTotalWorkspaces(oldWorkspacesList => 
            oldWorkspacesList.map(workspaces => ({
                ...workspaces, 
                boards: workspaces.boards.map(board => 
                    board.taskBoardId === boardId ? {
                        ...board,
                        tasks: [...board.tasks, task]
                    }
                    : board
                )})
            )
        );
    }

    return (
        <>
            <header className="default-site-header">
                <h1 className="grey">Task manager</h1>
            </header>
            <button onClick={handleSwitchNextWorkspace} className="default-button">
                <p className="white">Switch to next workspace</p>
            </button>
            <button onClick={handleSwitchPrevWorkspace} className="default-button">
                <p className="white">Switch to previous workspace</p>
            </button>
            <button className="default-button"
                onClick={() => updateHideWorkspaceForm(!bHideAddWorkspaceForm)}
            >
                <p className="white">Add new workspace</p>
            </button>
            {!bHideAddWorkspaceForm && 
            <AddWorkspaceForm 
                onWorkspaceAdded={handleWorkspaceAdded}
            ></AddWorkspaceForm>}
            {totalWorkspaces.length === 0 && <span>You don't have any active task boards</span>}
            <Workspace 
                workspace={totalWorkspaces[activeWorkspace]}
                onBoardAdded={handleBoardAdded}
                onTaskAdded={handleTaskAdded}
                globalWorkspacesList={totalWorkspaces}
            ></Workspace>
        </>
    )
}

export default App