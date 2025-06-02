import { 
    addProject, 
    projectLibrary, 
    removeProject, 
    setProjectAsActive
} from "./functionality";
import { updateDisplay } from "./ui_change";

const openModule = document.querySelector("[data-open-module]");
const closeModule = document.querySelector("[data-close-module]");
const addProjectButton = document.querySelector("[data-add-project]");
const dialogWindow = document.querySelector("dialog");
const projectNameInput = document.querySelector("[data-project-name]");

const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;  // Months are 0-indexed, added +1
let year = date.getFullYear();

// Opens dialog window.
openModule.addEventListener("click", () => {
    projectNameInput.value = `Project ${projectLibrary.length + 1}`;
    dialogWindow.showModal();
});

// Closes dialog window.
closeModule.addEventListener("click", (event) => {
    event.preventDefault();
    dialogWindow.close();
});

// Adds project to navbar.
addProjectButton.addEventListener("click", (event) => {
    event.preventDefault();
    addProject(projectNameInput.value);
    updateDisplay();
    dialogWindow.close();
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
            const name = button.textContent;  // Simplified name extraction
            setProjectAsActive(id, name);
            updateDisplay();
        });
    });
}

export { attachEventListeners };