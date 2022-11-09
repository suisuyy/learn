# common snipt

# tricks
i3-msg reload
brightnessctl -d 'backlight' set 0
cat /sys/class/thermal/thermal_zone*/temp
cat /sys/module/kernel/parameters/consoleblank



## dd
```


#dd disk write speed mount sync ntfs3
DEV='/dev/sda3' BUFSIZE=100M  COUNT=4 MFLAGS='-t ntfs3 -o sync' DFLAGS='';sudo mkdir tmp ;sudo umount tmp ;sudo mount $MFLAGS $DEV tmp;echo start test write speed_______________; sudo dd if=/dev/zero of=tmp/testspeed bs=$BUFSIZE  count=$COUNT  status=progress $DFLAGS;
sudo echo 3 > /proc/sys/vm/drop_caches && echo start test read speed________
sudo dd if=tmp/testspeed of=/dev/null iflag=fullblock status=progress  bs=${BUFSIZE} count=${COUNT} 
sudo rm tmp/testspeed; sudo umount tmp

#dd disk write speed mount sync ntfs3 ddsync
DEV='/dev/sda3' BUFSIZE=100M  COUNT=4 MFLAGS='-t ntfs3 -o sync' DFLAGS='oflag=dsync';sudo mkdir tmp ;sudo umount tmp ;sudo mount $MFLAGS $DEV tmp;echo start test write speed_______________; sudo dd if=/dev/zero of=tmp/testspeed bs=$BUFSIZE  count=$COUNT  status=progress $DFLAGS;
sudo echo 3 > /proc/sys/vm/drop_caches && echo start test read speed________
sudo dd if=tmp/testspeed of=/dev/null iflag=fullblock status=progress  bs=${BUFSIZE} count=${COUNT} 
sudo rm tmp/testspeed; sudo umount tmp

#dd disk write speed mount sync 
DEV='/dev/sda4' BUFSIZE=30M  COUNT=4 MFLAGS='-o sync' DFLAGS='';sudo mkdir tmp ;sudo umount tmp ;sudo mount $MFLAGS $DEV tmp;echo start test write speed_______________; sudo dd if=/dev/zero of=tmp/testspeed bs=$BUFSIZE  count=$COUNT  status=progress $DFLAGS;
sudo echo 3 > /proc/sys/vm/drop_caches && echo start test read speed________
sudo dd if=tmp/testspeed of=/dev/null iflag=fullblock status=progress  bs=${BUFSIZE} count=${COUNT} 
sudo rm tmp/testspeed; sudo umount tmp


#dd disk write speed mount sync ddsync
DEV='/dev/sdb1' BUFSIZE=30M  COUNT=4 MFLAGS='-o sync' DFLAGS='oflag=dsync';sudo mkdir tmp ;sudo umount tmp ;sudo mount $MFLAGS $DEV tmp;echo start test write speed_______________; sudo dd if=/dev/zero of=tmp/testspeed bs=$BUFSIZE  count=$COUNT  status=progress $DFLAGS;
sudo echo 3 > /proc/sys/vm/drop_caches && echo start test read speed________
sudo dd if=tmp/testspeed of=/dev/null iflag=fullblock status=progress  bs=${BUFSIZE} count=${COUNT} 
sudo rm tmp/testspeed; sudo umount tmp




```

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
echo run cmd at case of  every n seconds,useage: frun.sh cmd interval

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





# bash

## init bash

```

# alias
alias pingb="ping baidu.com"
alias pingr="ping 192.168.68.1"
alias pingd="ping 8.8.8.8"
alias ping2="ping 192.168.100.2"

alias ipr="ip route"


alias winec="LANG=zh_CN.UTF-8 wine"
alias aria2x="aria2c --file-allocation=none -x 10"
alias mountx="mount -o sync"
alias ddx="dd oflag=direct status=progress  bs=20M"

#alias cpx="rsync -ah --progress" #slow speed so disabled
#alias winec="ALL_LOCAL=zh_CN.UTF-8 wine"

```

## common snipt

```
#while
SLEEP_DURATION=3
while true
do
 echo 'ssh died,restart after ' $SLEEP_DURATION seconds
 sleep SLEEP_DURATION
done


```



# pac

```

function FindProxyForURL(url, host) {
    if (isResolvable(host)) {
      return "DIRECT";
    }
    return "PROXY 192.168.100.2:10801";
  }


  ```


  # tmp
  ```
 docker run  \
  -v /mnt/sda5:/mnt/data/ttnode \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /proc:/host/proc:ro \
  --name ttnode \
  --hostname ttnode \
  --privileged \
  --net=host \
  registry.cn-hangzhou.aliyuncs.com/tiptime/ttnode:latest

http://ip:1024

cat /sys/class/thermal/thermal_zone*/temp




  ```





# test
```



```

# android shell
```
#You can also start adbd service by executing start adbd or setprop ctl.start adbd. But I prefer the settings way because it properly goes through Android framework.
settings put global adb_enabled 1

setprop service.adb.tcp.port 5555 ; stop adbd; start adbd

```


#init.d script put it in 
sudo curl -o /etc/init.d/myinit https://raw.githubusercontent.com/suisuyy/learn/main/doc/file/myinit
sudo chmod 777 /etc/init.d/myinit
sudo ln -s /etc/init.d/myinit /etc/rc3.d/S0myinit 
sudo ln -s /etc/init.d/myinit /etc/rc5.d/S0myinit 



sudo vim /etc/init.d/myinit
#useage service "service name" start/stop/status/restart
```
#!/bin/bash
# chkconfig: 2345 20 80
# description: simple init script 

# Source function library.
#. /etc/init.d/functions

start() {
    # code to start app comes here 
    # example: python3 -m http.server 8080 &
    echo 'myinit executed' >/tmp/myinit.log
     python3 -m http.server 8080 &
}

stop() {
    # code to stop app comes here 
    # example: killproc program_name
    killall myinit
}

case "$1" in 
    start)
       start
       ;;
    stop)
       stop
       ;;
    restart)
       stop
       start
       ;;
    status)
       # code to check status of app comes here 
       # example: status program_name
       ;;
    *)
       echo "Usage: $0 {start|stop|status|restart}"
esac

exit 0 


```


# startup

# debian

apt install -y fonts-wqy-zenhei openssh-server iputils-ping iputils-* iperf3 curl wget git vim bash-completion screen w3m aria2 p7zip unrar rsync sshfs tinyproxy ncdu

apt install dbus-x11 xfce4  xfce4-terminal firefox-esr chromium 

# arch

#setup mirror to china

sudo pacman-mirrors -c China

#necessary package

wqy-microhei base-devel openssh git vim bash-completion screen w3c aria2 p7zip unrar rsync sshfs tinyproxy ncdu \
   gnome-terminal firefox chromium 


#start up package

pacstrap /mnt base linux linux-firmware intel-ucode vi grub efibootmgr bash-completion
[wqy-microhei](https://archlinux.org/packages/?name=wqy-microhei) openssh vim man ncdu netcat xfce4-terminal

arm repo

Server = https://mirrors.ustc.edu.cn/archlinuxarm/$arch/$repo

