import type { BoardType } from "../types/DefaultType";

import "./styles/TaskBoard.css";
import "./forms/DefaultFormStyle.css";

interface Props {
  board: BoardType;
  onTaskModalOpened: (boardId: string) => void;
  onBoardDeleted: (boardId: string) => void;
  onTaskDeleted: (boardId: string, taskId: string) => void;
}

function TaskBoard({
  board,
  onTaskModalOpened,
  onBoardDeleted,
  onTaskDeleted,
}: Props) {
  const { taskBoardId, name, tasks } = board;

  const handleOnAddTaskModalOpened = () => {
    onTaskModalOpened(taskBoardId);
  };

  const handleBoardDeleted = () => {
    onBoardDeleted(taskBoardId);
  };
  const handleTaskDeleted = (taskId: string) => {
    onTaskDeleted(taskBoardId, taskId);
  };

  return (
    <>
      <h3>Board: {name}</h3>
      {tasks.length === 0 && <span>No tasks found</span>}
      <ul>
        {tasks.map((task) => (
          <li key={task.taskId}>
            {task.title}
            <button onClick={() => handleTaskDeleted(task.taskId)}>
              Delete task
            </button>
          </li>
        ))}
      </ul>
      <span>task board id: {taskBoardId}</span>
      <button onClick={handleOnAddTaskModalOpened} className="add-button">
        Add task
      </button>
      <button onClick={handleBoardDeleted}>Delete board</button>
    </>
  );
}

export default TaskBoard;
