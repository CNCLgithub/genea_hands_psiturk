class TrialPage extends Page {

    constructor(trial_data) {
        super();
        this.hideAll();

        this.trial_data = trial_data;

        this.next_button = document.getElementById("next_trial");

        this.full_screen_element = document.getElementById("full_screen_element");

        this.hand_row = document.getElementById("hand_row");

        this.hand_image_init = document.getElementById("hand_init_img");
        this.hand_image_final = document.getElementById("hand_final_img");

        this.option_text_left = document.getElementById("left_option_text");
        this.option_text_right = document.getElementById("right_option_text");

        this.question_prompt = document.getElementById("question_prompt");

        this.progress = document.getElementById("progress");
        this.slider = document.getElementById("weightSlider");

        this.current_trial_num = 0;

        this.slider.addEventListener("click", function() {
            toggleButtonToVisible(true);
        });

        init_slider();
        toggleButtonToVisible(false);
    }

    setCurrentTrialNum(current_trial_num) {
        this.current_trial_num = current_trial_num;
        this.trial_data.update_current_trial_num(this.current_trial_num);
    }

    showPage(callback) {
        this.next_button.onclick = function() {
            console.log("INFO: next button clicked.")
            callback();
        };

        if (this.current_trial_num >= this.trial_data.get_total_trials()) {
            return;
        }

        if (!isFullScreenCurrently()) {
            goFullscreen(this.full_screen_element);
        }

        this.#updateText();
        this.#updateImages();
    }

    clearResponse() {
        init_slider();
    }

    getSliderValue() {
        return this.slider.value;
    }

    getTrialNumber() {
        return this.trial_data.get_trial_number();
    }

    getTrialName() {
        return this.trial_data.get_trial_name();
    }
    
    getTrialInitImageName() {
        return this.trial_data.get_hand_init_img_path().split("/").at(-1);
    }

    getTrialFinalImageName() {
        return this.trial_data.get_hand_final_img_path().split("/").at(-1);
    }

    /************
     * Helpers  *
     ***********/

    #updateText() {
        this.progress.innerHTML = (this.trial_data.get_trial_number() + 1) + " / " +
                                  this.trial_data.get_total_trials();

        this.question_prompt.innerHTML = "How many hands did I use?";
        this.option_text_left.innerText = "Definitely \n just one hand";
        this.option_text_right.innerText = "Definitely \n both hands";
    }

    #updateImages() {
        let init_loaded = false;
        let final_loaded = false;

        function checkCondition() {
            return init_loaded && final_loaded;
        }

        this.hand_row.style.display = "block";
        this.hand_image_init.src = this.trial_data.get_hand_init_img_src();
        this.hand_image_final.src = this.trial_data.get_hand_final_img_src();

        this.hand_image_init.onload = function () {
            init_loaded = true;
            if (checkCondition) {
                this.showTrials();
            }
        }.bind(this);
        this.hand_image_init.onload = function () {
            final_loaded = true;
            if (checkCondition) {
                this.showTrials();
            }
        }.bind(this);
    }

}
