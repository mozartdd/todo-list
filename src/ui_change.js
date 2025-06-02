import { 
    projectLibrary, 
    getActiveProjectName,
    returnCurrentProject,
    getProjectById
} from "./functionality.js";
import { attachEventListeners } from "./controls.js";

const projectList = document.querySelector("nav ul");
const currentProjectDiv = document.querySelector("[data-current-project]");
const taskGrid = document.querySelector(".task-grid");

export function updateDisplay() {
    renderProjects();
    renderTasks();
    attachEventListeners();
}

function renderProjects() {
    projectList.innerHTML = "";
    
    projectLibrary.forEach(project => {
        const li = document.createElement("li");
        li.setAttribute("data-class", project.id);
        
        const projectDiv = document.createElement("div");
        projectDiv.className = "each-project-div";
        projectDiv.textContent = project.projectName;
        
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-project";
        deleteButton.textContent = "×";
        
        li.appendChild(projectDiv);
        li.appendChild(deleteButton);
        projectList.appendChild(li);
    });
}

function renderTasks() {
    const activeProject = returnCurrentProject();
    currentProjectDiv.textContent = activeProject ? activeProject.projectName : "No Project";
    taskGrid.innerHTML = "";
    
    if (!activeProject) return;
    
    activeProject.tasks.forEach(task => {
        const taskCard = document.createElement("div");
        taskCard.className = `task-card ${task.completed ? "completed" : ""}`;
        taskCard.dataset.taskId = task.id;
        
        taskCard.innerHTML = `
            <div class="task-header">
                <input type="checkbox" class="task-checkbox" 
                    data-task-id="${task.id}" 
                    ${task.completed ? "checked" : ""}>
                <h3 class="task-title">${task.name}</h3>
            </div>
            <div class="task-due">Due: ${task.due}</div>
            <div class="task-priority ${task.level}">${task.level}</div>
            <p class="task-desc">${task.desc}</p>
            <button class="delete-task" data-task-id="${task.id}">Delete</button>
        `;
        
        taskGrid.appendChild(taskCard);
    });
    
    if (activeProject.tasks.length === 0) {
        taskGrid.innerHTML = `<div class="no-tasks">No tasks in this project yet!</div>`;
    }
}