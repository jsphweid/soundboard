#!/bin/bash

remote_state_bucket="jlw-remote-state"

if [[ $1 = "apply" ]];  then
    terraform apply terraform.out
else
    rm -rf .terraform
    terraform init -backend-config="bucket=$remote_state_bucket"
    terraform plan \
        -var "remote_state_bucket=$remote_state_bucket" \
        -refresh=true \
        -out terraform.out
fi