import { addProject, projectLibrary } from "./functionality";

const openModule = document.querySelector("[data-open-module]");
const moduleClose = document.querySelector("[data-close-module]");
const addProjectButton = document.querySelector("[data-add-project]"); // Button that add's project inside module.
const dialog = document.querySelector("dialog");
const projectName = document.querySelector("[data-project-name]");

openModule.addEventListener("click", () => {
    projectName.value = "";
    dialog.showModal();
})
moduleClose.addEventListener("click", () => {
    dialog.close();
})
addProjectButton.addEventListener("click", () => {
    addProject(projectName.value);
    console.log(projectLibrary);
    dialog.close();
})