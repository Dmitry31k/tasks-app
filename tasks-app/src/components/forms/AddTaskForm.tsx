import { useState } from "react";

import { WorkspaceStoreSelectors } from "../WorkspaceStoreSelectors";
import { ModalStoreSelectors } from "../utilities/modals/ModalStoreSelectors";

import { MODALS } from "../utilities/modals/ModalTypes";
import { v4 as uuidv4 } from "uuid";

import "./DefaultFormStyle.css";

function AddTaskForm() {
  const [userTask, updateUserTask] = useState("");
  const [bDisableSaveButton, updateDisableSaveButton] = useState(true);

  const { lastModal, ModalClosed } = ModalStoreSelectors();
  const { AddTask } = WorkspaceStoreSelectors();

  if (!lastModal) return;
  if (lastModal.type !== MODALS.CREATE_TASK) return;
  if (lastModal.boardId === undefined) return;

  const boardId: string = lastModal.boardId;

  const handleTaskAdded = () => {
    AddTask({ taskId: uuidv4(), title: userTask }, boardId);
    updateUserTask("");
    updateDisableSaveButton(true);
    ModalClosed();
  };

  const handleUpdatingUserTaskInput = (
    input: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    if (input.target.value !== "") {
      updateDisableSaveButton(false);
    } else {
      updateDisableSaveButton(true);
    }

    updateUserTask(input.target.value);
  };

  return (
    <p className="modal-default">
      <input
        type="text"
        placeholder="New task (can't be empty)"
        onChange={handleUpdatingUserTaskInput}
        value={userTask}
        className="default-input"
      />
      <button
        onClick={handleTaskAdded}
        disabled={bDisableSaveButton}
        className="save-button"
      >
        <p className="white">Save task</p>
      </button>
      <button onClick={() => ModalClosed()} className="save-button">
        <p className="white">Close</p>
      </button>
    </p>
  );
}

export default AddTaskForm;
