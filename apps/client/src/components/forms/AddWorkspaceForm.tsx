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

function AddWorkspaceForm() {
  const [bWasSaved, updateWasSaved] = useState(false);
  const { lastModal, ModalOpened, ModalClosed } = ModalStoreSelectors();
  const { AddWorkspace } = WorkspaceStoreSelectors();

  if (!lastModal) return null;
  if (lastModal.type !== MODALS.CREATE_WORKSPACE) return null;

  const { register, handleSubmit } = useForm<formFields>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<formFields> = (data) => {
    AddWorkspace({
      workspaceId: uuidv4(),
      name: data.name,
      boards: [],
    });
    updateWasSaved(true);
    ModalClosed();
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
        placeholder="New workspace name (can't be empty)"
        className="default-input"
        {...register("name")}
      />
      <button className="save-button" type="submit">
        <p className="white">Save workspace</p>
      </button>
      <button className="save-button" type="button" onClick={handleModalClosed}>
        <p className="white">Close</p>
      </button>
    </form>
  );
}

export default AddWorkspaceForm;
