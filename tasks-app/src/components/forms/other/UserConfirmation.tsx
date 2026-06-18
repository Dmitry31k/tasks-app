import "../DefaultFormStyle.css"

interface Props {
    onUserConfirm: (bIsAgree: boolean, confirmationMessage: string) => void;
    userConfirmationMessage: string;
}

function UserConfirmationForm ({onUserConfirm, userConfirmationMessage}: Props) {
    return (
        <p className="modal-default">
            <span className="white-background">{userConfirmationMessage}</span>
            <button onClick={() =>onUserConfirm(true, userConfirmationMessage)} className="save-button"><span className="white">Yes</span></button>
            <button onClick={() => onUserConfirm(false, userConfirmationMessage)} className="save-button"><span className="white">No</span></button>
        </p>
    );
}

export default UserConfirmationForm;