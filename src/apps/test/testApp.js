import AppBase
    from "../base/appBase.js";


class TestApp
    extends AppBase {

    constructor() {

        super({

            id: "test",

            name: "Test App",

            icon: "🧪",

            width: 400,

            height: 300
        });
    }


    initialize() {

        console.log(
            "🧪 TEST → initialize()"
        );
    }


    open(windowId) {

        super.open(
            windowId
        );

        console.log(
            "🧪 TEST → open()"
        );
    }


    render() {

        return `
            <div style="
                padding: 20px;
                font-family: sans-serif;
            ">

                <h2>
                    🧪 RagebaitOS Test App
                </h2>

                <p>
                    AppBase is connected!
                </p>

                <p>
                    Application ID:
                    <strong>${this.id}</strong>
                </p>

                <p>
                    Window ID:
                    <strong>${this.windowId}</strong>
                </p>

            </div>
        `;
    }


    close() {

        console.log(
            "🧪 TEST → close()"
        );

        super.close();
    }
}


export default TestApp;