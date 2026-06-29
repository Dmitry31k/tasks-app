import { useState } from "react";

import { ModalStoreSelectors } from "../utilities/modals/ModalStoreSelectors";
import { WorkspaceStoreSelectors } from "../WorkspaceStoreSelectors";

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

function AddBoardForm() {
  const { lastModal, ModalClosed, ModalOpened } = ModalStoreSelectors();
  const { AddBoard } = WorkspaceStoreSelectors();
  const [bWasSaved, updateWasSaved] = useState(false);

  if (!lastModal) return;
  if (lastModal.type !== MODALS.CREATE_BOARD) return;
  if (lastModal.workspaceId === undefined) return;

  const workspaceId: string = lastModal.workspaceId;

  const { register, handleSubmit } = useForm<formFields>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<formFields> = (data) => {
    AddBoard(
      { taskBoardId: uuidv4(), name: data.name, tasks: [] },
      workspaceId,
    );
    updateWasSaved(true);
    ModalClosed();
  };

  const onError: SubmitErrorHandler<formFields> = (errors) => {
    ModalOpened({
      type: MODALS.USER_NOTIFICATION,
      message: errors.name?.message ?? "incorrect name",
    });
  };

  const handleModalClosed = () => {
    if (bWasSaved) {
      ModalClosed();
    } else {
      ModalOpened({
        type: MODALS.USER_CONFIRMATION,
        message: "Are you sure to quit without saving",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="modal-default">
      <input
        type="text"
        placeholder="Board name (can't be empty)"
        className="default-input"
        {...register("name")}
      />
      <button type="submit" className="save-button">
        <p className="white">Save board</p>
      </button>
      <button onClick={handleModalClosed} className="save-button">
        <p className="white">Close</p>
      </button>
    </form>
  );
}

export default AddBoardForm;
