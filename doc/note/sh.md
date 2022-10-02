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


#init.d script put it in /etc/init.d/cloudreve,sudo ln -s /etc/init.d/cloudreve /etc/rc3.d/S0cloudreve, rc3.d may be changed to rc5.d..
```
#!/bin/bash
# chkconfig: 2345 20 80
# description: Description comes here....

# Source function library.
#. /etc/init.d/functions

start() {
    # code to start app comes here 
    # example: daemon program_name &
    /mnt/sda5/project/cloudreve/cloudreve_armv7 >/tmp/cdlog &
}

stop() {
    # code to stop app comes here 
    # example: killproc program_name
    killall cloudreve
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