import type { TaskType } from "../../types/DefaultType"
import { useState } from "react"
import { generateId } from "../utilities/IdGenerator"

import "./DefaultFormStyle.css"

interface Props {
    onTaskAdded: (task: TaskType) => void;
    onModalClosed: () => void;
}

function AddTaskForm({onTaskAdded, onModalClosed}: Props) {
    const [userTask, updateUserTask] = useState("");
    const [bDisableSaveButton, updateDisableSaveButton] = useState(true);

    const handleTaskAdded = () => {
        onTaskAdded({taskId: generateId("Task"), title: userTask});

        updateUserTask("");
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
        <p className="modal-default">
            <input type="text" 
                placeholder="New task (can't be empty)" 
                onChange={handleUpdatingUserTaskInput} 
                value={userTask}
                className="default-input"
            />
            <button onClick={handleTaskAdded} 
                disabled={bDisableSaveButton}
                className="save-button"
            ><p className="white">Save task</p></button>
            <button onClick={onModalClosed} 
                className="save-button"
            ><p className="white">Close</p></button>
        </p>
    );
}

export default AddTaskForm;