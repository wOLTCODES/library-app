#!/bin/bash
scp target/library-app-0.0.1-SNAPSHOT.jar $1:/var/www/html/woltcodes.com/knihovna/
PID=$(ssh $1 ps aux | grep 'library-app-0.0.1-SNAPSHOT.jar' | head -n1 | awk '{ print $2 }')
echo $PID
ssh $1 kill -n 9 $PID
ssh $1 "screen -S knihovna -X stuff 'bash /var/www/html/woltcodes.com/knihovna/start.sh \015'"
