# common snipt

# tricks
i3-msg reload
brightnessctl -d 'backlight' set 0
cat /sys/class/thermal/thermal_zone*/temp
cat /sys/module/kernel/parameters/consoleblank


## autolaunch
1. systemctl get-default
2. To change boot target to the text mode:
sudo systemctl set-default multi-user.target
### autolanuch at login

script in /etc/profile /etc/profile.d/ ~/.profile will exec when login,
here recommand use ~/.profile, it only affect curren user

a typical .profile like this

.profile

xterm &

note & is need to push program background,or it will block desktop env to start

autolaunch at boot

use systemd to launch program at boot

a typical service like this

/etc/systemd/system/test.service

[Unit]
Description=test message systemd service.
[Service]
Type=simple
ExecStart=/bin/bash /home/suisuy/test.sh
[Install]
WantedBy=multi-user.target


systemctl enable --now test
sudo systemctl restart test.service





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



