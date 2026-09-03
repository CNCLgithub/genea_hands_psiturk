#!/bin/bash

usage="Syntax: $(basename "$0") [-h|--help] [COMPONENTS...] -- will set up the project environment,

where:
    -h | --help     Print this help
    COMPONENTS...   Specify component to set up

Valid COMPONENTS:
    all: set up all components (container will be pulled, not built)
    cont_[pull|build]: pull the singularity container or build it
    data: pull data"

if [[ $# -eq 0 ]] || [[ "$@" =~ "--help" ]] || [[ "$@" =~ "-h" ]];then
    echo "$usage"
    exit 0
fi

CONT_NAME="psiturk.sif"

# container setup
if [[ "$@" =~ "cont_pull" ]] || [[ "$@" =~ "all" ]];then
    echo "Pulling singularity container..."
    wget "https://yale.box.com/shared/static/6eej5c1p0clkts5xj0339tqkzhmsw5l2.sif" -O "$CONT_NAME"
elif [[ "$@" =~ "cont_build" ]];then
    echo "Building singularity container..."
    SINGULARITY_TMPDIR=/var/tmp sudo -E singularity build "$CONT_NAME" Singularity
else
    echo "Not touching container"
fi


# download stimulus set
if [[ "$@" =~ "data" ]] || [[ "$@" =~ "all" ]];then
    echo "Pulling data..."
    wget "https://yale.box.com/shared/static/a4t80jxp2l4015uaq23ld8u6i4f0v0qb.zip" -O "images.zip"
    chmod +777 images.zip
    unzip images.zip
    mv images/* psiturk/static/images/
    rm -rf images
    rm -rf images.zip
else
    echo "Not pulling any data"
fi

