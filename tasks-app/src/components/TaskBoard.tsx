import { useState } from "react";

import type {BoardType} from "../types/DefaultType"
import type { TaskType } from "../types/DefaultType"

import AddTaskForm from "./forms/AddTaskForm"

import "./styles/TaskBoard.css"
import "./forms/DefaultFormStyle.css"

interface Props {
    board: BoardType;
    onTaskAdded: (task: TaskType, boardId: string) => void;
}

function TaskBoard({board, onTaskAdded}: Props) {
    const {taskBoardId, name, tasks} = board;

    const [bShowTaskForm, setShowTaskForm] = useState(false);

    const handleTaskAdded = (task: TaskType) => {
        onTaskAdded(task, taskBoardId);
    } 

    return (
        <>
            <h3>Board: {name}</h3>
            {tasks.length === 0 && <span>No tasks found</span>}
            <ul>
                {tasks.map(task => <li key={task.taskId}>{task.title}</li>)}
            </ul>
            <span>task board id: {taskBoardId}</span>
            <button onClick={() => setShowTaskForm(!bShowTaskForm)}
                className="add-button"
            >Add task</button>
            {bShowTaskForm && <AddTaskForm onTaskAdded={handleTaskAdded}></AddTaskForm>}
        </>
    );
}

export default TaskBoard;