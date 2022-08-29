# linuxnote

# toc

- [linuxnote](#linuxnote)
- [toc](#toc)
- [doc url](#doc-url)
- [quicknote](#quicknote)
- [short](#short)
- [startup](#startup)
  - [debian](#debian)
  - [arch](#arch)
- [useage](#useage)
  - [autolaunch](#autolaunch)
    - [autolanuch at login](#autolanuch-at-login)
  - [bash](#bash)
  - [backup](#backup)
  - [benchmark](#benchmark)
  - [disk](#disk)
      - [dd and disk speed](#dd-and-disk-speed)
      - [parted](#parted)
      - [resize](#resize)
  - [boot](#boot)
    - [grub](#grub)
  - [browser](#browser)
    - [firefox](#firefox)
  - [net](#net)
    - [status](#status)
    - [bbr](#bbr)
    - [route](#route)
    - [doh](#doh)
    - [dns](#dns)
  - [Disk](#disk-1)
  - [email web](#email-web)
  - [config](#config)
  - [docker](#docker)
  - [for loop:](#for-loop)
  - [firefox](#firefox-1)
  - [gnome](#gnome)
  - [mount devices](#mount-devices)
  - [nvm npm](#nvm-npm)
  - [proxy](#proxy)
  - [password](#password)
  - [qt](#qt)
    - [pipewire](#pipewire)
  - [.profile](#profile)
  - [remote desktop](#remote-desktop)
  - [screen](#screen)
  - [setting](#setting)
  - [](#)
  - [security](#security)
  - [system monitor](#system-monitor)
  - [sound](#sound)
  - [ssh](#ssh)
    - [ssh Port Forwarding](#ssh-port-forwarding)
  - [‘tar’ stands for tape archive](#tar-stands-for-tape-archive)
  - [user](#user)
  - [usermod](#usermod)
    - [](#-1)
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



# doc url



# quicknote

/home/suisuy/.local/share/applications/

/usr/share/applications/

/home/suisuy/.local/share/applications/wine/Programs/7-Zip

```plain
/etc/xdg/xfce4/xfconf/xfce-perchannel-xml/xfce4-session.xml
```
 ~/Android/Sdk/emulator -avd Galaxy_Nexus_API_19
sudo chown $(whoami) -R /dev/kvm

#!/data/data/com.termux/files/usr/bin/sh

unset LD_LIBRARY_PATH LD_PRELOAD

PATH=$PATH:/system/bin exec /system/bin/ping "$@"

cat /etc/NetworkManager/system-connections/suiwifi2.nmconnection 




# short

```plain
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



edge -r -z1 -c suinet -k 080797ssY -a 192.168.100.11 -f -l 15.152.37.220:7777 -Ee -A2
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


# startup
## debian
apt install -y fonts-wqy-zenhei openssh git vim bash-completion screen w3c aria2 p7zip unrar rsync sshfs tinyproxy  

apt install dbus-x11 xfce4  xfce4-terminal firefox-esr chromium 

## arch

#setup mirror to china

sudo pacman-mirrors -c China

#necessary package

wqy-microhei base-devel openssh git vim bash-completion screen w3c aria2 p7zip unrar rsync sshfs tinyproxy   proxychains gnome-terminal firefox chromium 


#start up package

pacstrap /mnt base linux linux-firmware intel-ucode vi grub efibootmgr bash-completion
[wqy-microhei](https://archlinux.org/packages/?name=wqy-microhei) openssh vim man ncdu netcat xfce4-terminal

arm repo

```plain
Server = https://mirrors.ustc.edu.cn/archlinuxarm/$arch/$repo
```



# useage



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

>[Unit]
>Description=test message systemd service.
>[Service]
>Type=simple
>ExecStart=/bin/bash /home/suisuy/test.sh
>[Install]
>WantedBy=multi-user.target
systemctl enable --now test

sudo systemctl restart test.service




adb

fastboot

adb reboot

重启到Recovery界面

adb reboot recovery

重启到bootloader界面

adb reboot bootloader





## bash

```bash
echo -e "\n bind 'set completion-ignore-case on'\n bind 'set show-all-if-ambiguous on'\n bind '\C-p:menu-complete'\n" >>~/.bashrc

echo -e \
"escape ^Jj \n\
hardstatus alwayslastline \n\
hardstatus string '%{gk}[%{wk}%?%-Lw%?%{=b kR}(%{W}%n*%f %t%?(%u)%?%{=b kR})%{=w}%?%+Lw%?%? %{g}][%{d}%l%{g}][ %{=w}%Y/%m/%d %0C:%s%a%{g} ]%{W}' \n\
termcapinfo xterm* ti@:te@"\n\
>~/.screenrc

git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
~/.fzf/install


```



## backup

cd ~

tar cfzv homebk.tar.gz .ssh .bashrc app/bin .gitconfig .proxychains .screenrc .profile

`tar cvpjf backup.tar.bz2 --exclude-from=excl /`

#etc

/etc/profile.d/tools.sh

```plain
screen -S copyq -dm bash -c 'copyq ; '
screen -S utools -dm bash -c 'utools; '
screen -S xfterm -dm bash -c 'xfce4-terminal; '
screen -S gterm -dm bash -c 'gnome-terminal; '

screen -S sshf -dm bash -c '~/.ssh/sshf; '
screen -S mountsda3 -dm bash -c 'sudo mount /dev/sda3 ~/mnt/sda3; bash '
screen -S mountsdb4 -dm bash -c 'sudo mount /dev/sdb4 ~/mnt/ntfs; bash'
screen -S vndefault -dm bash -c 'sudo virsh net-start default; '
```


## benchmark

```plain
7z b -mmt1

#get 1865 for sd845 ,double point for ruby
```




## disk
#### dd and disk speed

#for ntfs not mount it use -o sync

#write speed

sudo umount tmp ;sudo mount /dev/sdb4  tmp  -o rw,sync && dd if=/dev/zero of=tmp/testspeed bs=20M oflag=dsync
status=progress count=10;sudo umount tmp

#write and read speed of sdb4

export DEVICE='/dev/sdb4';\

export MOUNT='mount ';\

export BUFSIZE="10M";\

export COUNT="10";\

\

mkdir -p tmp;\

umount tmp;\

${MOUNT} ${DEVICE}  tmp   &&

echo write&&

dd if=/dev/zero of=tmp/testspeed bs=${BUFSIZE} oflag=dsync status=progress count=${COUNT}&&\

echo drop caches &&

echo 3 > /proc/sys/vm/drop_caches &&

echo read &&

dd if=tmp/testspeed of=/dev/null iflag=fullblock status=progress  bs=${BUFSIZE} count=${COUNT}  &&\

umount tmp





dd bs=4M if=testimg of=/dev/sdx conv=fsync oflag=direct status=progress

dd if=/dev/zero of=testspeed bs=20M oflag=dsync status=progress count=50

dd if=testspeed of=/dev/null bs=200M oflag=dsync status=progress count=5

#oflag=dsync will

Use synchronized I/O for data. For the output file, this **forces a physical write of output data on each write**. For
the input file, this flag can matter when reading from a remote file that has been written to synchronously by some
other process. Metadata (e.g., last-access and last-modified time) is not necessarily synchronized.

-sync likewise, but also for metadata

#### parted
```
cp /sdcard/parted /sbin/ && chmod 755 /sbin/parted
umount /data && umount /sdcard
parted /dev/block/sda
p free
rm 17 #17是userdata分区号 
mkpart esp fat32 6559MB 7000MB
mkpart pe fat32 7000MB 10000MB
mkpart win ntfs 10000MB 70GB
mkpart userdata ext4 70GB 125GB

#设置17分区为esp分区，这步很重要
set 17 esp on
quit  #save and quit
name 48  newlablename
resize2fs -f /dev/sda23

```

#### resize
sudo -s
dd if=/dev/null of=/userdata/ubuntu.img bs=1M seek=6000 count=0
resize2fs -f /userdata/ubuntu.img                                            
reboot




## boot

### grub

```plain
grub-mkconfig -o /boot/grub/grub.cfg
```

## browser

### firefox

addon collection

tool

17271106

[https://addons.mozilla.org/en-US/firefox/collections/17271106/tools/edit/?page=1&collection_sort=-added](https://addons.mozilla.org/en-US/firefox/collections/17271106/tools/edit/?page=1&collection_sort=-added)

## net
### status

netstat -tulpn #show port
nload -u M  wlan0

### bbr

```plain
#superuser needed
#check
sysctl net.ipv4.tcp_available_congestion_control
sysctl net.ipv4.tcp_congestion_control

#enable temperately
sysctl -w net.ipv4.tcp_congestion_control=bbr
sysctl -w net.core.default_qdisc=cake
```

#enable perment

echo -e "\nnet.ipv4.tcp_congestion_control=bbr\nnet.core.default_qdisc=cake " >>/etc/sysctl.conf && sysctl -p

```plain
#or edit /etc/sysctl.conf append this then use sysctl -p
net.core.default_qdisc=cake
net.ipv4.tcp_congestion_control=bbr

```


### route



### doh
https://github.com/AdguardTeam/dnsproxy

https://dns.sb/guide/doh/linux/#_1-install-dns-proxy

sudo apt install dnsproxy





### dns
fast temp set dns server:

echo -e "\

search lan \n\

nameserver 8.8.8.8\n\

">/etc/resolv.conf

echo -e "\n\ndns now is:" &&cat /etc/resolv.conf

iperf3

udp

`iperf3 -s`

iperf3 -c 192.168.68.174   -b 200m -P 16

`iperf3 -c ruby -u`

`iperf3 -c ruby -P 3`

`iperf3 -c ruby -P 3 -t 30` #30 second

```plain
-l, --length #[KMG] length of buffer to read or write
(default 128 KB for TCP, dynamic or 1460 for UDP)
```


tcp

`iperf3 -s`

`iperf3 -s -p 2323`

`iperf3 -c ruby -p 2323`




## Disk

#use parted

parted /dev/block/sda

rm 23

mkpart aboot fat32 53GB 54GB

mkpart userdata ext4 54GB 59GB

set 23 esp on 


## email web

#start at port 8888, use http://localhost:8888?admin with passwd 12345 to config enable qq mail,bad gmail seems not work

docker run --name rainloop --net host hardware/rainloop

#then can restart with

docker container restart rainloop



## config

i3 .config/i3/conf

```plain
bindsym Mod1+Tab workspace next
bindsym Mod1+Shift+Tab workspace prev
```

xfce4

```plain
/etc/xdg/xfce4/xfconf/xfce-perchannel-xml/xfce4-session.xml
```

## docker

```plain
#basic cmd
sudo docker container ls -a
docker kill $(docker ps -q)

docker exec my-tl-demo tlcfg add-user myuser mypassword

docker run -it --shm-size=512m --net host --entrypoint /bin/bash

docker run --rm  -it --shm-size=512m --net host --entrypoint /bin/bash
docker commit 5a8f89adeead newimagename
docker run -ti -v "$PWD/somedir":/somedir newimagename /bin/bash

sudo docker run -it --shm-size=512m --net host -v /data/docker/run/:/var/run  --entrypoint /bin/bash mydebian


sudo docker run --rm  -it --shm-size=512m -p 6901:6901 -e VNC_PW=password kasmweb/ubuntu-focal-desktop:develop

sudo docker run --rm  -it --shm-size=512m -p 6901:6901 -e VNC_PW=password --entrypoint /bin/bash kasmweb/ubuntu-focal-desktop:1.11.0




#check if run in docker
if [[ ! $(cat /proc/1/sched | head -n 1 | grep init) ]]; then {
echo in docker
} else {
echo not in docker
} fi

#simple use
docker run --rm --name oc-eval -d -e OWNCLOUD_DOMAIN=localhost:8080 -p8080:8080 owncloud/server
docker ps
docker kill oc-eval
docker rm oc-eval


```



file

touch -t 12091600 myfile

This sets the myfile file's timestamp to 4 p.m., December 9th (12 09 1600).


cat Used for viewing files that are not very long; it does not provide any scroll-back.

tac Used to look at a file backwards, starting with the last line.

less Used to view larger files because it is a paging program. It pauses at each screen full of text, provides
scroll-back capabilities, and lets you search and navigate within the file.

NOTE: Use / to search for a pattern in the forward direction and ? for a pattern in the backward direction. An older
program named more is still used, but has fewer capabilities: "less is more".

tail -n 15 Used to print the last 10 lines of a file by default. You can change the number of lines by doing -n 15 or
just -15 if you wanted to look at the last 15 lines instead of the default.

head The opposite of tail; by default, it prints the first 10 lines of a file.

disk

important dir

/usr/share/applications #application shortcut put here











## for loop:

for z in *.7z; do 7z x "$z" -p'1346' ; done


## firefox

enable **clipboard api and addon collection**

open about:config

set dom.events.testing.asyncClipboard to true

enable ssb

network.cookie.sameSite.laxByDefault false

## gnome

use dash to panel to make left task bar

**use**Clipboard Indicator to manage clipboard

## mount devices

sudo mount -o uid=$UID,gid=$(id -g) /dev/zram0 ~/ramdisk #mount zram0 at ~/ramdisk for noroot user

#make directory mount as suisuy

sudo mount directory -o sync #turn of write buffering

sudo chown -R suisuy:suisuy directory/

sudo umount directory

sudo mount directory

mount -o remount,rw / #remount / with read and write permission

ramdisk

mount -t tmpfs -o uid=1000,gid=1000,size=4G tmpfs ramdisk/


sudo mkfs.btrfs -L data /dev/sdb1

sudo mount -o compress=zstd:10 /dev/sdb1 /data

sudo mount -o compress=lzo /dev/sdb1 /data




```plain




#mount img
losetup -f -P sda.img
```



mounting your hard drives use `-o sync` which will turn off write buffering

## nvm npm

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
## proxy

```plain
export HTTP_PROXY=http://localhost:10809 #this only works for http url,seems odd
export all_proxy=http://localhost:10809

proxy.py
proxy --port 10801 --host 192.168.100.2

```


docker

```plain
docker run -dp 3000:3000 \-w /app -v "$(pwd):/app" \
```

## password

make sudo without passwd

## qt

export QT_AUTO_SCREEN_SCALE_FACTOR=1

export QT_SCREEN_SCALE_FACTORS=1.5

### pipewire

```plain
pactl load-module module-native-protocol-tcp listen=0.0.0.0
PULSE_SERVER=tcp:localhost:4713 pactl info
export PULSE_SERVER=tcp:127.0.0.1:4713
```

pushd folder1 #

dirs #display The list of directories is displayed with the dirs command.

popd #send you back to those directories

## .profile

因为screen是交互的，在profile用一般会立即退出，要使用

类似screen -S name -dm bash -c '~/.ssh/sshf; exec bash'保持screen运行

## remote desktop
turbovnc novnc
install them



## screen

screen->session->window

~/.screenrc



```bash
#change keybind to ctrl + j
escape ^Jj
hardstatus alwayslastline 
hardstatus string '%{gk}[%{wk}%?%-Lw%?%{=b kR}(%{W}%n*%f %t%?(%u)%?%{=b kR})%{=w}%?%+Lw%?%? %{g}][%{d}%l%{g}][ %{=
w}%Y/%m/%d %0C:%s%a%{g} ]%{W}'
termcapinfo xterm* ti@:te@

#change ctl a to ctl j,enale status bar at botton, make scroolable
```


```bash
echo -e \
"escape ^Jj \n\
hardstatus alwayslastline \n\
hardstatus string '%{gk}[%{wk}%?%-Lw%?%{=b kR}(%{W}%n*%f %t%?(%u)%?%{=b kR})%{=w}%?%+Lw%?%? %{g}][%{d}%l%{g}][ %{=w}%Y/%m/%d %0C:%s%a%{g} ]%{W}' \n\
termcapinfo xterm* ti@:te@"\n\
>~/.screenrc
```




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

#outside session

use Ctrl+d to dettach the session

screen -r [id]

1. `screen``-v`
2. `screen``-S name #start session use name`
3. ctrl + a ,c creat newsession
4. `ctrl + a ," 显示所有session`
`Ctrl-A` 和 `d``从当前的 screen 会话中分离`

`screen``-``ls #ls all session`

1. `screen``-r #return to last closed session`
2. `screen``-r``7934 #return to session id7934`
3. `screen``-r -S sessionname #return to session use name`
中止 screen 会话。你可以按下 `Ctrl+d`，或者在命令行中使用 `exit` 命令

ctrl a,esc enable copy mode for scroll


screen -r id1234

screen

 screen -XS 20411 quit

screen -ls

ctrl + a ," 显示所有session

press and release Ctrl+a and then press Shift+a 重命名session

1. `screen -ls 显示进程列表`
2. `screen -r sid 恢复某个进程`
3. `screen -X -S sid quit 终止某个进程`
4. `screen -S my_screen_name 修改会话名称`
5. `ctrl+a d 离开当前进程`
6. `ctrl+a k 终止当前进程`
## setting

screen resolution

xrandr -q #get all setable resolution

xrandr -s 1920x1080 #set one

##
## security

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

## system monitor

#disk

sudo apt-get install sysstat ncdu

iostat -m 1 #disk monitor -m means MB/s, 1 mean update 1 /s

ncdu / #easy get disk usage

#network

nload -u M -t 1000 # net monitor -t 1000 meanse 1/s use down to change devices

#process port

lsof -i :3001 #show process use port

top -p 0 -e m #show a process pid 0 mem usage



## sound

no sound after suspend

```plain
echo 1 > /sys/bus/pci/devices/0000:00:1f.3/remove
echo 1 > /sys/bus/pci/rescan
amixer -D pulse sset Master toggle
amixer -D pulse sset Master toggle

or use this bash shell
#!/bin/bash

#make sure Audio always actived
sudo sh -c 'echo 1 >/sys/bus/pci/rescan'
sleep 1
DEVICE_ID=$(lspci -D | grep Audio | awk '{print $1}')
sleep 1
sudo sh -c 'echo 1 >/sys/bus/pci/devices/0000:00:1f.3/remove'
sleep 1
sudo sh -c 'echo 1 >/sys/bus/pci/rescan'
sleep 1

amixer -D pulse sset Master mute
sleep 1
amixer -D pulse sset Master unmute
```


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

source命令（从 C Shell 而来）是bash shell的内置命令。点命令，就是一个点符号，（从Bourne
Shell而来）是source的另一名称。这两个命令都以一个脚本为参数，该脚本将作为当前shell的环境执行，即不会启动一个新的子进程。所有在脚本中设置的变量将成为当前Shell的一部分。



## ssh

chmod 0600 .ssh/*

~/.ssh/config

```plain
ServerAliveInterval 1
ServerAliveCountMax 2
```
restart sshd
/usr/bin/sshd -p 2222

or

systemctl restart sshd

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


# Generating Key Pairs

ssh-keygen -t rsa

#To copy the public key to a remote machine 1

ssh-copy-id suisuy@47.243.80.22

#now logging into the machine, without passwd needed:

ssh admin@suisuy.top

detail:

1:This will copy(append) the content of `~/.ssh/id_rsa.pub` into the `~/.ssh/authorized_keys` file on the remote
machine.

scp:

43.154.39.152

### ssh Port Forwarding

forward X server

ssh -X

install on remote

xorg-xauth xorg-xhost

install xorg-xauth on client

* in `/etc/ssh/sshd_config`:
* set `X11Forwarding` to *yes*
* verify that `AllowTcpForwarding` and `X11UseLocalhost` options are set to *yes*, and that `X11DisplayOffset` is set
to *10* (those are the default values if nothing has been changed,
see [sshd_config(5)](https://man.archlinux.org/man/sshd_config.5))
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

## ‘tar’ stands for tape archive

```plain
tar cvzf file.tar.gz files #create verbos gzip filename

tar xzf  test.tar.gz  -C tmp/   #extrct to tmp
tar xvf file.tar.gz    #Extract to current dir

tar tf file.tar.gz #list content in tar


```


## user
useradd -m -s /bin/bash -G sudo testshell

echo "admin ALL=(ALL) ALL" > /etc/sudoers
%sudo  ALL=(ALL) NOPASSWD: ALL

## usermod

sudo usermod -aG group1,g2,g3 username

```plain
sudo usermod -g new_default_group_name username
sudo usermod -s /bin/zsh username
sudo usermod -d new_home_dir user_name
```

```plain
sudo usermod -l new_username old_username
```
You can [lock a user account in Linux](https://linuxhandbook.com/lock-unlock-user/) with usermod command option -L. A
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
You can change the [UID (user ID)](https://linuxhandbook.com/uid-linux/) of a user with the option -u:
```plain
sudo usermod -u UID username
```

## chown

To recursively change the owner and group of a directory and all its content, use the chown command like this:

```plain
chown -R user_name:group_name directory_name
```
You can use the same for changing the ownership of multiple folders:
```plain
chown -R user_name:group_name dir1 dir2
```





## vim

command

CocCommand

tabnine

CocConfig

edit file in .vim/coc-settings.json

## virt
### chroot

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

### docker
```

docker exec -it <container-name-or-id> bash
docker run --rm -it --entrypoint bash <image-name-or-id>
docker container ls -a
```


## vnc
novnc and turbovnc
http://192.168.68.202:5801/vnc.html?host=192.168.68.202&port=5901&password=080797ssY&autoconnect=true&reconnect=true&compression=9&quality=9

vncserver -novnc novncdir

## vmware

Could not open /dev/vmmon: No such file or directory.

```plain
sudo vmware-modconfig --console --install-all
```


## virtual box usage

install then

modprobe vboxdrv

### mount shared foder owned by noroot

sudo mount -t vboxsf -o uid=$UID,gid=$(id -g) hh ~/hosthome/



### usb connection problem

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

### zram usage

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
new device’s device id (meaning that you can use /dev/zram<id>) or an error code.

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

        The mm_stat file represents the device’s mm statistics. It consists of a single line of text and contains the
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

        ## arch chroot

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


            ## shell

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

            ## wayland

            XDG_SESSION_TYPE=wayland gnome-terminal

            zsh #reload zsh,not use source .zshrc

            |md|mkdir -p|
            |:----|:----|
            |rd|rmdir|
            |cd / ~|cd to your home directory|
            |..|cd ..|
            |...|cd ../..|
            |....|cd ../../..|
            |.....|cd ../../../..|
            |/|cd /|
            |d|dirs -v (lists last visited directories)|
            |cd +n|Switch to directory number n|
            |-|cd to last visited directory|
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

            echo -e "\nnet.ipv4.tcp_congestion_control=bbr\nnet.core.default_qdisc=cake \nnet.ipv4.ip_forward=1\n"
            >>/etc/sysctl.conf && sysctl -p







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