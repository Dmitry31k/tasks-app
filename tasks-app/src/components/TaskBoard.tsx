import type {BoardType} from "../types/DefaultType"

import "./styles/TaskBoard.css"
import "./forms/DefaultFormStyle.css"

interface Props {
    board: BoardType;
    onTaskModalOpened: (boardId: string) => void;
}

function TaskBoard({board, onTaskModalOpened}: Props) {
    const {taskBoardId, name, tasks} = board;

    const handleOnAddTaskModalOpened = () => {
        onTaskModalOpened(taskBoardId);
    } 

    return (
        <>
            <h3>Board: {name}</h3>
            {tasks.length === 0 && <span>No tasks found</span>}
            <ul>
                {tasks.map(task => <li key={task.taskId}>{task.title}</li>)}
            </ul>
            <span>task board id: {taskBoardId}</span>
            <button onClick={handleOnAddTaskModalOpened}
                className="add-button"
            >Add task</button>
        </>
    );
}

export default TaskBoard;