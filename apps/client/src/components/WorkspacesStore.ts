import { create } from "zustand";

import type { TaskType, BoardType, WorkspaceType } from "../types/DefaultType";
import { workspacesList } from "../data/WorkspaceList";

type WorkspaceStore = {
    workspaces: WorkspaceType[];
    activeWorkspaceIndex: number;

    DeleteWorkspace: (workspaceId: string) => void;
    DeleteBoard: (workspaceId: string, boardId: string) => void;
    DeleteTask: (workspaceId: string, boardId: string, taskId: string) => void;

    AddWorkspace: (workspace: WorkspaceType) => void;
    AddBoard: (board: BoardType, workspaceId: string) => void;
    AddTask: (task: TaskType, boardId: string) => void;

    GetActiveWorkspaceIndex: () => number;
    SetActiveWorkspaceIndex: (index: number) => void;

    SwitchToNextWorkspace: () => void;
    SwitchToPrevWorkspace: () => void;
}

export const useWorkspaceStore = create<WorkspaceStore>((set, get) => ({
    workspaces: workspacesList,
    activeWorkspaceIndex: 0,

    DeleteWorkspace: (workspaceId: string) => {
        set((state) => ({
            workspaces: state.workspaces.filter(workspace => workspace.workspaceId !== workspaceId)
        }))
    },
    DeleteBoard: (workspaceId: string, boardId: string) => {
        set((state) => ({
            workspaces: state.workspaces.map(workspace =>
                workspace.workspaceId === workspaceId
                    ? {
                        ...workspace,
                        boards: workspace.boards.filter(
                            board => board.taskBoardId !== boardId
                        )
                    }
                : workspace
            )
        }))
    },
    DeleteTask: (workspaceId: string, boardId: string, taskId: string) => {
        set((state) => ({
            workspaces: state.workspaces.map(workspace => 
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
        }))
    },

    AddWorkspace: (workspace: WorkspaceType) => {
        set((state) => ({
            workspaces: [...state.workspaces, workspace]
        }))
        get().SetActiveWorkspaceIndex(get().workspaces.length - 1)
    },
    AddBoard: (board: BoardType, workspaceId: string) => {
        set((state) => ({
            workspaces: state.workspaces.map(
                workspace => workspace.workspaceId === workspaceId ? {
                ...workspace,
                boards: [...workspace.boards, board]
            }
            : workspace)
        }))
    },
    AddTask: (task: TaskType, boardId: string) => {
        set((state) => ({
            workspaces: state.workspaces.map(workspaces => ({
                ...workspaces, 
                boards: workspaces.boards.map(board => 
                    board.taskBoardId === boardId ? {
                        ...board,
                        tasks: [...board.tasks, task]
                    }
                    : board
                )
            }))
        }))
    },

    GetActiveWorkspaceIndex: () => {
        return get().activeWorkspaceIndex;
    },
    SetActiveWorkspaceIndex: (index: number) => {
        set({
            activeWorkspaceIndex: index
        })
    },

    SwitchToNextWorkspace: () => {
        if (get().workspaces.length === 0)
        return;

        if (get().activeWorkspaceIndex < get().workspaces.length - 1) {
            get().SetActiveWorkspaceIndex(get().activeWorkspaceIndex + 1);
        }
        else {
            get().SetActiveWorkspaceIndex(0);
        }
    },
    SwitchToPrevWorkspace: () => {
        if (get().workspaces.length === 0)
        return;

        if (get().activeWorkspaceIndex <= 0) {
            get().SetActiveWorkspaceIndex(get().workspaces.length - 1);
        }
        else {
            get().SetActiveWorkspaceIndex(get().activeWorkspaceIndex - 1);
        }
    }
}));