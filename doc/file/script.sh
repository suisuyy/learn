# common snipt

# tricks
i3-msg reload
brightnessctl -d 'backlight' set 0
cat /sys/class/thermal/thermal_zone*/temp
cat /sys/module/kernel/parameters/consoleblank


## task
1. systemctl get-default
2. To change boot target to the text mode:
sudo systemctl set-default multi-user.target
### autolanuch at login

#script in /etc/profile /etc/profile.d/ ~/.profile will exec when login,here recommand use ~/.profile, it only affect curren user a typical .profile like this

xterm &
#note & is need to push program background,or it will block desktop env to start

#autolaunch at boot use systemd to launch program at boot
a typical service like this
/etc/systemd/system/test.service

[Unit]
Description=test message systemd service.
[Service]
Type=simple
ExecStart=/bin/bash /root/proute/init.sh
[Install]
WantedBy=multi-user.target

systemctl enable --now test
sudo systemctl restart test.service




#while.sh
echo run cmd at case of  every n seconds

#_last=${!#}  echo "${@: -1}"

CMD="${1:-'emptycmd'}"
SLEEP_DURATION="${2:-3}"
while true
do
        $CMD;
         echo cmd:$CMD : 'restart after ' $SLEEP_DURATION seconds
          sleep $SLEEP_DURATION
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
#$1 is devicename,$2 is event up/down
if [ "$2" == "up" ]; then
    echo $1 $2
fi



