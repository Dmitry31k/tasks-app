import { useState } from "react";
import type {BoardType} from "../types/DefaultType"
import AddTaskForm from "./forms/AddTaskForm"
import type { TaskType } from "../types/DefaultType";

import "./styles/TaskBoard.css"

interface Props {
    board: BoardType;
}

function TaskBoard({board}: Props) {
    const {taskBoardId, name, tasks} = board;

    const [bShowTaskForm, setShowTaskForm] = useState(false);
    const [actualTasks, updateActualTasks] = useState(tasks);

    const handleTaskAdded = (task: TaskType) => {
        updateActualTasks(oldTasks => [...oldTasks, task]);
    }

    return (
        <>
            <h3>Board: {name}</h3>
            {actualTasks.length === 0 && <span>No tasks found</span>}
            <ul>
                {actualTasks.map(task => <li key={task.taskId}>{task.title}</li>)}
            </ul>
            <span>task board id: {taskBoardId}</span>
            <button onClick={() => setShowTaskForm(!bShowTaskForm)}>Add task</button>
            {bShowTaskForm && <AddTaskForm onTaskAdded={handleTaskAdded}></AddTaskForm>}
        </>
    );
}

export default TaskBoard;