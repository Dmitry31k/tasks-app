import type { BoardType } from "../types/DefaultType";
import { workTasksList } from "./TasksList";
import { designTasksList } from "./TasksList";
import { dailyTasksList } from "./TasksList";
import { learningTasksList } from "./TasksList";

export let workBoardsList: BoardType[] = [
    {taskBoardId: "b1", name: "Development", tasks: workTasksList},
    {taskBoardId: "b2", name: "Design", tasks: designTasksList},
]

export let personalBoardsList: BoardType[] = [
    {taskBoardId: "b3", name: "Daily tasks", tasks: dailyTasksList},
    {taskBoardId: "b4", name: "Learning", tasks: learningTasksList},
]