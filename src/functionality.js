// Array that holds all projects.
const projectLibrary = [];

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
    projectLibrary.push(project);
    return project;
}

export { projectLibrary, addProject }