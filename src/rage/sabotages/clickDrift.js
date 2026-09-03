const clickDrift = {

    id: "click-drift",


    offsetX: 0,

    offsetY: 0,


    trigger(data) {

        /*
         * Small random drift.
         */
        const drift =
            15;


        this.offsetX +=
            (Math.random() * 2 - 1) *
            drift;


        this.offsetY +=
            (Math.random() * 2 - 1) *
            drift;


        this.apply();
    },


    apply() {

        document.documentElement.style.setProperty(
            "--rage-cursor-offset-x",
            `${this.offsetX}px`
        );


        document.documentElement.style.setProperty(
            "--rage-cursor-offset-y",
            `${this.offsetY}px`
        );
    }
};


export default clickDrift;