import "../DefaultFormStyle.css"

interface Props {
    notificationMessage: string;
    onModalClosed: () => void
}

function UserNotificationForm ({notificationMessage: onErrorMessage, onModalClosed}: Props) {
    return (
        <p className="modal-default">
            <span className="white-background">{onErrorMessage}</span>
            <button onClick={onModalClosed} className="save-button"><span className="white">Close</span></button>
        </p>
    );
}

export default UserNotificationForm;