import { useState } from "react";
import type { BoardType } from "../../types/DefaultType";

interface Props {
    onBoardAdded: (board: BoardType) => void;
}

function AddBoardForm({onBoardAdded}: Props) {
    const [userBoardName, updateUserBoardName] = useState("");
    const [userBoardId, updateUserBoardId] = useState("");
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
        let finalId: string = userBoardId === "" ? "not provided" : userBoardId;

        onBoardAdded({taskBoardId: finalId, name: userBoardName, tasks: []});

        updateUserBoardName("");
        updateUserBoardId("");
        updateDisableSaveButton(true);
    }

    return (
        <>
            <input type="text" 
                placeholder="Board name (can't be empty)"
                onChange={handleUpdatingUserBoardName}
                value={userBoardName}
            />
            <input type="text" 
                placeholder="Board id"
                onChange={(input) => updateUserBoardId(input.target.value)}
                value={userBoardId}
            />
            <button onClick={handleBoardAdding} disabled={bDisableSaveButton}>Save board</button>
        </>
    );
}

export default AddBoardForm;