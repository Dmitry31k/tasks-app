import Workspace from "./components/Workspace";
import { workspacesList } from "./data/WorkspaceList";
import { useState } from "react";

import "./NormalazingStyles.css"
import "./App.css"

function App() {
    const [activeWorkspace, setActiveWorkspace] = useState(0);

    const handleSwitchNextWorkspace = () => {
        if (workspacesList.length === 0)
        return;

        if (activeWorkspace < workspacesList.length - 1) {
            setActiveWorkspace(activeWorkspace + 1);
        }
        else {
            setActiveWorkspace(0);
        }
    }
    const handleSwitchPrevWorkspace = () => {
        if (workspacesList.length === 0)
        return;

        if (activeWorkspace <= 0) {
            setActiveWorkspace(workspacesList.length - 1);
        }
        else {
            setActiveWorkspace(activeWorkspace - 1);
        }
    }

    return (
        <>
            <header className="default-site-header">
                <h1 className="grey">Task manager</h1>
            </header>
            <button onClick={handleSwitchNextWorkspace} className="default-button">
                <p className="white">Switch to next workspace</p>
            </button>
            <button onClick={handleSwitchPrevWorkspace} className="default-button">
                <p className="white">Switch to previous workspace</p>
            </button>
            <button className="default-button">
                <p className="white">Add new workspace</p>
            </button>
            {workspacesList.length === 0 && <span>You don't have any active task boards</span>}
            <Workspace workspace={workspacesList[activeWorkspace]}></Workspace>
        </>
    )
}

export default App