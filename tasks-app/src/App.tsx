import Workspace from "./components/Workspace";
import ModalManager from "./components/utilities/modals/ModalManager";

import { useEffect } from "react";

import { WorkspaceStoreSelectors } from "./components/WorkspaceStoreSelectors";
import { ModalStoreSelectors } from "./components/utilities/modals/ModalStoreSelectors";

import { MODALS } from "./components/utilities/modals/ModalTypes";

import "./NormalazingStyles.css";
import "./App.css";

function App() {
  const {
    workspaces,
    GetActiveWorkspaceIndex,
    SwitchToNextWorkspace,
    SwitchToPrevWorkspace,
  } = WorkspaceStoreSelectors();
  const { info, ModalOpened } = ModalStoreSelectors();

  useEffect(() => {
    if (info.length > 0) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [info]);

  return (
    <>
      <header className="default-site-header">
        <h1 className="grey">Task manager</h1>
      </header>
      <button onClick={SwitchToNextWorkspace} className="default-button">
        <p className="white">Switch to next workspace</p>
      </button>
      <button onClick={SwitchToPrevWorkspace} className="default-button">
        <p className="white">Switch to previous workspace</p>
      </button>
      <button
        className="default-button"
        onClick={() => {
          ModalOpened({ type: MODALS.CREATE_WORKSPACE });
        }}
      >
        <p className="white">Add new workspace</p>
      </button>
      {workspaces.length === 0 && (
        <span>You don't have any active workspaces</span>
      )}
      <Workspace workspace={workspaces[GetActiveWorkspaceIndex()]}></Workspace>
      <ModalManager />
    </>
  );
}

export default App;
