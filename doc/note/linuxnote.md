# toc
- [toc](#toc)
- [useage](#useage)
- [bash](#bash)
- [backup](#backup)
- [benchmark](#benchmark)
- [disk](#disk)
    - [dd and disk speed](#dd-and-disk-speed)
    - [parted](#parted)
    - [resize](#resize)
- [boot](#boot)
  - [grub](#grub)
- [net](#net)
  - [status](#status)
  - [bbr](#bbr)
  - [route](#route)
  - [dns](#dns)
- [Disk](#disk-1)
- [email web](#email-web)
- [status](#status-1)
- [config](#config)
  - [control hardward cmd](#control-hardward-cmd)
  - [firefox](#firefox)
  - [gnome](#gnome)
- [docker](#docker)
- [loop:](#loop)
- [mount devices](#mount-devices)
- [nvm npm](#nvm-npm)
- [proxy](#proxy)
- [qt](#qt)
  - [pipewire](#pipewire)
- [screen](#screen)
- [security](#security)
- [system monitor](#system-monitor)
- [sound](#sound)
- [ssh](#ssh)
- [Generating Key Pairs](#generating-key-pairs)
  - [ssh Port Forwarding](#ssh-port-forwarding)
- [��tar�� stands for tape archive](#tar-stands-for-tape-archive)
- [user](#user)
- [usermod](#usermod)
    - [](#)
- [chown](#chown)
- [vim](#vim)
- [virt](#virt)
  - [chroot](#chroot)
  - [docker](#docker-1)
- [vnc](#vnc)
- [vmware](#vmware)
- [virtual box usage](#virtual-box-usage)
  - [mount shared foder owned by noroot](#mount-shared-foder-owned-by-noroot)
  - [usb connection problem](#usb-connection-problem)
  - [zram usage](#zram-usage)
- [short](#short)




xfreerdp /u:Administrator /p:a /v:192.168.68.11 +fonts    /clipboard /home-drive  /sound:latency:400

aria2c --enable-rpc --rpc-listen-all


# useage
```
# adb fastboot
adb reboot
#������Recovery����
adb reboot recovery
#������bootloader����
adb reboot bootloader
```

# auto task
## auto at gui login
vim ~/.xprofile # note dont put sleep there ,it will stuck gui startup, use something like this
bash -c "sleep 4; bash ~/.autostart" &

them edit .autostart file



#cron
```

CRON_TZ=Asia/Shanghai 0 5 0 * * *

```



# bash

```bash
echo -e "\n bind 'set completion-ignore-case on'\n bind 'set show-all-if-ambiguous on'\n bind '\C-p:menu-complete'\n" >>~/.bashrc

echo -e \
"escape ^Jj \n\
hardstatus alwayslastline \n\
hardstatus string '%{gk}[%{wk}%?%-Lw%?%{=b kR}(%{W}%n*%f %t%?(%u)%?%{=b kR})%{=w}%?%+Lw%?%? %{g}][%{d}%l%{g}][ %{=w}%Y/%m/%d %0C:%s%a%{g} ]%{W}' \n\
termcapinfo xterm* ti@:te@"\n\
>~/.screenrc

git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
~/.fzf/install
```

# backup
```
tar cfzv homebk.tar.gz .ssh .bashrc app/bin .gitconfig .proxychains .screenrc .profile
tar cvpjf backup.tar.bz2 --exclude-from=excl /
```


# benchmark

```shell
#7z 
7z b -mmt1#get 1865 for sd845 ,double point for ruby

#iperf3
iperf3 -c 192.168.68.174   -b 200m -P 4

#dd disk write speed
DIR='.' BUFSIZE=40M  COUNT=10 ;echo start test write speed_______________; sudo dd if=/dev/zero of=${DIR}/testspeed bs=$BUFSIZE count=$COUNT status=progress  oflag=dsync;echo start test read speed_______________; sudo dd if=${DIR}/testspeed of=/dev/null bs=$BUFSIZE count=$COUNT status=progress  oflag=dsync;



DEV='/dev/sdb1' BUFSIZE=30M  COUNT=4 MFLAGS='' DFLAGS='';\
sudo mkdir tmp ;sudo umount tmp ;sudo mount $MFLAGS $DEV tmp;echo start test write speed_______________; sudo dd if=/dev/zero of=tmp/testspeed bs=$BUFSIZE  count=$COUNT  status=progress $DFLAGS;

sudo echo 3 > /proc/sys/vm/drop_caches && echo start test read speed________
sudo dd if=tmp/testspeed of=/dev/null iflag=fullblock status=progress  bs=${BUFSIZE} count=${COUNT} 
sudo rm tmp/testspeed; sudo umount tmp



 
```


# disk
### dd and disk speed

#for ntfs not mount it use -o sync
#dd disk write speed mount sync ddsync
 BUFSIZE=100K  COUNT=4 MFLAGS='-o sync' DFLAGS='oflag=dsync';sudo mkdir tmp ;echo start test write speed_______________; sudo dd if=/dev/zero of=tmp/testspeed bs=$BUFSIZE  count=$COUNT  status=progress $DFLAGS;


### parted
```
cp /sdcard/parted /sbin/ && chmod 755 /sbin/parted
umount /data && umount /sdcard

sudo parted -l
parted /dev/block/sda
p free
rm 17 #17��userdata������ 
mkpart esp fat32 6559MB 7000MB
mkpart pe fat32 7000MB 10000MB
mkpart win ntfs 10000MB 70GB
mkpart userdata ext4 70GB 125GB

set 17 esp on
quit  #save and quit
name 48  newlablename
resize2fs -f /dev/sda23

```
### resize
sudo -s
dd if=/dev/null of=/userdata/ubuntu.img bs=1M seek=6000 count=0
resize2fs -f /userdata/ubuntu.img                                            
reboot


# boot

## grub

```
vim /etc/default/grub
grub-mkconfig -o /boot/grub/grub.cfg

```

# net

## proxy
#test proxy
```
curl https://raw.githubusercontent.com/suisuyy/sbox/main/test/google-chrome-stable_current_amd64.deb  -o chrome.deb -x "http://192.168.68.100:10804"


```

## status
```
#show port
netstat -tulpn | grep 10801 
sudo lsof -i:22
kill $(lsof -t -i:8080) #kill that

nload -u M  wlan0
sudo nethogs
sudo nmap -sn 192.168.68.0/24
```
## bbr

```plain
#superuser needed
#check
sysctl net.ipv4.tcp_available_congestion_control
sysctl net.ipv4.tcp_congestion_control

#enable temperately
sysctl -w net.ipv4.tcp_congestion_control=bbr
sysctl -w net.core.default_qdisc=cake

#enable perment
echo -e "\nnet.ipv4.tcp_congestion_control=bbr\nnet.core.default_qdisc=cake " >>/etc/sysctl.conf && sysctl -p

```


## route


## dns
fast temp set dns server:
echo -e "\
search lan \n\
nameserver 8.8.8.8\n\
">/etc/resolv.conf
echo -e "\n\ndns now is:" &&cat /etc/resolv.conf


# Disk
```
#use parted
parted /dev/block/sda
rm 23
mkpart aboot fat32 53GB 54GB
mkpart userdata ext4 54GB 59GB
set 23 esp on 
```
# email web
```
#start at port 8888, use http://localhost:8888?admin with passwd 12345 to config enable qq mail,bad gmail seems not work
docker run --name rainloop --net host hardware/rainloop
#then can restart with
docker container restart rainloop
```

# status
```
/sys/class/power_supply/axp20x-battery/uevent
 brightnessctl -d 'backlight' set 0
cat /sys/class/thermal/thermal_zone*/temp
cat /sys/module/kernel/parameters/consoleblank
```

# config
## control hardward cmd
```
brightnessctl -d intel_backlight set 50%
```

i3 .config/i3/conf

xfce4
/etc/xdg/xfce4/xfconf/xfce-perchannel-xml/xfce4-session.xml

## firefox
```
enable **clipboard api and addon collection**
open about:config
set dom.events.testing.asyncClipboard to true
enable ssb
network.cookie.sameSite.laxByDefault false
```
## gnome
use dash to panel to make left task bar
**use**Clipboard Indicator to manage clipboard


# docker

```plain
docker run -it --shm-size=512m -v /dev:/dev --net host --entrypoint /bin/bash
--storage-opt size=100G --cpus=4
--restart=always
#basic cmd
sudo docker container ls -a
docker kill $(docker ps -q)  #kill all container
docker container rm  $(docker ps -qa)  #rm all container
docker exec my-tl-demo tlcfg add-user myuser mypassword
docker run -it --shm-size=512m --net host --entrypoint /bin/bash
docker run --rm  -it --shm-size=512m --net host --entrypoint /bin/bash
docker commit 5a8f newimagename
docker run -ti -v "$PWD/somedir":/somedir newimagename /bin/bash

sudo docker run -it --shm-size=512m --net host -v /data/docker/run/:/var/run  --entrypoint /bin/bash mydebian

sudo docker run --rm  -it --shm-size=512m -p 6901:6901 -e VNC_PW=password kasmweb/ubuntu-focal-desktop:develop

sudo docker run --rm  -it --shm-size=512m -p 6901:6901 -e VNC_PW=password --entrypoint /bin/bash kasmweb/ubuntu-focal-desktop:1.11.0

#check if run in docker
if [[ ! $(cat /proc/1/sched | head -n 1 | grep init) ]]; then {
    echo in docker
    } else {
    echo not in docker
    } 
fi

#simple use
docker run --rm --name oc-eval -d -e OWNCLOUD_DOMAIN=localhost:8080 -p8080:8080 owncloud/server
docker ps
docker kill oc-eval
docker rm oc-eval
```


# loop:
```
for z in *.7z; do 7z x "$z" -p'1346' ; done

```

# mount devices
#auto mount use systemd script or cron


#Mount nfs on win
Mount -o rsize=256 -o wsize=256 -o mtype=hard \\192.168.68.110\mnt\sda4 N:
Mount -o rsize=256 -o wsize=256 -o mtype=hard \\192.168.68.110\mnt\sda3 X:

#mount as normal user
mount -o uid=$UID,gid=$(id -g) /dev/zram0 ~/ramdisk #mount zram0 at ~/ramdisk for noroot user
#make directory mount as suisuy
mount directory -o sync #turn of write buffering
chown -R suisuy:suisuy directory/
#remount / with read and write permission
mount -o remount,rw /

#ramdisk
mount -t tmpfs -o uid=1000,gid=1000,size=4G tmpfs ramdisk/
mkfs.btrfs -L data /dev/sdb1
mount -o compress=zstd:10 /dev/sdb1 /data
mount -o compress=lzo /dev/sdb1 /data
#mount img
losetup -f -P sda.img
```
# nvm npm

```plain
//use faster mirros for nvm
export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node
#use nvm bleow
nvm install 14
```
#install cnpm
```plain
npm install cnpm -g --registry=https://registry.npmmirror.com
```
# proxy

```plain
export HTTP_PROXY=http://localhost:10809 #this only works for http url,seems odd
export all_proxy=http://localhost:10809

pip3 install proxy.py
proxy --port 10801 --host 192.168.100.2

```

# qt
export QT_AUTO_SCREEN_SCALE_FACTOR=1
export QT_SCREEN_SCALE_FACTORS=1.5

## pipewire
```
pactl load-module module-native-protocol-tcp listen=0.0.0.0
PULSE_SERVER=tcp:localhost:4713 pactl info
export PULSE_SERVER=tcp:127.0.0.1:4713
```

pushd folder1 #

dirs #display The list of directories is displayed with the dirs command.

popd #send you back to those directories


# screen
screen->session->window
```
#~/.screenrc
#change keybind to ctrl + j
escape ^Jj
hardstatus alwayslastline 
hardstatus string '%{gk}[%{wk}%?%-Lw%?%{=b kR}(%{W}%n*%f %t%?(%u)%?%{=b kR})%{=w}%?%+Lw%?%? %{g}][%{d}%l%{g}][ %{=
w}%Y/%m/%d %0C:%s%a%{g} ]%{W}'
termcapinfo xterm* ti@:te@
#change ctl a to ctl j,enale status bar at botton, make scroolable

#start session
screen -S foos #foos is session name
screen -S 8890.foo -X sessionname bar #rename a session
screen -ls
#when in the session
Ctrl+a c Create a new window (with shell).
Ctrl+a " List all windows.
Ctrl+a 0 Switch to window 0 (by number).
Ctrl+a A Rename the current window.
Ctrl+a S Split current region horizontally into two regions.
Ctrl+a | Split current region vertically into two regions.
Ctrl+a tab Switch the input focus to the next region.
Ctrl+a Ctrl+a Toggle between the current and previous windows
Ctrl+a Q Close all regions but the current one.
Ctrl+a X Close the current region.
Ctrl+A:sessionname bars #rename current session to bars
Ctrl+a k kill the window
Ctrl a,esc enable copy mode for scroll
```

# security
selinux
#check se status
getenforce
```plain
#use permissive mode
setenforce Permissive
setenforce Enforcing
```
#firewalld
systemctl status firewalld
systemctl disable firewalld
systemctl stop firewalld
# system monitor

#disk
sudo apt-get install sysstat ncdu
iostat -m 1 #disk monitor -m means MB/s, 1 mean update 1 /s
ncdu / #easy get disk usage
#network
nload -u M -t 1000 # net monitor -t 1000 meanse 1/s use down to change devices
#process port
lsof -i :3001 #show process use port
top -p 0 -e m #show a process pid 0 mem usage



# sound



```plain
REST=0.5
#make sure Audio always actived
sudo sh -c 'echo 1 >/sys/bus/pci/rescan'
sleep $REST
DEVICE_ID=$(lspci -D | grep Audio | awk '{print $1}')
sleep $REST
sudo sh -c 'echo 1 >/sys/bus/pci/devices/0000:00:1f.3/remove'
sleep $REST
sudo sh -c 'echo 1 >/sys/bus/pci/rescan'
sleep $REST
#mute then unmute to restart audio
amixer -D pulse sset Master mute
sleep $REST
amixer -D pulse sset Master unmute
```

source or .

source����� C Shell ��������bash shell������������������һ������ţ�����Bourne
Shell��������source����һ���ơ������������һ���ű�Ϊ�������ýű�����Ϊ��ǰshell�Ļ���ִ�У�����������һ���µ��ӽ��̡������ڽű������õı�������Ϊ��ǰShell��һ���֡�



# ssh

chmod 0600 .ssh/*

~/.ssh/config

```
ServerAliveInterval 1
ServerAliveCountMax 2
```
echo -e "ServerAliveInterval 1\nServerAliveCountMax 2" >>~/.ssh/config
#restart sshd
systemctl restart sshd

#/usr/bin/sshd -p 2222



keep ssh runing

```plain
stime=3;
while true
do
ssh -C -D 10808 -L 0.0.0.0:10809:0.0.0.0:10809 root@72.5.34.25
echo 'ssh died,restart after ' $stime seconds
sleep $stime
done

```


# Generating Key Pairs

ssh-keygen -t rsa

#To copy the public key to a remote machine 1

ssh-copy-id suisuy@47.243.80.22

#now logging into the machine, without passwd needed:

ssh admin@suisuy.top

detail:

1:This will copy(append) the content of `~/.ssh/id_rsa.pub` into the `~/.ssh/authorized_keys` file on the remote
machine.

scp:

43.154.39.152

## ssh Port Forwarding

forward X server

ssh -X

install on remote

xorg-xauth xorg-xhost

install xorg-xauth on client

* in `/etc/ssh/sshd_config`:
* set `X11Forwarding` to *yes*
* verify that `AllowTcpForwarding` and `X11UseLocalhost` options are set to *yes*, and that `X11DisplayOffset` is set
to *10* (those are the default values if nothing has been changed,
see [sshd_config(5)](https://man.archlinux.org/man/sshd_config.5))
systemctl restart sshd

then use ssh -X root@host ,and set remote DISPLAY=:10


ssh -L local-port:remote-hostname:remote-port username@hostname

ssh -CD 10809 [root@72.5.34.25](mailto:root@72.5.34.25)

ssh -C -D 10808 -L 0.0.0.0:10809:0.0.0.0:10809 root@72.5.34.25

sshfs -C [root@72.5.34.25](mailto:root@72.5.34.25):/ tmp

fusermount -u /temp/user/harddrive

sshd no hostkeys available

ssh-keygen -A


steam

home/suisuy/.local/share/Steam/steamapps/compatdata

# ��tar�� stands for tape archive

```plain
tar cvzf file.tar.gz files #create verbos gzip filename

tar xzf  test.tar.gz  -C tmp/   #extrct to tmp
tar xvf file.tar.gz    #Extract to current dir

tar tf file.tar.gz #list content in tar


```


# user
useradd -m -s /bin/bash -G sudo testshell

echo "admin ALL=(ALL) ALL" > /etc/sudoers
%sudo  ALL=(ALL) NOPASSWD: ALL

# usermod

sudo usermod -aG group1,g2,g3 username

```plain
sudo usermod -g new_default_group_name username
sudo usermod -s /bin/zsh username
sudo usermod -d new_home_dir user_name
```

```plain
sudo usermod -l new_username old_username
```
You can [lock a user account in Linux](https://linuxhandbook.com/lock-unlock-user/) with usermod command option -L. A
locked user cannot log in to the system.
```plain
sudo usermod -L username
```
You can also unlock the user with option -U:
```plain
sudo usermod -U username
```

###
To set an expiry date to an user account, you can use the option -e with date in YYYY-MM-DD format.

```plain
sudo usermod -e 2020-04-01 username
```
You can change the [UID (user ID)](https://linuxhandbook.com/uid-linux/) of a user with the option -u:
```plain
sudo usermod -u UID username
```

# chown

To recursively change the owner and group of a directory and all its content, use the chown command like this:

```plain
chown -R user_name:group_name directory_name
```
You can use the same for changing the ownership of multiple folders:
```plain
chown -R user_name:group_name dir1 dir2
```





# vim

command

CocCommand

tabnine

CocConfig

edit file in .vim/coc-settings.json

# virt
## chroot

export MCHRMIRROR=http://deb.debian.org/debian
export MCHRARCH=arm64
export MCHRREL=buster
export MCHRDIR=/srv/chroot/${MCHRREL}-${MCHRARCH}
echo My chroot dir is ${MCHRDIR}

From here the further copy and paste stuff, preferable careful.

mkdir -p ${MCHRDIR}
#next step takes much more time
debootstrap --variant=buildd --arch=${MCHRARCH} ${MCHRREL} ${MCHRDIR} ${MCHRMIRROR}

#prevent that dpkg starts deamons in the chroot environment
cat > ${MCHRDIR}/usr/sbin/policy-rc.d <<EOF
#!/bin/sh
exit 101
EOF
chmod a+x ${MCHRDIR}/usr/sbin/policy-rc.d

#in the chroot "hard code" ischroot to true
cp  ${MCHRDIR}/bin/true ${MCHRDIR}/usr/bin/ischroot

cp /etc/hosts ${MCHRDIR}/etc/hosts
cp /etc/resolv.conf ${MCHRDIR}/etc/resolv.conf

#that was what needs be done only once

#mount stuff, you will need more often
mount --bind /dev ${MCHRDIR}/dev
mount --bind /dev/pts ${MCHRDIR}/dev/pts
mount --bind /proc  ${MCHRDIR}/proc

#you may also need (e.g. in Rescue mode of DebianInstaller)
mount --bind /sys  ${MCHRDIR}/sys
mount --bind /run  ${MCHRDIR}/run

#Okay

#Entering the chroot, leave it with exit

chroot ${MCHRDIR}
#enjoy your new environment
#apt install what you need
#do the thing you have in mind

Unmount

[ ! -z ${MCHRDIR} ] && echo my chroot dir is ${MCHRDIR}
[ ! -z ${MCHRDIR} ] && umount ${MCHRDIR}/proc
[ ! -z ${MCHRDIR} ] && umount ${MCHRDIR}/dev/pts
[ ! -z ${MCHRDIR} ] && umount ${MCHRDIR}/dev

#if you mounted these above
[ ! -z ${MCHRDIR} ] && umount ${MCHRDIR}/sys
[ ! -z ${MCHRDIR} ] && umount ${MCHRDIR}/run

## docker
```
docker run  -it --net host -v /mnt:/mnt --entrypoint bash <image-name-or-id>
docker run -rm  -it --net host -v /mnt:/mnt --entrypoint bash <image-name-or-id>



docker run --rm -it --entrypoint bash <image-name-or-id>

docker exec -it <container-name-or-id> bash
docker container ls -a
```
#-it instructs Docker to allocate a pseudo-TTY connected to the container’s stdin; creating an interactive bash shell in the container

# vnc
novnc and turbovnc
http://192.168.68.202:5801/vnc.html?host=192.168.68.202&port=5901&password=080797ssY&autoconnect=true&reconnect=true&compression=9&quality=9

vncserver -novnc novncdir

# vmware

Could not open /dev/vmmon: No such file or directory.

```plain
sudo vmware-modconfig --console --install-all
```


# virtual box usage

install then

modprobe vboxdrv
sudo /sbin/vboxconfig 
virtualbox-host-dkms


community/virtualbox-host-dkms
## mount shared foder owned by noroot

sudo mount -t vboxsf -o uid=$UID,gid=$(id -g) hh ~/hosthome/



## usb connection problem

1.first download and install virtualbox extension pack (very easy,virtualbox will install it when u double click the
pack)

2.then add the user to group vboxusers

sudo usermod -G vboxusers -a yourusername

3.finally reboot

4.open virtual system,when need,plug in usb dev,click upleft conner of the running box,choose devices,then choose
usb,the usb dev will apear here,choose it

androidx86

config

in general: type and version should be other

in display: controler shuld be vboxvga and enable 3d

## zram usage

```plain
modprobe zram num_devices=1
echo 8G > /sys/block/zram0/disksize
echo 8G > /sys/block/zram0/mem_limit
#echo 0 > /sys/block/zram0/mem_limit
mkfs.ext4 /dev/zram0



cat /sys/class/zram-control/hot_add
1
echo 0 > /sys/class/zram-control/hot_remove
cat /sys/block/zram0/max_comp_streams
zramctl
```


1) Load Module

```plain
modprobe zram num_devices=1



```




This creates 1 devices: /dev/zram{0}

2) Set max number of compression streams

Regardless of the value passed to this attribute, ZRAM will always allocate multiple compression streams - one per
online CPU - thus allowing several concurrent compression operations.

To find out how many streams are currently available:

```plain
cat /sys/block/zram0/max_comp_streams
```
3) Select compression algorithm
```plain
#show supported compression algorithms
cat /sys/block/zram0/comp_algorithm
lzo [lz4]

#select lzo compression algorithm zstd seems best
echo lzo > /sys/block/zram0/comp_algorithm
```
4) Set Disksize
```plain
# Initialize /dev/zram0 with 50MB disksize
echo $((50*1024*1024)) > /sys/block/zram0/disksize

# Using mem suffixes
echo 256K > /sys/block/zram0/disksize
echo 512M > /sys/block/zram0/disksize
echo 1G > /sys/block/zram0/disksize
```
Note: There is little point creating a zram of greater than twice the size of memory since we expect a 2:1 compression
ratio. Note that zram uses about 0.1% of the size of the disk when not in use so a huge zram is wasteful.
5) Set memory limit: Optional

```plain
# limit /dev/zram0 with 50MB memory
echo $((50*1024*1024)) > /sys/block/zram0/mem_limit

# Using mem suffixes
echo 256K > /sys/block/zram0/mem_limit
echo 512M > /sys/block/zram0/mem_limit
echo 1G > /sys/block/zram0/mem_limit

# To disable memory limit
echo 0 > /sys/block/zram0/mem_limit
```

6) Activate

```plain
mkswap /dev/zram0
swapon /dev/zram0

mkfs.ext4 /dev/zram1
mount /dev/zram1 /tmp
```
7) Add/remove zram devices
In order to add a new /dev/zramX device, perform a read operation on the hot_add attribute. This will return either the
new device��s device id (meaning that you can use /dev/zram<id>) or an error code.

    Example:

    ```plain
    cat /sys/class/zram-control/hot_add
    1
    ```
    To remove the existing /dev/zramX device (where X is a device id) execute:
    ```plain
    echo X > /sys/class/zram-control/hot_remove
    ```
    8) stat
    File /sys/block/zram<id>/mm_stat

        The mm_stat file represents the device��s mm statistics. It consists of a single line of text and contains the
        following stats separated by whitespace:

        |orig_data_size|uncompressed size of data stored in this disk. Unit: bytes|
        |:----|:----|
        |compr_data_size|compressed size of data stored in this disk|
        |mem_used_total|the amount of memory allocated for this disk. This includes allocator fragmentation and metadata
        overhead, allocated for this disk. So, allocator space efficiency can be calculated using compr_data_size and
        this statistic. Unit: bytes|
        |mem_limit|the maximum amount of memory ZRAM can use to store the compressed data|
        |mem_used_max|the maximum amount of memory zram has consumed to store the data|
        |same_pages|the number of same element filled pages written to this disk. No memory is allocated for such
        pages.|
        |pages_compacted|the number of pages freed during compaction|
        |huge_pages|the number of incompressible pages|
        |huge_pages_since|the number of incompressible pages since zram set up|

        # arch chroot

        ```plain
        mount --bind ./root.x86_64 ./root.x86_64
        ```
        then use
        arch-chroot

        or use


        root exec

        1

        ```plain
        tar xzf <path-to-bootstrap-image>/archlinux-bootstrap-*-x86_64.tar.gz --numeric-owner
            ```
            2
            ```plain
            mount --bind directory-to-livecd-or-bootstrap directory-to-livecd-or-bootstrap
            ```

            ./root.x86_64/bin/arch-chroot root.x86_64/

            or

            ```plain
            # mount --bind /tmp/root.x86_64 /tmp/root.x86_64
            # cd /tmp/root.x86_64
            # cp /etc/resolv.conf etc
            # mount -t proc /proc proc
            # mount --make-rslave --rbind /sys sys
            # mount --make-rslave --rbind /dev dev
            # mount --make-rslave --rbind /run run # (assuming /run exists on the system)
            # chroot /tmp/root.x86_64 /bin/bash
            ```

            3 in chroot

            ```plain
            # pacman-key --init
            # pacman-key --populate archlinux
            ```


            # shell

            #change default sh

            chsh -s $(which zsh)

            ```plain
            #useage: runf.sh 3 echo string
            #will run echo and rerun echo after 3 seconds again and agin
            sleep_duration=1;
            while true
            do
            $2 $3 $4 $5 $6 $5 $6 $7 $8 $9
            echo $2 " exit with ${?},restart after " $1 seconds
            sleep $1
            done
            ```

            >
            zsh ohmyzsh

            sh -c "$(curl -fsSL
            [https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh](https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh))"

            sh -c "$(wget -O-
            [https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh](https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh))"

            sh -c "$(fetch -o -
            [https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh](https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh))"

            # wayland

            XDG_SESSION_TYPE=wayland gnome-terminal

            zsh #reload zsh,not use source .zshrc

            |md|mkdir -p|
            |:----|:----|
            |rd|rmdir|
            |cd / ~|cd to your home directory|
            |..|cd ..|
            |...|cd ../..|
            |....|cd ../../..|
            |.....|cd ../../../..|
            |/|cd /|
            |d|dirs -v (lists last visited directories)|
            |cd +n|Switch to directory number n|
            |-|cd to last visited directory|
            |1|cd -1|
            |2|cd -2|
            |3|cd -3|
            |4|cd -4|
            |5|cd -5|
            |6|cd -6|
            |7|cd -7|
            |8|cd -8|
            |9|cd -9<br>|

            # Setup linux

            #necessary package

            base-devel wqy-microhei openssh git vim bash-completion fish screen w3m p7zip unrar rsync sshfs aria2
            proxychains tinyproxy firefox chromium xterm terminator

            ```plain
            #simple config bash screen,etc for easy usage
            echo -e "\n bind 'set completion-ignore-case on'\n bind 'set show-all-if-ambiguous on'\n bind
            '\C-p:menu-complete'\n" >> ~/.bashrc
            echo -e \
            "escape ^Jj \n\
            hardstatus alwayslastline \n\
            hardstatus string '%{gk}[%{wk}%?%-Lw%?%{=b kR}(%{W}%n*%f %t%?(%u)%?%{=b kR})%{=w}%?%+Lw%?%?
            %{g}][%{d}%l%{g}][ %{= w}%Y/%m/%d %0C:%s%a%{g} ]%{W}' \n\
            termcapinfo xterm* ti@:te@"\n\
            >~/.screenrc
            git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
            ~/.fzf/install
            ```

            echo -e "\nnet.ipv4.tcp_congestion_control=bbr\nnet.core.default_qdisc=cake \nnet.ipv4.ip_forward=1\n">>/etc/sysctl.conf && sysctl -p







            ```plain
            #basic packages
            sudo pacman -S
            sudo apt install openssh git nano screen w3m p7zip unzip unrar rsync sshfs bash-completion
            sudo dnf install
            base-devel wqy-microhei
            openssh git nano screen w3m p7zip unrar rsync sshfs bash-completion fish

            #gui app
            xfce4-terminal xterm dolphin konsole copyq chromium firefox

            #else
            iputils-ping
            ```






            # common app

            gwinview


# short

```plain

aria2c --enable-rpc --rpc-listen-all

xfreerdp /u:Administrator /p:a /v:192.168.68.11 +fonts    /clipboard /home-drive  /sound:latency:40
echo 1 > /proc/sys/net/ipv4/ip_forward

/home/suisuy/.local/share/applications/

/usr/share/applications/

/home/suisuy/.local/share/applications/wine/Programs/7-Zip


/etc/xdg/xfce4/xfconf/xfce-perchannel-xml/xfce4-session.xml
 ~/Android/Sdk/emulator -avd Galaxy_Nexus_API_19
sudo chown $(whoami) -R /dev/kvm

#!/data/data/com.termux/files/usr/bin/sh

unset LD_LIBRARY_PATH LD_PRELOAD

PATH=$PATH:/system/bin exec /system/bin/ping "$@"

cat /etc/NetworkManager/system-connections/suiwifi2.nmconnection 

ln -s file1 link1
chown suisuy:suisuy file1
scp vimbk suisuy@43.154.39.152:~/vimbk.tar.gz
#adb and scrcpy
adb tcpip 5555 #enable tcp debug
scrcpy -Sw --shortcut-mod=rsuper --disable-screensaver --tcpip=rq3
scrcpy -SKw --tcpip=192.168.100.4 --shortcut-mod=rsuper --disable-screensaver --bit-rate 1M --max-size 1280

setxkbmap -layout us -option
setxkbmap -option caps:swapescape
setxkbmap -option caps:tab
echo freeze > /sys/power/state
showkey --scancodes
sudo xinput reattach 18 3
sudo xinput float 18
xinput list
mkpkg --skippgpcheck -sri
pacman -Syu pkg1 #install
pacman -Ss string1 #search both name and description
pacman -Qi #list all installed with extra info
pacman -Qs string1 string2 #search installed, use above instead
pacman -Rs#remove a package and its dependencies
pacman -Rsc package_name #dependencies and all the packages that depend on the target package:
pacman -U yourfile.zst
sudo pacman-mirrors -i -c China -m rank
expac "%n %m" -l'\n' -Q $(pacman -Qq) | sort -rhk 2 | less

rsync --progress largefile.gz somewhere/else/ #cp with speed display
kill -9 -1 #logou de
chromium --proxy-server="//ruby.l:10808"
sudo virsh net-start default
rsync -ah --progress source destination
xzcat test.img.xz | dd of=/dev/mmcblk2 bs=1M status=progress oflag=dsync
losetup -f -P sda.img #mount img file
setxkbmap -option "caps:swapescape"



edge -r -z1 -c suinet -k 080797ssY -a 192.168.100.110 -f -l 15.152.37.220:7777 
http-server -a :: #listen on both ipv4 and ipv6 addr


xrandr --listproviders
Xvfb :0 -screen 0 1600x900x24 &
export DISPLAY=:0

lspci -nnv
prime-run glxspheres64 
glxinfo | grep OpenGL
vblank_mode=0 DRI_PRIME=1 glxgears -fullscreen -info | grep "GL_RENDER\|FPS" 
DISPLAY=:1 QT_QPA_PLATFORM=wayland kwrite
QT_QPA_PLATFORM=xcb /usr/bin/kfontview

sudo apt-get install xfce4 --no-install-recommends fonts-arphic-uming fonts-arphic-ukai

```
