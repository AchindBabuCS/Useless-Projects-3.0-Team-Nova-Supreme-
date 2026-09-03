import eventBus from "../core/eventBus.js";
import rageState from "./rageState.js";
import sabotageManager
    from "./sabotageManager.js";
import appRedirect
    from "./sabotages/appRedirect.js";


class RageEngine {

    constructor() {

        this.enabled = true;

        this.sabotageChance = 1.0;

        this.registerSabotages();

        this.initialize();
    }

    // ========================================
    // REGISTER SABOTAGES
    // ========================================

    registerSabotages() {

        sabotageManager.register(
            appRedirect
        );
    }


    // ========================================
    // INITIALIZE
    // ========================================

    initialize() {

        /*
         * Application opening.
         */
        eventBus.on(
            "APP_OPEN_REQUEST",
            (data) => {

                this.handleAppOpen(
                    data
                );
            }
        );


        /*
         * Generic UI click.
         */
        eventBus.on(
            "UI_CLICK",
            (data) => {

                this.handleUIClick(
                    data
                );
            }
        );


        /*
         * Keyboard input.
         */
        eventBus.on(
            "KEYBOARD_INPUT",
            (data) => {

                this.handleKeyboardInput(
                    data
                );
            }
        );


        /*
         * Window maximize request.
         */
        eventBus.on(
            "WINDOW_MAXIMIZE_REQUEST",
            (data) => {

                this.handleMaximize(
                    data
                );
            }
        );
    }


    // ========================================
    // SHOULD SABOTAGE?
    // ========================================

    shouldSabotage() {

        if (!this.enabled) {

            return false;
        }


        return (
            Math.random() <
            this.sabotageChance
        );
    }


    // ========================================
    // APP OPEN
    // ========================================

    handleAppOpen(data) {

        const appId =
            data.appId;


        /*
         * No sabotage.
         */
        if (
            !this.shouldSabotage()
        ) {

            eventBus.emit(
                "APP_OPEN_APPROVED",
                {
                    appId: appId
                }
            );

            return;
        }


        /*
         * Rage happened.
         */
        rageState.addRage(5);


        console.log(
            `😈 Rage triggered while opening: ${appId}`
        );


        /*
         * Ask App Redirect sabotage
         * to handle the event.
         */
        const triggered =
            sabotageManager.trigger(
                "app-redirect",
                {
                    appId: appId
                }
            );


        /*
         * If sabotage handled the event,
         * don't open the original app.
         */
        if (triggered) {

            return;
        }


        /*
         * Fallback.
         */
        eventBus.emit(
            "APP_OPEN_APPROVED",
            {
                appId: appId
            }
        );
    }


    // ========================================
    // UI CLICK
    // ========================================

    handleUIClick(data) {

        if (
            !this.shouldSabotage()
        ) {

            return;
        }


        rageState.addRage(1);


        console.log(
            "😈 Rage triggered on UI click."
        );


        /*
         * Click drift.
         */
        sabotageManager.trigger(
            "click-drift",
            data
        );
    }


    // ========================================
    // KEYBOARD INPUT
    // ========================================

    handleKeyboardInput(data) {

        if (
            !this.shouldSabotage()
        ) {

            return;
        }


        rageState.addRage(1);


        sabotageManager.trigger(
            "keyboard-corruption",
            data
        );
    }


    // ========================================
    // MAXIMIZE
    // ========================================

    handleMaximize(data) {

        if (
            !this.shouldSabotage()
        ) {

            eventBus.emit(
                "WINDOW_MAXIMIZE_APPROVED",
                data
            );

            return;
        }


        rageState.addRage(3);


        sabotageManager.trigger(
            "expand-minimize",
            data
        );
    }
}


// ========================================
// CREATE ENGINE
// ========================================

const rageEngine =
    new RageEngine();


export default rageEngine;

