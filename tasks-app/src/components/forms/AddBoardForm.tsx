import { useState } from "react";
import type { BoardType } from "../../types/DefaultType";
import { generateId } from "../utilities/IdGenerator";

import "./DefaultFormStyle.css"

interface Props {
    onBoardAdded: (board: BoardType) => void;
    onModalClosed: () => void;
}

function AddBoardForm({onBoardAdded, onModalClosed}: Props) {
    const [userBoardName, updateUserBoardName] = useState("");
    const [bDisableSaveButton, updateDisableSaveButton] = useState(true);

    const handleUpdatingUserBoardName = (input: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        if (input.target.value !== "") {
            updateDisableSaveButton(false);
        }
        else {
            updateDisableSaveButton(true);
        }

        updateUserBoardName(input.target.value)
    }

    const handleBoardAdding = () => {
        onBoardAdded({taskBoardId: generateId("Board"), name: userBoardName, tasks: []});

        updateUserBoardName("");
        updateDisableSaveButton(true);
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
            <button onClick={onModalClosed}
                className="save-button"
            ><p className="white">Close</p></button>
        </p>
    );
}

export default AddBoardForm;