let totalTasks: number = 9;
let totalBoards: number = 4;
let totalWorkspaces: number = 2;

type DataType = "Workspace" | "Board" | "Task"

export const generateId = (dataType: DataType) => {
    let Id: string;

    switch(dataType) {
        case "Workspace":
            Id = `w${++totalWorkspaces}`;
        break;
        case "Board":
            Id = `b${++totalBoards}`;
        break;
        case "Task":
            Id = `t${++totalTasks}`;
        break;
    }

    return Id;
}