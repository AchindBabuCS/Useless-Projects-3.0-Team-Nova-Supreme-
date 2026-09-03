/**
 * Base class for all RagebaitOS applications.
 *
 * Every application extends this class.
 */

class AppBase {

    constructor(config = {}) {

        this.id =
            config.id || "";

        this.name =
            config.name || "Unnamed App";

        this.icon =
            config.icon || "📦";

        this.width =
            config.width || 500;

        this.height =
            config.height || 400;

        this.windowId =
            null;
    }


    // ========================================
    // INITIALIZE
    // ========================================

    initialize() {

        console.log(
            `📦 ${this.name} initialized.`
        );
    }


    // ========================================
    // OPEN
    // ========================================

    open(windowId) {

        this.windowId =
            windowId;

        console.log(
            `🚀 ${this.name} opened.`
        );
    }


    // ========================================
    // CLOSE
    // ========================================

    close() {

        console.log(
            `❌ ${this.name} closed.`
        );

        this.windowId =
            null;
    }


    // ========================================
    // RENDER
    // ========================================

    render() {

        console.warn(
            `${this.name} has no render() implementation.`
        );
    }
}


export default AppBase;