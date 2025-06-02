import { 
    addProject, 
    projectLibrary, 
    removeProject, 
    setProjectAsActive,
    returnCurrentProject
} from "./functionality.js";
import { updateDisplay } from "./ui_change.js";

const openModule = document.querySelector("[data-open-module]");
const closeProjectDialog = document.querySelector("[data-close-project-dialog]");
const addProjectButton = document.querySelector("[data-add-project]");
const projectDialog = document.getElementById("project-dialog");
const projectNameInput = document.querySelector("[data-project-name]");

// Task dialog elements
const taskDialog = document.getElementById("task-dialog");
const taskForm = document.getElementById("task-form");
const openTaskDialog = document.querySelector("[data-task-button]");
const closeTaskDialog = document.querySelector("[data-close-task-dialog]");

// Opens project dialog window.
openModule.addEventListener("click", () => {
    projectNameInput.value = `Project ${projectLibrary.length + 1}`;
    projectDialog.showModal();
});

// Closes project dialog window.
closeProjectDialog.addEventListener("click", (event) => {
    event.preventDefault();
    projectDialog.close();
});

// Adds project to navbar.
addProjectButton.addEventListener("click", (event) => {
    event.preventDefault();
    addProject(projectNameInput.value);
    updateDisplay();
    projectDialog.close();
});

// Opens task dialog
openTaskDialog.addEventListener("click", () => {
    taskDialog.showModal();
});

// Closes task dialog
closeTaskDialog.addEventListener("click", (event) => {
    event.preventDefault();
    taskDialog.close();
});

// Handle task form submission
taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const taskName = document.getElementById("task-name").value;
    const dueDate = document.getElementById("task-due").value;
    const priority = document.getElementById("task-priority").value;
    const description = document.getElementById("task-description").value;
    
    const activeProject = returnCurrentProject();
    if (activeProject) {
        activeProject.createTask(taskName, dueDate, priority, description);
        updateDisplay();
    }
    
    taskDialog.close();
    taskForm.reset();
});

function attachEventListeners() {
    // Removes project from library.
    const removeProjectButtons = document.querySelectorAll(".delete-project");
    removeProjectButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const list = button.closest("li");
            const id = list.getAttribute("data-class");
            const confirmation = confirm("Do you want to delete this project?");
            if (confirmation) {
                removeProject(id);
                updateDisplay();
            }
        });
    });

    // Toggles active project.
    const projectDivs = document.querySelectorAll(".each-project-div");
    projectDivs.forEach((button) => {
        button.addEventListener("click", () => {
            const list = button.closest("li");
            const id = list.getAttribute("data-class");
            const name = button.textContent;
            setProjectAsActive(id, name);
            updateDisplay();
        });
    });

    // Task completion toggle
    const taskCheckboxes = document.querySelectorAll(".task-checkbox");
    taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function() {
            const taskId = this.dataset.taskId;
            const activeProject = returnCurrentProject();
            if (activeProject) {
                activeProject.toggleTaskCompletion(taskId);
                updateDisplay();
            }
        });
    });

    // Task deletion
    const deleteTaskButtons = document.querySelectorAll(".delete-task");
    deleteTaskButtons.forEach(button => {
        button.addEventListener("click", function() {
            const taskId = this.dataset.taskId;
            const activeProject = returnCurrentProject();
            if (activeProject && confirm("Delete this task?")) {
                activeProject.deleteTask(taskId);
                updateDisplay();
            }
        });
    });
}

export { attachEventListeners };