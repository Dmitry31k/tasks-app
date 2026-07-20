import { useState } from "react";

import { WorkspaceStoreSelectors } from "../WorkspaceStoreSelectors";
import { ModalStoreSelectors } from "../utilities/modals/ModalStoreSelectors";

import { MODALS } from "../utilities/modals/ModalTypes";
import { v4 as uuidv4 } from "uuid";

import {
  type SubmitErrorHandler,
  type SubmitHandler,
  useForm,
} from "react-hook-form";

import type { formFields } from "./validation/DefaultZodValidation";
import { formSchema } from "./validation/DefaultZodValidation";
import { zodResolver } from "@hookform/resolvers/zod";

import "./DefaultFormStyle.css";

function AddTaskForm() {
  const { lastModal, ModalClosed, ModalOpened } = ModalStoreSelectors();
  const { AddTask } = WorkspaceStoreSelectors();
  const [bWasSaved, updateWasSaved] = useState(false);

  if (!lastModal) return;
  if (lastModal.type !== MODALS.CREATE_TASK) return;
  if (lastModal.boardId === undefined) return;

  const boardId: string = lastModal.boardId;

  const { register, handleSubmit } = useForm<formFields>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<formFields> = (data) => {
    AddTask({ taskId: uuidv4(), title: data.name }, boardId);
    updateWasSaved(true);
    ModalClosed();
  };

  const onError: SubmitErrorHandler<formFields> = (errors) => {
    ModalOpened({
      type: MODALS.USER_NOTIFICATION,
      message: errors.name?.message ?? "incorrect name",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="modal-default">
      <input
        type="text"
        placeholder="New task (can't be empty)"
        className="default-input"
        {...register("name")}
      />
      <button type="submit" className="save-button">
        <p className="white">Save task</p>
      </button>
      <button onClick={() => ModalClosed()} className="save-button">
        <p className="white">Close</p>
      </button>
    </form>
  );
}

export default AddTaskForm;
