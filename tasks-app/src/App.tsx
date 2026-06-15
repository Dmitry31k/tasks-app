import Workspace from "./components/Workspace"
import ModalManager from "./components/utilities/ModalManager";

import { workspacesList } from "./data/WorkspaceList"
import { useState } from "react";
import { useEffect } from "react";

import type { BoardType, WorkspaceType } from "./types/DefaultType";
import type { TaskType } from "./types/DefaultType";
import type { ModalType } from "./types/DefaultType";
import type { AppData } from "./types/DefaultType";

import "./NormalazingStyles.css"
import "./App.css"

type ModalInfo = {
    type: ModalType | null;
    workspaceId: string | null;
    boardId: string | null;
}

function App() {
    const [activeWorkspace, setActiveWorkspace] = useState(0);
    const [totalWorkspaces, updateTotalWorkspaces] = useState(workspacesList);

    const [modals, updateTotalModals] = useState<ModalType[]>([]);

    const [modalInfo, setModalInfo] = useState<ModalInfo>({
        type: null,
        workspaceId: null,
        boardId: null,
    });

    useEffect(() => {
        if (modals.length > 0) {
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }
    }, [modals]);

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

    const handleOnAddWorkspaceModalOpened = () => {
        handleModalOpened("createWorkspace");
    }

    const handleModalOpened = (modal: ModalType, workspaceId?: string, boardId?: string) => {
        updateTotalModals(oldModalsList => {
            return [...oldModalsList, modal];
        });

        setModalInfo({type: modal, workspaceId: workspaceId ?? null, boardId: boardId ?? null});
    }

    const handleModalClosed = () => {
        updateTotalModals(oldModalsList => {
            return oldModalsList.slice(0, -1);
        })
    }

    const handleDataSaving = (data: AppData) => {
        if (!data.data)
        return;

        switch (data.type) {
            case "workspace":

            handleWorkspaceAdded(data.data);
            break;
            
            case "board":

            if (modalInfo.workspaceId !== null) handleBoardAdded(data.data, modalInfo.workspaceId);
            break;

            case "task":
            if (modalInfo.boardId !== null) handleTaskAdded(data.data, modalInfo.boardId);
            break;
        };

        handleModalClosed();
        setModalInfo({workspaceId: null, boardId: null, type: null});
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
                onClick={handleOnAddWorkspaceModalOpened}
            >
                <p className="white">Add new workspace</p>
            </button>
            {totalWorkspaces.length === 0 && <span>You don't have any active task boards</span>}
            <Workspace 
                workspace={totalWorkspaces[activeWorkspace]}
                onModalOpened={handleModalOpened}
            ></Workspace>
            { modals.length > 0 &&
            <ModalManager
                activeModal={modals[modals.length - 1]}
                onModalClosed={handleModalClosed}
                onDataSaved={handleDataSaving}
            />
            }
        </>
    )
}

export default App