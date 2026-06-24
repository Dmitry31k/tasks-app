import { useModalStore } from "./ModalStore";

export function ModalStoreSelectors() {
    const info = useModalStore((store) => store.info);

    const ModalClosed = useModalStore((store) => store.ModalClosed);
    const ModalOpened = useModalStore((store) => store.ModalOpened);

    const UserAccepted = useModalStore((store) => store.UserAccepted);
    const UserDismissed = useModalStore((store) => store.UserDismissed);

    const lastModal = useModalStore((state) => state.info.at(-1));

    return {info, ModalClosed, ModalOpened, UserAccepted, UserDismissed, lastModal};
}

