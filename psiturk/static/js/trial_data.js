class TrialType {
    static HAND = "hand"
}

class StimulusData {
    constructor(trial_id, trial_type, trial_number,
                hand_init_img_path, hand_final_img_path,
                hand_init_img_src, hand_final_img_src) {
        this.trial_id = trial_id;
        this.trial_type = trial_type;
        this.trial_number = trial_number;

        this.hand_init_img_path = hand_init_img_path;
        this.hand_final_img_path = hand_final_img_path;

        this.hand_init_img_src = hand_init_img_src;
        this.hand_final_img_src = hand_final_img_src;
    }

    get_trial_id(){
        return this.trial_id;
    }

    get_trial_number(){
        return this.trial_number;
    }

    get_trial_type(){
        return this.trial_type;
    }

    get_trial_name() {
        return this.get_trial_type() + "_" + this.get_trial_id();
    }

    get_hand_init_img_path(){
        return this.hand_init_img_path;
    }

    get_hand_final_img_path(){
        return this.hand_final_img_path;
    }

    get_hand_init_img_src(){
        return this.hand_init_img_src;
    }

    get_hand_final_img_src(){
        return this.hand_final_img_src;
    }
}

class TrialData {

    constructor(trial_data) {
        this.stimulus_list = [];
        this.image_list = [];

        this.#parse_trial_data(trial_data);

        this.current_trial_num = 0;
    }

    #get_preloaded_image(url) {
        if(url != null) {
            let img = new Image();
            img.src = url;
            this.image_list.push(img);
            return this.image_list.at(-1).src;
        }
        return null;
    }

    #parse_trial_data(trial_data) {

        let base_path = "../static/images/";

        let stimuli_data = trial_data["stimulus"];

        for (let trial_num = 0; trial_num < stimuli_data.length; trial_num++) {
            let stimulus_data = stimuli_data[trial_num];

            let trial_id = null;
            let trial_type = null;
            let hand_init_img_path = null;
            let hand_final_img_path = null;

            trial_id = stimulus_data["trial_id"];
            trial_type = TrialType.HAND

            hand_init_img_path = base_path + stimulus_data["trial_init_img"];
            hand_final_img_path = base_path + stimulus_data["trial_final_img"];

            this.stimulus_list.push(new StimulusData(trial_id,
                                                     trial_type,
                                                     trial_num,
                                                     hand_init_img_path,
                                                     hand_final_img_path,
                                                     this.#get_preloaded_image(hand_init_img_path),
                                                     this.#get_preloaded_image(hand_final_img_path)));
        }
    }

    #get_current_stimulus_data() {
        return this.stimulus_list[this.current_trial_num];
    }

    update_current_trial_num(current_trial_num) {
        this.current_trial_num = current_trial_num;
    }

    get_trial_number() {
        return this.#get_current_stimulus_data().get_trial_number();
    }

    get_trial_name() {
        return this.#get_current_stimulus_data().get_trial_name();
    }

    get_total_trials() {
        return this.stimulus_list.length;
    }

    get_hand_init_img_path() {
        return this.#get_current_stimulus_data().get_hand_init_img_path();
    }

    get_hand_final_img_path() {
        return this.#get_current_stimulus_data().get_hand_final_img_path();
    }

    get_hand_init_img_src() {
        return this.#get_current_stimulus_data().get_hand_init_img_src();
    }

    get_hand_final_img_src() {
        return this.#get_current_stimulus_data().get_hand_final_img_src();
    }
}