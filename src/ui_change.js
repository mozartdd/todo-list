import { projectLibrary, addProject } from "./functionality";


const ul = document.querySelector("ul");

window.onload = () => {
    addProject("FIRST PROJECT");
    updateDisplay();
}

function updateDisplay() {
    ul.innerHTML = ""; // Clear display.

    projectLibrary.forEach((project) => {
        const list = document.createElement("li");
        list.setAttribute("data-id", project.id)

        list.innerHTML = `${project.projectName}`
        ul.appendChild(list);
    })
}

export { updateDisplay };