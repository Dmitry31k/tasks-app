import type { ModalType } from "../../types/DefaultType";
import type { AppData } from "../../types/DefaultType";

import { MODALS } from "../../types/DefaultType";



interface Props {
    activeModal: ModalType;
    onDataSaved: (onSaved: AppData) => void;
    onModalClosed: () => void;
}

function ModalManager(props: Props) {
    if (!props.activeModal) return null;
    const Сomp = MODALS[props.activeModal];

    return (
        <>
            <Сomp onWorkspaceAdded={workspace => props.onDataSaved({type: "workspace", data: workspace})}
                onBoardAdded={board => props.onDataSaved({type: "board", data: board})}
                onTaskAdded={task => props.onDataSaved({type: "task", data: task})}
                onModalClosed={props.onModalClosed}
            />
        </>
    );
}

export default ModalManager;