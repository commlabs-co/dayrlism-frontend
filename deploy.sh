#!/bin/bash
ssh commlabs-client-shared-server <<EOF
 sudo su -
 cd /Code/dayrlism-frontend-v5
 git pull
 
 exit
EOF
