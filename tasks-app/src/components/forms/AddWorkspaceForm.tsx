import type { WorkspaceType } from "../../types/DefaultType";
import { generateId } from "../utilities/IdGenerator";
import { useState } from "react";

import "./DefaultFormStyle.css"

interface Props {
    onWorkspaceAdded: (workspace: WorkspaceType) => void;
    onModalClosed: () => void;
}

function AddWorkspaceForm({onWorkspaceAdded, onModalClosed}: Props) {
    const [userWorkspaceName, updateUserWorkspaceName] = useState("");
    const [bDisableSaveButton, updateDisableSaveButton] = useState(true);

    const handleWorkspaceAdded = () => {
        onWorkspaceAdded({workspaceId: generateId("Workspace"), name: userWorkspaceName, boards: []});

        updateUserWorkspaceName("");
        updateDisableSaveButton(true);
    }

    const handleUpdatingUserWorkspaceName = (input: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        if (input.target.value !== "") {
            updateDisableSaveButton(false);
        }
        else {
            updateDisableSaveButton(true);
        }

        updateUserWorkspaceName(input.target.value)
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
            <button onClick={onModalClosed} 
                className="save-button"
            ><p className="white">Close</p></button>          
        </p>
    );
}

export default AddWorkspaceForm;