#!/bin/bash

CONT_NAME="psiturk.sif"

singularity exec "$CONT_NAME" bash -c "cd psiturk && psiturk server off"
pkill -f psiturk_experiment_server_*
