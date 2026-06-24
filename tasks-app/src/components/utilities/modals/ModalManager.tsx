import { ModalStoreSelectors } from "./ModalStoreSelectors";
import { ModalsMap } from "./ModalTypes";

function ModalManager() {
    const {lastModal} = ModalStoreSelectors();

    const Comp = lastModal ? ModalsMap[lastModal.type!] : null;

    if (Comp) {
        return <Comp/>
    }
    else {
        return;
    }
}

export default ModalManager;