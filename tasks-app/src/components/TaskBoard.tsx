import type {BoardType} from "../types/DefaultType"

import "./styles/TaskBoard.css"

interface Props {
    board: BoardType
}

function TaskBoard({board}: Props) {
    const {taskBoardId, name, tasks} = board;

    return (
        <>
            <h3>Board: {name}</h3>
            {tasks.length === 0 && <span>No tasks found</span>}
            <ul>
                {tasks.map(task => <li key={task.taskId}>{task.title}</li>)}
            </ul>
            <span>task board id: {taskBoardId}</span>
        </>
    );
}

export default TaskBoard;