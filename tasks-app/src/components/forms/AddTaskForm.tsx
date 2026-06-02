import type { TaskType } from "../../types/DefaultType"
import { useState } from "react";

interface Props {
    onTaskAdded: (task: TaskType) => void;
}

function AddTaskForm({onTaskAdded}: Props) {
    const [userTask, updateUserTask] = useState("");
    const [userTaskId, updateUserTaskId] = useState("");
    const [bDisableSaveButton, updateDisableSaveButton] = useState(true);

    const handleTaskAdded = () => {
        let finalId: string = userTaskId === "" ? "not provided" : userTaskId;

        onTaskAdded({taskId: finalId, title: userTask});

        updateUserTask("");
        updateUserTaskId("");
        updateDisableSaveButton(true);
    }

    const handleUpdatingUserTaskInput = (input: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        if (input.target.value !== "") {
            updateDisableSaveButton(false);
        }
        else {
            updateDisableSaveButton(true);
        }

        updateUserTask(input.target.value)
    }

    return (
        <>
            <input type="text" 
                placeholder="New task (can't be empty)" 
                onChange={handleUpdatingUserTaskInput} 
                value={userTask}
            />
            <input type="text" 
                placeholder="Task Id" 
                onChange={(input) => updateUserTaskId(input.target.value)} 
                value={userTaskId}
            />
            <button onClick={handleTaskAdded} disabled={bDisableSaveButton}>Save task</button>
        </>
    );
}

export default AddTaskForm;