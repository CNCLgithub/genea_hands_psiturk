import os
import random
import json
from time import gmtime, strftime


PSITURK_PATH = os.path.dirname(os.path.realpath(__file__))
STIMULUS_DIR = os.path.join(PSITURK_PATH, "static/images")
JSON_DATA_DIR = os.path.join(PSITURK_PATH, "static/data")


TOTAL_TRIAL_NUM = 22


class JsonWriter:
    STIMULUS = "stimulus"

    TRIAL_ID = "trial_id"
    TRIAL_INIT_IMG = "trial_init_img"
    TRIAL_FINAL_IMG = "trial_final_img"

    def __init__(self, stimulus_list):
        self.json_object = self._get_stimulus_list_dict(stimulus_list)

    def _get_stimulus_dict(self, trial_id, init_img, final_img):
        returned_dict = dict()
        returned_dict[self.TRIAL_ID] = trial_id
        returned_dict[self.TRIAL_INIT_IMG] = init_img
        returned_dict[self.TRIAL_FINAL_IMG] = final_img
        return returned_dict

    def _get_stimulus_list_dict(self, stimulus_list):
        returned_dict = dict()

        array = []
        for stimulus in stimulus_list:
            array.append(self._get_stimulus_dict(stimulus.get_stimulus_id(),
                                                 stimulus.get_init_img(),
                                                 stimulus.get_final_img()))

        returned_dict[self.STIMULUS] = array
        return returned_dict

    def get_json_string(self):
        return json.dumps(self.json_object, indent=2)


class Stimulus:
    def __init__(self, stimulus_id):
        self.stimulus_id = stimulus_id
        self.init_img = None
        self.final_img = None

    def set_init_img(self, img):
        self.init_img = img

    def set_final_img(self, img):
        self.final_img = img

    def get_stimulus_id(self):
        return self.stimulus_id

    def get_init_img(self):
        return self.init_img

    def get_final_img(self):
        return self.final_img


class TrialType:
    HAND = "hand"


def get_stimulus_files():
    all_filenames = []
    for file in os.listdir(STIMULUS_DIR):
        if file.startswith(TrialType.HAND):
            all_filenames.append(file)
    return sorted(all_filenames)


def get_all_stimuli():

    all_stimuli = []

    possible_trial_ids = list(range(1, TOTAL_TRIAL_NUM + 1))

    for trial_id in possible_trial_ids:
        stimulus = Stimulus(trial_id)

        init_img_filename = TrialType.HAND + "_" + str(trial_id) + ".jpg"
        final_img_filename = TrialType.HAND + "_" + str(trial_id) + "_f.jpg"

        stimulus.set_init_img(init_img_filename)
        stimulus.set_final_img(final_img_filename)
        all_stimuli.append(stimulus)

    return all_stimuli


def get_trial_order(all_stimuli):
    random.shuffle(all_stimuli)
    return all_stimuli


def generate_json_condition_file(stimulus_list):
    json_string = JsonWriter(stimulus_list).get_json_string()

    with open(os.path.join(JSON_DATA_DIR, 'condition_list.json'), 'w') as outfile:
        outfile.write(json_string)
        outfile.close()

    curr_time = strftime("_%m_%d_T_%H_%M_%S", gmtime())
    with open(os.path.join(JSON_DATA_DIR, 'condition_list' + curr_time + '.json'), 'w') as outfile:
        outfile.write(json_string)
        outfile.close()


def main():
    all_trials = get_trial_order(get_all_stimuli())
    generate_json_condition_file(all_trials)


if __name__ == '__main__':
    main()
