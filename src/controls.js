import { addProject, projectLibrary, removeProject } from "./functionality";
import { updateDisplay } from "./ui_change";

const openModule = document.querySelector("[data-open-module]");
const closeModule = document.querySelector("[data-close-module]");
const addProjectButton = document.querySelector("[data-add-project]"); // Button that add's project inside module.
const dialogWindow = document.querySelector("dialog");
const projectNameInput = document.querySelector("[data-project-name]");

// Opens dialog window.
openModule.addEventListener("click", () => {
    projectNameInput.value = `Project ${projectLibrary.length + 1}`;
    dialogWindow.showModal();
})
// Closes dialog window.
closeModule.addEventListener("click", (event) => {
    event.preventDefault();
    dialogWindow.close();
})
// Adds project to navbar.
addProjectButton.addEventListener("click", (event) => {
    event.preventDefault();
    addProject(projectNameInput.value);
    updateDisplay();
    dialogWindow.close();
})

function attachEventListeners() {
    const removeProjectButton = document.querySelectorAll(".delete-project");
    //Removes project from library.
    removeProjectButton.forEach((button) => {
        button.addEventListener("click", () => {
                const list = button.closest("li");
                const id = list.getAttribute("data-class");
                let confirmation = confirm("Do you want to delete this project?");
                if (confirmation) {
                    removeProject(id);
                    updateDisplay();
                }
            })
    })
}

export { attachEventListeners };