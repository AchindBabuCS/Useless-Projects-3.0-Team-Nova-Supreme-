import AppBase from "../base/appBase.js";
import eventBus from "../../core/eventBus.js";

import "./gallery.css";


class GalleryApp extends AppBase {

    constructor() {

        super({
            id: "gallery",
            name: "Gallery",
            icon: "🖼️"
        });


        this.images = [
            "/gallery/image1.jpg",
            "/gallery/image2.jpg",
            "/gallery/image3.jpg",
            "/gallery/image4.jpg"
        ];


        this.currentIndex = 0;


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

            <div class="gallery">

                <div class="gallery-viewer">

                    <button
                        class="gallery-previous"
                        title="Previous image"
                    >
                        ◀
                    </button>


                    <img
                        class="gallery-main-image"
                        src="${this.images[this.currentIndex]}"
                        alt="Gallery image"
                    >


                    <button
                        class="gallery-next"
                        title="Next image"
                    >
                        ▶
                    </button>

                </div>


                <div class="gallery-thumbnails">

                    ${this.renderThumbnails()}

                </div>


                <div
                    class="gallery-overlay"
                    hidden
                >

                    <button
                        class="gallery-close"
                        title="Close image"
                    >
                        ×
                    </button>


                    <img
                        class="gallery-large-image"
                        src=""
                        alt="Opened image"
                    >

                </div>

            </div>

        `;
    }


    // ========================================
    // THUMBNAILS
    // ========================================

    renderThumbnails() {

        return this.images.map(
            (image, index) => {

                return `
                    <img
                        class="gallery-thumbnail ${
                            index === this.currentIndex
                                ? "gallery-thumbnail-active"
                                : ""
                        }"
                        src="${image}"
                        data-index="${index}"
                        alt="Thumbnail ${index + 1}"
                    >
                `;

            }
        ).join("");
    }


    // ========================================
    // SETUP
    // ========================================

    setup(windowElement) {

        const previousButton =
            windowElement.querySelector(
                ".gallery-previous"
            );


        const nextButton =
            windowElement.querySelector(
                ".gallery-next"
            );


        const mainImage =
            windowElement.querySelector(
                ".gallery-main-image"
            );


        const thumbnails =
            windowElement.querySelector(
                ".gallery-thumbnails"
            );


        const overlay =
            windowElement.querySelector(
                ".gallery-overlay"
            );


        const largeImage =
            windowElement.querySelector(
                ".gallery-large-image"
            );


        const closeButton =
            windowElement.querySelector(
                ".gallery-close"
            );


        // ====================================
        // PREVIOUS
        // ====================================

        previousButton.addEventListener(
            "click",
            () => {

                if (this.shouldBreakSlider()) {
                    return;
                }


                let direction = -1;


                if (this.shouldReverseSlider()) {

                    direction = 1;


                    console.log(
                        "😈 Gallery sabotage: slider direction reversed"
                    );
                }


                this.changeImage(
                    direction,
                    mainImage,
                    thumbnails
                );
            }
        );


        // ====================================
        // NEXT
        // ====================================

        nextButton.addEventListener(
            "click",
            () => {

                if (this.shouldBreakSlider()) {
                    return;
                }


                let direction = 1;


                if (this.shouldReverseSlider()) {

                    direction = -1;


                    console.log(
                        "😈 Gallery sabotage: slider direction reversed"
                    );
                }


                this.changeImage(
                    direction,
                    mainImage,
                    thumbnails
                );
            }
        );


        // ====================================
        // THUMBNAILS
        // ====================================

        thumbnails.addEventListener(
            "click",
            (event) => {

                const thumbnail =
                    event.target.closest(
                        ".gallery-thumbnail"
                    );


                if (!thumbnail) {
                    return;
                }


                const index =
                    Number(
                        thumbnail.dataset.index
                    );


                this.currentIndex = index;


                mainImage.src =
                    this.images[
                        this.currentIndex
                    ];


                this.updateThumbnails(
                    thumbnails
                );
            }
        );


        // ====================================
        // OPEN IMAGE
        // ====================================

        mainImage.addEventListener(
            "click",
            () => {

                largeImage.src =
                    this.images[
                        this.currentIndex
                    ];


                overlay.hidden = false;
            }
        );


        // ====================================
        // CLOSE IMAGE
        // ====================================

        closeButton.addEventListener(
            "click",
            () => {

                overlay.hidden = true;
            }
        );
    }


    // ========================================
    // CHANGE IMAGE
    // ========================================

    changeImage(
        direction,
        mainImage,
        thumbnails
    ) {

        this.currentIndex += direction;


        if (
            this.currentIndex >=
            this.images.length
        ) {

            this.currentIndex = 0;
        }


        if (this.currentIndex < 0) {

            this.currentIndex =
                this.images.length - 1;
        }


        mainImage.src =
            this.images[
                this.currentIndex
            ];


        this.updateThumbnails(
            thumbnails
        );
    }


    // ========================================
    // UPDATE THUMBNAILS
    // ========================================

    updateThumbnails(thumbnails) {

        const allThumbnails =
            thumbnails.querySelectorAll(
                ".gallery-thumbnail"
            );


        allThumbnails.forEach(
            (thumbnail, index) => {

                thumbnail.classList.toggle(
                    "gallery-thumbnail-active",
                    index === this.currentIndex
                );
            }
        );
    }


    // ========================================
    // RAGE:
    // SLIDER DOES NOTHING
    // ========================================

    shouldBreakSlider() {

        /*
         * 15% chance that the slider
         * simply does nothing.
         */

        if (Math.random() < 0.15) {

            console.log(
                "😈 Gallery sabotage: slider disabled"
            );

            return true;
        }


        return false;
    }


    // ========================================
    // RAGE:
    // OPPOSITE DIRECTION
    // ========================================

    shouldReverseSlider() {

        /*
         * 20% chance of reversing
         * the requested direction.
         */

        return Math.random() < 0.20;
    }
}


export default GalleryApp;