import type { WorkspaceType } from "../types/DefaultType";
import { workBoardsList } from "./BoardsList";
import { personalBoardsList } from "./BoardsList";

export let workspacesList: WorkspaceType[] = [
    {workspaceId: "w1", name: "Work", boards: workBoardsList},
    {workspaceId: "w2", name: "Personal", boards: personalBoardsList},
]