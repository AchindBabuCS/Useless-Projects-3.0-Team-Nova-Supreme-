import AppBase from "../base/appBase.js";
import eventBus from "../../core/eventBus.js";

import "./notepad.css";


class NotepadApp extends AppBase {

    constructor() {

        super({
            id: "notepad",
            name: "Notepad",
            icon: "📝"
        });


        this.fileName = "Untitled.txt";


        /*
         * Listen for the moment WindowManager
         * has actually created our window.
         */
        eventBus.on(
            "WINDOW_CREATED",
            (data) => {

                if (data.windowId !== this.id) {
                    return;
                }


                const windowElement =
                    document.querySelector(
                        `[data-window-id="${this.id}"]`
                    );


                if (!windowElement) {
                    return;
                }


                this.setup(windowElement);
            }
        );
    }


    // ========================================
    // RENDER
    // ========================================

    render() {

        return `

            <div class="notepad">

                <div class="notepad-toolbar">

                    <button class="notepad-new">
                        New
                    </button>

                    <button class="notepad-open">
                        Open
                    </button>

                    <button class="notepad-save">
                        Save
                    </button>

                    <span class="notepad-filename">
                        ${this.fileName}
                    </span>

                </div>


                <textarea
                    class="notepad-editor"
                    spellcheck="false"
                    placeholder="Start typing..."
                ></textarea>


                <input
                    type="file"
                    class="notepad-file-input"
                    accept=".txt,text/plain"
                    hidden
                >

            </div>

        `;
    }


    // ========================================
    // SETUP
    // ========================================

    setup(windowElement) {

        const newButton =
            windowElement.querySelector(
                ".notepad-new"
            );

        const openButton =
            windowElement.querySelector(
                ".notepad-open"
            );

        const saveButton =
            windowElement.querySelector(
                ".notepad-save"
            );

        const editor =
            windowElement.querySelector(
                ".notepad-editor"
            );

        const fileInput =
            windowElement.querySelector(
                ".notepad-file-input"
            );


        /*
         * NEW
         */

        newButton.addEventListener(
            "click",
            () => {

                editor.value = "";

                this.fileName =
                    "Untitled.txt";

                this.updateFileName(
                    windowElement
                );

                editor.focus();
            }
        );


        /*
         * OPEN
         */

        openButton.addEventListener(
            "click",
            () => {

                fileInput.click();
            }
        );


        fileInput.addEventListener(
            "change",
            (event) => {

                const file =
                    event.target.files[0];


                if (!file) {
                    return;
                }


                const reader =
                    new FileReader();


                reader.onload =
                    () => {

                        editor.value =
                            reader.result;


                        this.fileName =
                            file.name;


                        this.updateFileName(
                            windowElement
                        );


                        editor.focus();
                    };


                reader.readAsText(file);
            }
        );


        /*
         * SAVE
         */

        saveButton.addEventListener(
            "click",
            () => {

                this.saveFile(editor);
            }
        );


        /*
         * TYPING RAGE
         */

        editor.addEventListener(
            "input",
            () => {

                this.applyTypingRage(editor);
            }
        );


        /*
         * WORD-DELETION RAGE
         */

        editor.addEventListener(
            "keydown",
            (event) => {

                this.applyWordDeletionRage(
                    editor,
                    event
                );
            }
        );
    }


    // ========================================
    // UPDATE FILE NAME
    // ========================================

    updateFileName(windowElement) {

        const filename =
            windowElement.querySelector(
                ".notepad-filename"
            );


        if (!filename) {
            return;
        }


        filename.textContent =
            this.fileName;
    }


    // ========================================
    // SAVE FILE
    // ========================================

    saveFile(editor) {

        const text =
            editor.value;


        const blob =
            new Blob(
                [text],
                {
                    type: "text/plain"
                }
            );


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");


        link.href = url;

        link.download =
            this.fileName;


        document.body.appendChild(link);

        link.click();

        link.remove();


        URL.revokeObjectURL(url);
    }


    // ========================================
    // TYPING RAGE
    // ========================================

    applyTypingRage(editor) {

        /*
         * Most keystrokes should remain normal.
         */
        if (Math.random() > 0.25) {
            return;
        }


        const cursorPosition =
            editor.selectionStart;


        if (cursorPosition <= 0) {
            return;
        }


        const position =
            cursorPosition - 1;


        const character =
            editor.value[position];


        /*
         * Only sabotage letters.
         */
        if (!/[a-zA-Z]/.test(character)) {
            return;
        }


        /*
         * Sometimes just change the case.
         */
        if (Math.random() < 0.7) {

            const changedCharacter =
                Math.random() < 0.5
                    ? character.toLowerCase()
                    : character.toUpperCase();


            editor.setRangeText(
                changedCharacter,
                position,
                cursorPosition,
                "end"
            );


            console.log(
                "😈 Notepad sabotage: random letter case"
            );

            return;
        }


        /*
         * Sometimes replace the letter
         * completely.
         */
        const replacements =
            [
                "@",
                "#",
                "$",
                "%",
                "&",
                "3",
                "7",
                "!"
            ];


        const replacement =
            replacements[
                Math.floor(
                    Math.random() *
                    replacements.length
                )
            ];


        editor.setRangeText(
            replacement,
            position,
            cursorPosition,
            "end"
        );


        console.log(
            "😈 Notepad sabotage: letter replaced"
        );
    }


    // ========================================
    // WORD DELETION RAGE
    // ========================================

    applyWordDeletionRage(
        editor,
        event
    ) {

        /*
         * Only trigger when pressing
         * Space or Enter.
         */
        if (
            event.key !== " " &&
            event.key !== "Enter"
        ) {
            return;
        }


        /*
         * 15% chance.
         */
        if (Math.random() > 0.15) {
            return;
        }


        const cursorPosition =
            editor.selectionStart;


        if (cursorPosition <= 0) {
            return;
        }


        const text =
            editor.value;


        /*
         * Find the beginning of
         * the previous word.
         */
        let start =
            cursorPosition - 1;


        while (
            start >= 0 &&
            /\S/.test(text[start])
        ) {

            start--;
        }


        start++;


        if (start >= cursorPosition) {
            return;
        }


        /*
         * Delete the word.
         */
        editor.setRangeText(
            "",
            start,
            cursorPosition,
            "end"
        );


        /*
         * Stop the space/enter from
         * being inserted normally.
         */
        event.preventDefault();


        console.log(
            "😈 Notepad sabotage: previous word deleted"
        );
    }
}


export default NotepadApp;