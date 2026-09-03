import "./css/style.css";


// Core systems
import eventBus from "./core/eventBus.js";
import appManager from "./core/appManager.js";
import windowManager from "./core/windowManager.js";
import "./core/inputManager.js";
import "./rage/sabotages/rageCursor.js";


// Rage systems
import rageEngine from "./rage/rageEngine.js";
import rageState from "./rage/rageState.js";


import "./desktop/taskbar.js";


// ========================================
// TEMPORARY TEST APPLICATION
// ========================================

appManager.registerApp({

    id: "test",

    name: "Test Application",

    render: () => {

        return `
            <h2>RagebaitOS Window System</h2>

            <p>
                If you can see this,
                the Window Manager works.
            </p>
        `;
    }
});

appManager.registerApp({

    id: "second",

    name: "Second Application",

    icon: "★",

    render: () => {

        return `
            <h2>
                Second Application
            </h2>

            <p>
                Dynamic taskbar test.
            </p>
        `;
    }
});

console.log(
    "🚀 RagebaitOS initialized."
);

