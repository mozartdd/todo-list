import { 
    projectLibrary, 
    addProject, 
    getActiveProjectName,
    returnCurrentProject
} from "./functionality";
import { attachEventListeners } from "./controls";

const ul = document.querySelector("ul");
const todo = document.createElement("div");
const taskDiv = document.querySelector("[data-todo-task]");
const currentProjectName = document.querySelector("[data-current-project]");

// Adds default project.
window.onload = () => {
    const currentProject = returnCurrentProject();
    addProject("Clean Garage");
    addProject("Make web-site");
    updateDisplay();
}

function updateDisplay() {
    const currentProject = returnCurrentProject();
    if (!currentProject) return;
    todo.innerHTML = "";
    ul.innerHTML = ""; // Clear display.

    // Iterates over each project.
    projectLibrary.forEach((project) => {
        const list = document.createElement("li");
        list.setAttribute("data-class", project.id);

        currentProjectName.innerHTML = getActiveProjectName();
        list.innerHTML = `<div class="each-project-div">${project.projectName}</div><span class="delete-project">x</span>`
        ul.appendChild(list);
        currentProject.tasks.forEach((task) => {
            todo.innerHTML = `
                Task name: ${task.name}<br>
                Due date: ${task.due}<br>
                Description: ${task.desc}
                `;
            taskDiv.appendChild(todo);
        })
    })
    attachEventListeners();
}

export { updateDisplay };