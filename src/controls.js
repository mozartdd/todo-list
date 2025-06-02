import { 
    addProject, 
    projectLibrary, 
    removeProject, 
    setProjectAsActive
} from "./functionality";
import { updateDisplay } from "./ui_change";

const openModule = document.querySelector("[data-open-module]");
const closeModule = document.querySelector("[data-close-module]");
const addProjectButton = document.querySelector("[data-add-project]"); // Button that add's project inside module.
const dialogWindow = document.querySelector("dialog");
const projectNameInput = document.querySelector("[data-project-name]");

const date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

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
    // Removes project from library.
    const removeProjectButton = document.querySelectorAll(".delete-project");
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
    // Toggles active project.
    const projectDiv = document.querySelectorAll(".each-project-div");
    projectDiv.forEach((button) => {
        button.addEventListener("click", () => {
            const list = button.closest("li");
            const id = list.getAttribute("data-class");
            const divName = button.closest("div");
            const name = divName.textContent;
            setProjectAsActive(id, name);
            updateDisplay();
        })
    })
    projectLibrary[0].createTask("Clean Garage", `${day + 2}-${month}-${year}`, "Low", "Tidy up in all rooms");
    projectLibrary[1].createTask("Clean Behind garage", `${day + 2}-${month}-${year}`, "Low", "Tidy up in all rooms");
}

export { attachEventListeners };