// Array that holds all projects.
const projectLibrary = [];
// Variable holds current selected project.
let activeProjectId = null;
let activeProjectName = null;

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
        const task = {
            id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            name: taskName,
            due: endDate,
            level: importanceLevel,
            desc: description,
            completed: false
        };
        this.tasks.push(task);
        return task;
    }

    // Delete task by ID
    deleteTask(taskId) {
        const index = this.tasks.findIndex(task => task.id === taskId);
        if (index !== -1) {
            this.tasks.splice(index, 1);
        }
    }

    // Toggle task completion status
    toggleTaskCompletion(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = !task.completed;
        }
    }
}

// Creates new Project and adds it to project library.
function addProject(projectName) {
    if (projectName === "") return null;
    
    const project = new Project(projectName);
    projectLibrary.push(project);
    
    if (!activeProjectId) {
        activeProjectId = project.id;
        activeProjectName = project.projectName;
    }
    
    return project;
}

// Removes project from project library array.
function removeProject(projectId) {
    const idx = projectLibrary.findIndex(p => p.id === projectId);
    if (idx === -1) return;

    // If we're deleting the active project
    if (projectLibrary[idx].id === activeProjectId) {
        projectLibrary.splice(idx, 1);
        if (projectLibrary.length > 0) {
            activeProjectId = projectLibrary[0].id;
            activeProjectName = projectLibrary[0].projectName;
        } else {
            activeProjectId = null;
            activeProjectName = null;
        }
    } else {
        projectLibrary.splice(idx, 1);
    }
}

// Sets project as active.
function setProjectAsActive(projectId, projectName) {
    activeProjectId = projectId;
    activeProjectName = projectName;
}

// Gets active project name.
function getActiveProjectName() {
    return activeProjectName;
}

// Gets active project id.
function getActiveProjectId() {
    return activeProjectId;
}

// Return current active project.
function returnCurrentProject() {
    return projectLibrary.find(p => p.id === activeProjectId);
}

// Get project by ID
function getProjectById(projectId) {
    return projectLibrary.find(p => p.id === projectId);
}

export {
    projectLibrary,
    addProject,
    removeProject,
    setProjectAsActive,
    getActiveProjectName,
    getActiveProjectId,
    returnCurrentProject,
    getProjectById
};