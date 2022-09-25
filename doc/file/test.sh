# common snipt

# tricks


#while.sh
VARIABLE="${1:-defaultarg1}"
SLEEP_DURATION=3
while true
do
 echo 'srestart after ' $SLEEP_DURATION seconds $VARIABLE
 sleep SLEEP_DURATION
done



#make sure Audio always actived
sudo sh -c 'echo 1 >/sys/bus/pci/rescan'
sleep 1
DEVICE_ID=$(lspci -D | grep Audio | awk '{print $1}')
sleep 1
sudo sh -c "echo 1 >/sys/bus/pci/devices/${DEVICE_ID}/remove"
#sudo sh -c "echo 1 >/sys/bus/pci/devices/0000:00:1f.3/remove"

sleep 1
sudo sh -c 'echo 1 >/sys/bus/pci/rescan'
sleep 1

amixer -D pulse sset Master mute
sleep 1
amixer -D pulse sset Master unmute



# net up/down dispatch 
#!/bin/bash

#touch /etc/NetworkManager/dispatcher.d/30-mydispatcher;chmod +x /etc/NetworkManager/dispatcher.d/30-mydispatcher

if [ "$1" == "eth0" ] && [ "$2" == "up" ]; then
    echo $1 $2
fi



