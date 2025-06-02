import { projectLibrary, addProject } from "./functionality";
import { attachEventListeners } from "./controls";


const ul = document.querySelector("ul");

// Adds default project.
window.onload = () => {
    addProject("First Project");

    updateDisplay();
}

function updateDisplay() {
    ul.innerHTML = ""; // Clear display.

    // Iterates over each project.
    projectLibrary.forEach((project) => {
        const list = document.createElement("li");
        list.setAttribute("data-class", project.id);

        list.innerHTML = `<div class="each-project-div">${project.projectName}<span class="delete-project">x</span></div>`
        ul.appendChild(list);
    })
    attachEventListeners();
}

export { updateDisplay };