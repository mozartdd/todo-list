import { addProject, projectLibrary } from "./functionality";
import { updateDisplay } from "./ui_change";

const openModule = document.querySelector("[data-open-module]");
const closeModule = document.querySelector("[data-close-module]");
const addProjectButton = document.querySelector("[data-add-project]"); // Button that add's project inside module.
const dialogWindow = document.querySelector("dialog");
const projectNameInput = document.querySelector("[data-project-name]");

openModule.addEventListener("click", () => {
    projectNameInput.value = `Project ${projectLibrary.length + 1}`;
    dialogWindow.showModal();
})
closeModule.addEventListener("click", () => {
    dialogWindow.close();
})
addProjectButton.addEventListener("click", () => {
    addProject(projectNameInput.value);
    updateDisplay();
    dialogWindow.close();
})