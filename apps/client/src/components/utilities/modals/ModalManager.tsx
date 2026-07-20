import { ModalStoreSelectors } from "./ModalStoreSelectors";
import { ModalsMap } from "./ModalTypes";

function ModalManager() {
  const { lastModal } = ModalStoreSelectors();
  return lastModal ? ModalsMap[lastModal.type!] : null;
}

export default ModalManager;
