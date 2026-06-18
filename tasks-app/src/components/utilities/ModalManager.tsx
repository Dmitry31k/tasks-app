import type { ModalType } from "../../types/DefaultType";
import type { AppData } from "../../types/DefaultType";
import type { ModalInfo } from "../../types/DefaultType";

import { MODALS } from "../../types/DefaultType";
import { useState } from "react";

interface Props {
    activeModal: ModalInfo | null;
    onDataSaved: (onSaved: AppData) => void;
    onModalClosed: () => void;
    onNewModalOpened: (modal: ModalType, message?: string) => void;
    onUserConfirmation: (bIsAgree: boolean) => void;
}

function ModalManager(props: Props) {
    if (!props.activeModal?.type) return null;
    const Сomp = MODALS[props.activeModal.type];
    const [errorMessage, updateErrorMessage] = useState("");
    const [confirmationMessage, updateConfirmationMessage] = useState("");
    
    const handleUserIncorrectInput = (message: string) => {
        updateErrorMessage(message);
        props.onNewModalOpened("userNotification", message);
    }

    const handleUserConfirm = (bIsAgree: boolean, message: string) => {
        props.onUserConfirmation(bIsAgree);
        updateConfirmationMessage(message);
    }

    const handleUserConfirmationMessage = (message: string) => {
        updateConfirmationMessage(message);
        props.onNewModalOpened("userConfirmation", message);
    }

    return (
        <>
            <Сomp onWorkspaceAdded={workspace => props.onDataSaved({type: "workspace", data: workspace})}
                onBoardAdded={board => props.onDataSaved({type: "board", data: board})}
                onTaskAdded={task => props.onDataSaved({type: "task", data: task})}
                onModalClosed={props.onModalClosed}
                onUserNotification={handleUserIncorrectInput}
                notificationMessage={errorMessage}
                onUserConfirm={handleUserConfirm}
                onUserConfirmation={handleUserConfirmationMessage}
                userConfirmationMessage={props.activeModal.message ?? confirmationMessage}
            />
        </>
    );
}

export default ModalManager;