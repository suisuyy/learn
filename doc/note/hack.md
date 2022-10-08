

# android chroot
```

/dev/shm is a public shared memory directory,

## net

groupadd -g 3001 aid_bt
groupadd -g 3002 aid_bt_net
groupadd -g 3003 aid_inet
groupadd -g 3004 aid_net_raw
groupadd -g 3005 aid_admin
usermod -a -G 3001,3002,3003,3004,3005 root

edit /etc/passwd look up "_apt", change the value of group from 65534 to 3003 enter image description here, more magic group:

# example chroot user on android in ubport
uid=32011(phablet) gid=32011(phablet) groups=32011(phablet),4(adm),5(tty),20(dialout),24(cdrom),27(sudo),30(dip),44(video),46(plugdev),1001(radio),1002(bluetooth),1003(android_graphics),1004(android_input),1005(audio),1013(android_media),1015(sdcard_rw),1021(gps),2001(android_cache),3002(android_net3),3003(android_net),3004(android_net2),9997(android_nvram)



```

# mi8 android docker test
```
Android needs kernel support to run docker
install termux  https://f-droid.org/en/packages/com.termux/

Update termux
apt update && apt upgrade -y
pkg install root-repo

Installation Dependencies
pkg install golang make cmake ndk-multilib tsu tmux docker

Compilation tini
cd $TMPDIR/docker-build
wget https://github.com/krallin/tini/archive/v0.19.0.tar.gz
tar xf v0.19.0.tar.gz
cd tini-0.19.0
mkdir build
cd build
cmake -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=$PREFIX ..
make -j8
make install
ln -s $PREFIX/bin/tini-static $PREFIX/bin/docker-init


Start up docker
sudo mount -t tmpfs -o uid=0,gid=0,mode=0755 cgroup /sys/fs/cgroup

sudo dockerd --iptables=false

Is the test docker running normally?
sudo docker run hello-world 

sudo docker run --network host --name nginx nginx:latest
Enter in the browser http://localhost:80

Execute the following command to pull the latest image of Ubuntu
sudo docker pull ubuntu
Execution of other versions sudo docker pull ubuntu:22.10

View the locally pulled mirrors with the following command
sudo docker images

Execute the following command to run an Ubuntu container.
sudo docker run -it --net host --dns 8.8.8.8 ubuntu
Execution of other versions sudo docker run -it --net host --dns 8.8.8.8 ubuntu:22.10

There is no net in the container. Commonly found in the Debian system, executed in a container
echo "nameserver 8.8.8.8"> /etc/resolv.conf
groupadd -g 3003 aid_inet && usermod -G nogroup -g aid_inet _apt 

apt install neofetch

apt-get update   Update Source

apt-get -f install   Fix Dependency

apt-get upgrade    Update Installed Packages [Program]

apt-get dist-upgrade   Upgrade System

apt autoremove   Clean up system residues

sudo docker ps -a  View containers in operation

sudo docker pull    Pull the Ubuntu image from Docker Hub.

sudo docker run    Create a container.

sudo docker start    Runs a stopped container.

sudo docker attach    Enter a running container.

sudo docker stop    Stops a container in the cloud.

sudo docker rm    Delete a container.

```

# ubports dipper

https://docs.ubports.com/en/latest/userguide/dailyuse/libertine.html
https://docs.ubports.com/en/latest/?pk_vid=62c130ed61d5dd391661311603e6432f
https://wiki.ubuntu.com/Touch/Libertine
http://kriscode.blogspot.com/2016/09/x-applications-on-ubuntu-phone.html

  /usr/share/applications/chromium-browser.desktop   ~/.local/share/applications/ 

  sudo apt-get -q -y install maliit-inputcontext-gtk3 maliit-inputcontext-gtk2


X-Ubuntu-Touch=true
 X-Ubuntu-XMir-Enable=true
 Terminal=false
 Type=Application




problem 
root filesystem too small



faq

What is Halium? angle-icon

Halium is the collaborative project to unify the Hardware Abstraction Layer for projects which run GNU/Linux on mobile devices with pre-installed Android. What this means is quicker development and launches of Ubuntu Touch on halium based android devices. None of our existing devices will run halium since it doesn't really make sense from a development stand point. Ubuntu Touch is being actively developed to run on vanilla Halium but isn't ready yet.

