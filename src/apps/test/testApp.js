import AppBase
    from "../base/appBase.js";

class TestApp extends AppBase {

    constructor() {

        super({
            id: "test",
            name: "Test App",
            icon: "🧪"
        });
    }

    render() {

        return `
            <div style="
                padding: 20px;
                font-family: Arial, sans-serif;
            ">

                <h2>
                    🧪 RagebaitOS Test App
                </h2>

                <p>
                    AppBase is working!
                </p>

                <p>
                    This application is using
                    the existing RagebaitOS
                    WindowManager.
                </p>

            </div>
        `;
    }
}

export default TestApp;