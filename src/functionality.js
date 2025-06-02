// Array that holds all projects.
const projectLibrary = [];
// Variable holds current selected project.
let activeProjectId = null;

// Class that creates project.
export default class Project {
    static id = 0;

    constructor(projectName) {
        this.id = `Project-${++Project.id}`;
        this.projectName = projectName;
        this.tasks = [];
    }

    // Adds tasks to project.
    createTask(taskName, endDate, importanceLevel, description) {
        const task = 
            {
                name: taskName,
                due: endDate,
                level: importanceLevel,
                desc: description
            }
        this.tasks.push(task);
    }
}

// Creates new Project and adds it to project library.
function addProject(projectName) {
    const project = new Project(projectName);
    if (projectName === "") {
        return;
    }
    projectLibrary.push(project);
    return project;
}

// Removes project form project library array.
function removeProject(projectId) {
    const index = projectLibrary.findIndex(project => project.id === projectId);
    if (index !== -1) projectLibrary.splice(index, 1);
}

// Sets project as active.
function setProjectAsActive(projectId) {
    activeProjectId = projectId;
}
// Gets active project.
function getActiveProject() {
    return activeProjectId;
}
export { projectLibrary, addProject, removeProject }