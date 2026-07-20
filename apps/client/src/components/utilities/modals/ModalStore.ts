import { create } from "zustand";

import type { ModalInfo } from "./ModalTypes";

type ModalStore = {
    info: ModalInfo[];

    ModalClosed: (closedModals?: number ) => void;
    ModalOpened: (info: ModalInfo) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
    info: [],
    ModalClosed: (closedModals: number = 1) => {
        set((state) => ({
            info: state.info.slice(0, -closedModals)
        }))
    },
    ModalOpened: (info: ModalInfo) => {
        set((state) => ({
            info: [...state.info, info]
        }))
    },
}));