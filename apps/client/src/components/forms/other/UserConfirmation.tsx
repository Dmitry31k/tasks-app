import { ModalStoreSelectors } from "../../utilities/modals/ModalStoreSelectors";
import { MODALS, STATUSES } from "../../utilities/modals/ModalTypes";
import { WorkspaceStoreSelectors } from "../../WorkspaceStoreSelectors";

import "../DefaultFormStyle.css";

function UserConfirmationForm() {
  const { lastModal, ModalClosed } = ModalStoreSelectors();

  if (!lastModal) return;
  if (lastModal.type !== MODALS.USER_CONFIRMATION) return;
  if (!lastModal.message) return;

  const { DeleteWorkspace, DeleteBoard, DeleteTask } =
    WorkspaceStoreSelectors();
  const StatusToFunction: Record<STATUSES, (...args: any) => void> = {
    [STATUSES.DELETE_WORKSPACE]: DeleteWorkspace,
    [STATUSES.DELETE_BOARD]: DeleteBoard,
    [STATUSES.DELETE_TASK]: DeleteTask,
  };

  const message = lastModal.message;

  const handleUserAccepted = () => {
    if (lastModal.modalStatus) {
      StatusToFunction[lastModal.modalStatus](
        lastModal.workspaceId,
        lastModal.boardId,
        lastModal.taskId,
      );
    }
    if (message.includes("without saving")) {
      ModalClosed();
    }
    ModalClosed();
  };

  return (
    <p className="modal-default">
      <span className="white-background">{message}</span>
      <button onClick={handleUserAccepted} className="save-button">
        <span className="white">Yes</span>
      </button>
      <button onClick={() => ModalClosed()} className="save-button">
        <span className="white">No</span>
      </button>
    </p>
  );
}

export default UserConfirmationForm;
