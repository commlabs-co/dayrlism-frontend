#!/bin/bash
ssh commlabs-do-shared-server <<EOF
    sudo su -
    cd /Code/dayrlism-frontend
    git add --all
    git reset --hard
    git pull
    yarn
    yarn build
    
    pm2 del dayrlism-frontend
    pm2 start pm2.json

    exit   
EOF
