import { ModalStoreSelectors } from "../../utilities/modals/ModalStoreSelectors";
import { MODALS } from "../../utilities/modals/ModalTypes";

import "../DefaultFormStyle.css"

function UserNotificationForm () {
    const {lastModal, ModalClosed} = ModalStoreSelectors();

    if (!lastModal)
    return;
    if (lastModal.type !== MODALS.USER_NOTIFICATION)
    return;
    if (!lastModal.message)
    return;

    const message: string = lastModal.message;

    return (
        <p className="modal-default">
            <span className="white-background">{message}</span>
            <button onClick={() => ModalClosed()} className="save-button"><span className="white">Close</span></button>
        </p>
    );
}

export default UserNotificationForm;