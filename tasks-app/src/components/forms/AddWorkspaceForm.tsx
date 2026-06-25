import { generateId } from "../utilities/IdGenerator";
import { useState } from "react";

import { ModalStoreSelectors } from "../utilities/modals/ModalStoreSelectors";
import { WorkspaceStoreSelectors } from "../WorkspaceStoreSelectors";

import { MODALS } from "../utilities/modals/ModalTypes";
import { z } from "zod";

import "./DefaultFormStyle.css";

function AddWorkspaceForm() {
  const [userWorkspaceName, updateUserWorkspaceName] = useState("");
  const [bDisableSaveButton, updateDisableSaveButton] = useState(true);
  const [bWasSaved, updateWasSaved] = useState(false);

  const { lastModal, ModalOpened, ModalClosed } = ModalStoreSelectors();
  const { AddWorkspace } = WorkspaceStoreSelectors();

  if (!lastModal) return;
  if (lastModal.type !== MODALS.CREATE_WORKSPACE) return;

  const handleWorkspaceAdded = () => {
    const workspaceNameSchema = z
      .string()
      .regex(/^[a-z]+$/, "Only lowercase letters are allowed")
      .min(5, "Minimum length is 5 characters")
      .max(30, "Maximum length is 30 characters");

    const result = workspaceNameSchema.safeParse(userWorkspaceName);

    if (!result.success) {
      ModalOpened({
        type: MODALS.USER_NOTIFICATION,
        message: result.error.issues[0].message,
      });
      return;
    }

    AddWorkspace({
      workspaceId: generateId("Workspace"),
      name: result.data,
      boards: [],
    });
    ModalClosed();
    updateWasSaved(true);
    updateUserWorkspaceName("");
  };

  const handleUpdatingUserWorkspaceName = (
    input: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    if (input.target.value === "") {
      updateDisableSaveButton(true);
    } else {
      updateDisableSaveButton(false);
    }

    updateUserWorkspaceName(input.target.value);
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
    <p className="modal-default">
      <input
        type="text"
        placeholder="New workspace name (can't be empty)"
        onChange={handleUpdatingUserWorkspaceName}
        value={userWorkspaceName}
        className="default-input"
      />
      <button
        onClick={handleWorkspaceAdded}
        disabled={bDisableSaveButton}
        className="save-button"
      >
        <p className="white">Save workspace</p>
      </button>
      <button onClick={handleModalClosed} className="save-button">
        <p className="white">Close</p>
      </button>
    </p>
  );
}

export default AddWorkspaceForm;
