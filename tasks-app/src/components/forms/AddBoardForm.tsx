import { useState } from "react";
import type { BoardType } from "../../types/DefaultType";
import { generateId } from "../utilities/IdGenerator";

import "./DefaultFormStyle.css"

interface Props {
    onBoardAdded: (board: BoardType) => void;
}

function AddBoardForm({onBoardAdded}: Props) {
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
        <>
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
        </>
    );
}

export default AddBoardForm;