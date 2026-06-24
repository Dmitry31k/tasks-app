import { useState } from "react";
import { generateId } from "../utilities/IdGenerator";

import { ModalStoreSelectors } from "../utilities/modals/ModalStoreSelectors";
import { WorkspaceStoreSelectors } from "../WorkspaceStoreSelectors";

import { MODALS } from "../utilities/modals/ModalTypes";

import "./DefaultFormStyle.css"

function AddBoardForm() {
    const [userBoardName, updateUserBoardName] = useState("");
    const [bDisableSaveButton, updateDisableSaveButton] = useState(true);

    const {lastModal, ModalClosed} = ModalStoreSelectors();
    const {AddBoard} = WorkspaceStoreSelectors();

    const handleUpdatingUserBoardName = (input: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        if (input.target.value !== "") {
            updateDisableSaveButton(false);
        }
        else {
            updateDisableSaveButton(true);
        }

        updateUserBoardName(input.target.value)
    }

    if (!lastModal)
    return;
    if (lastModal.type !== MODALS.CREATE_BOARD)
    return;
    if (lastModal.workspaceId === undefined)
    return;

    const workspaceId: string = lastModal.workspaceId;

    const handleBoardAdding = () => {
        AddBoard({taskBoardId: generateId("Board"), name: userBoardName, tasks: []}, workspaceId);
        updateUserBoardName("");
        updateDisableSaveButton(true);
        ModalClosed();
    }

    return (
        <p className="modal-default">
            <input type="text" 
                placeholder="Board name (can't be empty)"
                onChange={handleUpdatingUserBoardName}
                value={userBoardName}
                className="default-input"
            />
            <button onClick={handleBoardAdding}
                disabled={bDisableSaveButton}
                className="save-button"
            ><p className="white">Save board</p></button>
            <button onClick={() => ModalClosed()}
                className="save-button"
            ><p className="white">Close</p></button>
        </p>
    );
}

export default AddBoardForm;