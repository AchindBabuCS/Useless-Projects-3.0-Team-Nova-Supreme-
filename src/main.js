import WeatherApp from "./apps/weather/weather.js";
import NotepadApp from "./apps/notepad/notepad.js";
import GalleryApp from "./apps/gallery/gallery.js";
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

appManager.registerApp(
    new WeatherApp()
);

appManager.registerApp(
    new NotepadApp()
);

appManager.registerApp(
    new GalleryApp()
);

console.log(
    "🚀 RagebaitOS initialized."
);

