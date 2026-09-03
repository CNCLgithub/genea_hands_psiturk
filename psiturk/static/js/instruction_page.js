let init_instructions = [
    [
        "Thank you for volunteering to help out with our study.<br>" +
        "<ul>" +
        "<li>Please take a moment to adjust your seating so that you can comfortably watch the monitor and use the keyboard/mouse." +
        "<li>Close the door or do whatever is necessary to minimize disturbance during the experiment." +
        "<li>Please also take a moment to silence your phone so that you are not interrupted by any messages mid-experiment." +
        "</ul><br>" +
        "Click <b>Next</b> when you are ready to continue.",
        "left", "", false, 8
    ],
    [
        "This experiment requires you to be in <b>full screen</b> mode.<br><br>" +
        "We will switch you to full screen mode when you press <b>Next</b> below.<br><br>" +
        "Don't worry, we will return to the normal size at the end of the experiment.<br><br>" + "" +
        "Please Note: If you do need to leave in the middle, you can press the ESC key -- but please avoid this. Your responses are only useful to us if you stay in this mode until the end of the experiment.<br><br>"+
        "Click <b>Next</b> to continue.",
        "left"
    ],
    [
        "The study is designed to be <i>challenging</i>.<br> " +
        "Sometimes, you'll be certain about what you saw. Other times, you won't be -- that is okay! We only hope that you give your best shot at all the questions in the experiment.",
        "center"
    ],
    [
        "We know it is difficult to stay focused on the screen for too long, but we urge you to do your best.<br><br>" +
        "Thank you again for your participation in this study and for your help with our research!<br>",
        "center"
    ],
    [
        "In this experiment, you will be shown image pairs containing colored blocks arranaged in different configurations.<br><br>" +
        "One of these images will display an <b>initial configuration</b> of blocks. " +
        "Using either just one of my hands OR both my hands, I manipulated this initial configuration to build some target block configuration. " +
        "This target configuration will be presented to you as the second image under the title <b>final configuration</b>.<br><br>" +
        "Below is an example of me reorganizing the given initial arrangement of blocks to attain the target configuration using only one hand. <br>",
        "center"
    ],
    [
        "Your task will be to predict how many hands I must have used for a given initial-final configuration pair. <br><br>" +
        "<i>Please use the slider to report your judgement in the experiment.</i> <br><br>" +
        "<b>NOTE:<br>For this experiment, assume that one hand can move only one block at a time. Since I have only two hands, I can move at most two blocks simultaneously.</b>" +
        "",
        "left"
    ],
    [
        "To ensure that you have understood the instructions, we will ask you two questions relating to what you just read. <br><br>" +
        "Click <b>Next</b> to proceed to a short quiz.",
        "center"
    ],
];


class InstructionPage extends Page {

    // constructor(experiment_part, first_part) {
    constructor() {
        super();
        this.showInstructions();

        this.full_screen_element = document.getElementById("full_screen_element");
        this.instructions = document.getElementById("instructions");
        this.next_button = document.getElementById("next_instruction");

        this.instructions_img_div = document.getElementById("instructions_img_div");
        this.instructions_img = document.getElementById("instructions_img");

        this.instruction_number = 0;
    }

    set_instruction_number(instruction_number) {
        this.instruction_number = instruction_number;
    }

    get_total_instructions() {
        return init_instructions.length;
    }

    showNextInstruction(callback) {
        this.next_button.onclick = function() {
            console.log("INFO: next button clicked.");
            callback();
        };

        if (this.instruction_number >= this.get_total_instructions()) {
            console.log("No more instructions to process.");
            return;
        }

        let instruction_array = init_instructions.slice();

        if (this.instruction_number > 1 && !isFullScreenCurrently()) {
            goFullscreen(this.full_screen_element);
        }

        this.instructions_img_div.style.display = "none";

        let base_path = "../static/images/";
        if (this.instruction_number === 4) {
            this.instructions_img.src = base_path + "instructions.png";
            this.instructions_img.onload = function () {
                this.showInstructions();
            }.bind(this);

            this.instructions_img_div.style.display = "block";
        }

        this.instructions.innerHTML = instruction_array[this.instruction_number][0];
        this.instructions.style.textAlign = instruction_array[this.instruction_number][1];
    }

}
