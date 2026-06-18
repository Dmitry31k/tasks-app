import Workspace from "./components/Workspace"
import ModalManager from "./components/utilities/ModalManager";

import { workspacesList } from "./data/WorkspaceList"
import { useState } from "react";
import { useEffect } from "react";

import type { BoardType, WorkspaceType } from "./types/DefaultType";
import type { TaskType } from "./types/DefaultType";
import type { ModalType } from "./types/DefaultType";
import type { ModalInfo } from "./types/DefaultType";
import type { AppData } from "./types/DefaultType";

import "./NormalazingStyles.css"
import "./App.css"

function App() {
    const [activeWorkspace, setActiveWorkspace] = useState(0);
    const [totalWorkspaces, updateTotalWorkspaces] = useState(workspacesList);

    const [modalInfo, setModalInfo] = useState<ModalInfo[]>([]);

    useEffect(() => {
        if (modalInfo.length > 0) {
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }
    }, [modalInfo]);

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

    const handleModalOpened = (modal: ModalType, workspaceId?: string, message?: string, boardId?: string, taskId?: string) => {
        setModalInfo(oldModalsList => {
            return [...oldModalsList, {type: modal, 
                workspaceId: workspaceId ?? null, 
                message: message ?? null, 
                boardId: boardId ?? null, 
                taskId: taskId ?? null
            }];
        });
    }

    const handleModalClosed = (closedModals: number = 1) => {
        setModalInfo(oldModalsList => {
            return oldModalsList.slice(0, -closedModals);
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

            if (modalInfo[modalInfo.length - 1].workspaceId !== null) handleBoardAdded(data.data, modalInfo[modalInfo.length - 1].workspaceId);
            break;

            case "task":
            if (modalInfo[modalInfo.length - 1].boardId !== null) handleTaskAdded(data.data, modalInfo[modalInfo.length - 1].boardId);
            break;
        };

        handleModalClosed();
    }

    const handleNewModalOpened = (modal: ModalType, message?: string) => {
        handleModalOpened(modal, undefined, message);
    }

    const handleUserConfirmation = (bIsAgree: boolean) => {
        const lastModal = modalInfo[modalInfo.length - 1];

        if (bIsAgree) {
            if (lastModal.message?.includes("delete workspace")) {
                if (lastModal.workspaceId !== null)
                handleWorkspaceDeleted(lastModal.workspaceId)
            }
            if (lastModal.message?.includes("delete board")) {
                if (lastModal.workspaceId !== null && lastModal.boardId !== null)
                handleBoardDeleted(lastModal.workspaceId, lastModal.boardId);
            }
            if (lastModal.message?.includes("delete task")) {
                if (lastModal.workspaceId !== null && lastModal.boardId !== null && lastModal.taskId !== null)
                handleTaskDeleted(lastModal.workspaceId, lastModal.boardId, lastModal.taskId);
            }
            handleModalClosed(2);
        }
        else {
            handleModalClosed();
        }
    }

    const handleWorkspaceDeleted = (workspaceId: string) => {
        updateTotalWorkspaces(oldWorkspacesList => {
            const newWorkspacesList = oldWorkspacesList.filter(workspace =>
            workspace.workspaceId !== workspaceId);
            return newWorkspacesList;
        })
    }
    const handleBoardDeleted = (workspaceId: string, boardId: string) => {
        updateTotalWorkspaces(oldWorkspacesList =>
            oldWorkspacesList.map(workspace =>
                workspace.workspaceId === workspaceId
                    ? {
                        ...workspace,
                        boards: workspace.boards.filter(
                            board => board.taskBoardId !== boardId
                        )
                    }
                : workspace
            )
        )
    }
    const handleTaskDeleted = (workspaceId: string, boardId: string, taskId: string) => {
        updateTotalWorkspaces(oldWorkspacesList => 
            oldWorkspacesList.map(workspace => 
                workspace.workspaceId === workspaceId ? {
                    ...workspace,
                    boards: workspace.boards.map(board =>
                        board.taskBoardId === boardId
                        ? {
                            ...board, 
                            tasks: board.tasks.filter(
                                task => task.taskId !== taskId
                            )
                        }
                        : board
                    )
                }
                : workspace
            )
        )
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
            { modalInfo.length > 0 &&
            <ModalManager
                activeModal={modalInfo[modalInfo.length - 1]}
                onModalClosed={handleModalClosed}
                onDataSaved={handleDataSaving}
                onNewModalOpened={handleNewModalOpened}
                onUserConfirmation={handleUserConfirmation}
            />
            }
        </>
    )
}

export default App