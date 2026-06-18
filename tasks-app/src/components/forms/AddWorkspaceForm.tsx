import type { WorkspaceType } from "../../types/DefaultType";
import { generateId } from "../utilities/IdGenerator";
import { useState } from "react";

import "./DefaultFormStyle.css"

interface Props {
    onWorkspaceAdded: (workspace: WorkspaceType) => void;
    onModalClosed: () => void;
    onUserNotification: (message: string) => void;
    onUserConfirmation: (message: string) => void;
}

function AddWorkspaceForm({onWorkspaceAdded, onModalClosed, onUserNotification, onUserConfirmation}: Props) {
    const [userWorkspaceName, updateUserWorkspaceName] = useState("");
    const [bDisableSaveButton, updateDisableSaveButton] = useState(true);
    const [bWasSaved, updateWasSaved] = useState(false);

    const handleWorkspaceAdded = () => {
        if (!/^[a-z]+$/.test(userWorkspaceName)) {
            onUserNotification("Only lowercase letters are allowed");
            return;
        }
        if (userWorkspaceName.length < 5) {
            onUserNotification("Minimum length is 5 characters");
            return;
        }
        if (userWorkspaceName.length > 30) {
            onUserNotification("Maximum length is 30 characters");
            return;
        }
        
        onWorkspaceAdded({workspaceId: generateId("Workspace"), name: userWorkspaceName, boards: []});
        updateWasSaved(true);
        updateUserWorkspaceName("");
    }

    const handleUpdatingUserWorkspaceName = (input: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        if (input.target.value === "") {
            updateDisableSaveButton(true);
        }
        else {
            updateDisableSaveButton(false);
        }

        updateUserWorkspaceName(input.target.value);
    }

    const handleModalClosed = () => {
        if (bWasSaved) {
            onModalClosed()
        }
        else {
            onUserConfirmation("Are you sure to quit without saving");
        }
    }

    return (
        <p className="modal-default">
            <input type="text" 
                placeholder="New workspace name (can't be empty)" 
                onChange={handleUpdatingUserWorkspaceName} 
                value={userWorkspaceName}
                className="default-input"
            />
            <button onClick={handleWorkspaceAdded}
                disabled={bDisableSaveButton}
                className="save-button"
            ><p className="white">Save workspace</p></button>
            <button onClick={handleModalClosed} 
                className="save-button"
            ><p className="white">Close</p></button>          
        </p>
    );
}

export default AddWorkspaceForm;