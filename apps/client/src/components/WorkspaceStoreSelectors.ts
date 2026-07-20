import { useWorkspaceStore } from "./WorkspacesStore";

export function WorkspaceStoreSelectors() {
    const workspaces = useWorkspaceStore((store) => store.workspaces);
    const activeWorkspaceIndex = useWorkspaceStore((store) => store.activeWorkspaceIndex);

    const DeleteWorkspace = useWorkspaceStore((store) => store.DeleteWorkspace);
    const DeleteBoard = useWorkspaceStore((store) => store.DeleteBoard);
    const DeleteTask = useWorkspaceStore((store) => store.DeleteTask);

    const AddWorkspace = useWorkspaceStore((store) => store.AddWorkspace);
    const AddBoard = useWorkspaceStore((store) => store.AddBoard);
    const AddTask = useWorkspaceStore((store) => store.AddTask);

    const GetActiveWorkspaceIndex = useWorkspaceStore((store) => store.GetActiveWorkspaceIndex);
    const SetActiveWorkspaceIndex = useWorkspaceStore((store) => store.SetActiveWorkspaceIndex);

    const SwitchToNextWorkspace = useWorkspaceStore((store) => store.SwitchToNextWorkspace);
    const SwitchToPrevWorkspace = useWorkspaceStore((store) => store.SwitchToPrevWorkspace);

    return {workspaces, 
        activeWorkspaceIndex, 
        DeleteWorkspace, 
        DeleteBoard, 
        DeleteTask, 
        AddWorkspace, 
        AddBoard, 
        AddTask, 
        GetActiveWorkspaceIndex,
        SetActiveWorkspaceIndex,
        SwitchToNextWorkspace,
        SwitchToPrevWorkspace,
    }
}