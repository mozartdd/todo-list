import "./styles.css";
import { updateDisplay } from "./ui_change.js";
import { attachEventListeners } from "./controls.js";
import { addProject } from "./functionality.js";

// Initialize with a default project
if (!localStorage.getItem("todoInitialized")) {
    addProject("Default Project");
    localStorage.setItem("todoInitialized", "true");
}

// Initial display
updateDisplay();
attachEventListeners();