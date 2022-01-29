#!/bin/bash
ssh dayrlism@206.189.150.29 <<EOF
 sudo su -
 cd /Code/dayrlism-frontend
 git add --all
 git reset --hard
 git pull
#  pnpm install
#  pnpm build
 exit
EOF
