// Array that holds all projects.
const projectLibrary = [];
// Variable holds current selected project.
let activeProjectId = "Project-1";
let activeProjectName = "Clean Garage";

const projectId = getActiveProjectId();

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
    if (!activeProjectId) {
        activeProjectId = project.id;
        activeProjectName = project.projectName;
    }   
    return project;
}

// Removes project form project library array.
function removeProject(projectId) {
  const idx = projectLibrary.findIndex(p => p.id === projectId);
  if (idx === -1) return;

  // If we’re deleting the active project, immediately choose a new one:
  if (projectLibrary[idx].id === activeProjectId) {
    projectLibrary.splice(idx, 1);

    if (projectLibrary.length > 0) {
      // pick the first remaining project
      activeProjectId = projectLibrary[0].id;
      activeProjectName = projectLibrary[0].projectName;
    } else {
      activeProjectId = null;
      activeProjectName = "";
    }
  } else {
    // not deleting active: just remove it
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
    const activeProject = projectLibrary.find(p => p.id === activeProjectId);
    return activeProject;
}

export {
        projectLibrary,
        addProject,
        removeProject, 
        setProjectAsActive, 
        getActiveProjectName,
        getActiveProjectId,
        returnCurrentProject
    }