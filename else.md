# else
- [tmp](#tmp)
- [benchmark](#benchmark)
- [net bandwidth](#net-bandwidth)
- [fig failed to test](#fig-failed-to-test)
- [route](#route)
  - [common cmd](#common-cmd)
  - [iptables](#iptables)
  - [zerotier](#zerotier)
  - [config a common linux desktop as router](#config-a-common-linux-desktop-as-router)
    - [Technical Overview](#technical-overview)
- [rclone](#rclone)
- [rsync](#rsync)
- [dns](#dns)
- [windows](#windows)
- [power](#power)
- [wired problem](#wired-problem)
- [kali](#kali)
- [end](#end)


# intel vgpu
 cat /proc/cmdline
lsmod | grep 'vf'
uuidgen
c14cab13-1b82-45b4-80fa-e0897e4d4463

https://cetteup.com/216/how-to-use-an-intel-vgpu-for-plexs-hardware-accelerated-streaming-in-a-proxmox-vm/

BOOT_IMAGE=/boot/vmlinuz-5.15.0-53-generic root=UUID=1f5fc5d2-abcf-4090-a20d-670beff95cfc ro quiet splash intel_iommu=on iommu=pt i915.enable_gvt=1 vt.handoff=7

#/etc/module
/etc/modules.

# Modules required for PCI passthrough
vfio
vfio_iommu_type1
vfio_pci
vfio_virqfd

# Modules required for Intel GVT
kvmgt
exngt
vfio-mdev

update-initramfs -u -k all

 lspci -nnv | grep VGA
00:02.0 VGA compatible controller [0300]: Intel Corporation UHD Graphics 620 [8086:5917] (rev 07) (prog-if 00 [VGA controller])
00:02.0
lspci -D -nn | grep VGA
0000:00:02.0 VGA compatible controller [0300]: Intel Corporation UHD Graphics 620 [8086:5917] (rev 07)

export GVT_DOM='0000:00'
export GVT_PCI='0000:00:02.0'
export GVT_GUID=c14cab13-1b82-45b4-80fa-e0897e4d4463
export GVT_TYPE=i915-GVTg_V5_4

/sys/devices/pci0000\:00/0000\:00\:02.0
#video memory  123 512 1900x1200
i915-GVTg_V5_4


# Autologin
SDDM supports automatic login through its configuration file, for example:
seems only work for plasma
/etc/sddm.conf.d/autologin.conf
[Autologin]
User=john
Session=plasma


# lxc
sudo apt install lxc
lxc-create -n playtime -t download -- --dist archlinux --release current --arch amd64
#lxc-create -n playtime -t download



# grub boot iso
 #下载镜像至根目录
 cd /
 wget https://mirrors.tuna.tsinghua.edu.cn/archlinux/iso/latest/archlinux-2020.02.01-x86_64.iso
 #重命名为 arch.iso
 mv arch* arch.iso
 #编辑GRUB配置文件，加入 arch.iso 启动项（部分系统的该文件路径为 /boot/grub2/grub.cfg ）
 #编辑 /boot/grub/grub.cfg，在与下面结构类似的第一个 menuentry 前，添加下面的内容。（搜索“menuentry（空格）”的第一个匹配项）
 vim /boot/grub/grub.cfg
 #配置600秒的GRUB等待时长，“vda1”项根据主机“fdisk -l”命令查看，视情况更改
 #花括号内的缩进为一个Tab键
 set timeout=600
 menuentry "Archlinux Live (x86_64)" {
     insmod iso9660
     set isofile=/arch.iso
     loopback lo0 ${isofile}
     linux (lo0)/arch/boot/x86_64/vmlinuz archisolabel=ARCH_202002 img_dev=/dev/vda1 img_loop=${isofile} earlymodules=loop
     initrd (lo0)/arch/boot/x86_64/archiso.img
 }

# autofs not used ,too hard to config,use script instead
#/etc/auto.master
/autofs   /etc/auto.ext --timeout=10,defaults,user,exec,uid=1000
#/etc/auto.ext
kbmain   -fstype=auto    :/dev/nvme0n1p3







# mount samba
mkdir /mnt/jdsmb
sudo chown suisuy jdsmb/

sudo apt-get install cifs-utils

sudo mount -t cifs -o rw,guest,vers=1.0 //192.168.1.1/Fab-EXT4 /media/MichelNAS/
sudo mount -t cifs -o rw,guest,vers=2.0 //172.22.22.1/sda2 /mnt/jdsmb
sudo mount -t cifs -o rw,guest,vers=1.0,defaults,uid=suisuy //172.22.22.1/sda2 /mnt/jdsmb && sudo chmod 777 /mnt/jdsmb

# vv ws tls
https://github.com/suisuyy/sbox.git


#caddy
sudo ./caddy reverse-proxy --from awsg.suisuy.eu.org:443 --to :80
#Caddyfile
example.com {
  reverse_proxy 127.0.0.1:5244
}


#vv
sudo ./v2ray -config wsserver.json 


#  vnc novnc tigervnc
https://coredump.ws/index.php?dir=code&post=NoVNC_with_audio


4713 pulseaudio default port,
10101  tcpulse listening port  //audio redirect server port 
8080 websocketfy port  //seem must be 8080, or chrome will deny to connect


only stream audio step:
 ./audio 0.0.0.0 10101
./websockify 0.0.0.0:8080 0.0.0.0:10101 --cer ./cert.pem --key key.pem 
open saudio/test.html and click start 


#install dependencies
sudo apt install build-essential libssl-dev
sudo apt install gstreamer1.0-plugins-bad

#start vncserver
x0vncserver -localhost no   :0 
vncserver -localhost no  -geometry 1600x900  -xstartup  ~/.vnc/xstartup


python3 -m http.serve




# kvm ubuntu
sudo apt -y install bridge-utils cpu-checker libvirt-clients libvirt-daemon qemu qemu-kvm virt-manager
kvm-ok
sudo virt-install --name ubuntu-guest --os-variant ubuntu20.04 --vcpus 2 --ram 2048 --location http://ftp.ubuntu.com/ubuntu/dists/focal/main/installer-amd64/ --network bridge=virbr0,model=virtio --graphics none --extra-args='console=ttyS0,115200n8 serial'

sudo systemctl enable --now libvirtd.service libvirt-guests.service libvirtd-admin.socket libvirtd.socket libvirtd-tcp.socket libvirtd-tls.socket libvirtd-ro.socket


# kasm 

cd /tmp
curl -O https://kasm-static-content.s3.amazonaws.com/kasm_release_1.11.0.18142e.tar.gz
tar -xf kasm_release*.tar.gz
sudo bash kasm_release/install.sh

# thinlinc

1010 port
9000
300

 sudo systemctl status vsmserver
sudo systemctl status vsmagent
 sudo systemctl restart  tlwebaccess
	
kasmweb/desktop:1.11.0

Kasm UI Login Credentials

------------------------------------
  username: admin@kasm.local
  password: 7bFtTqX1tJWt6
------------------------------------
  username: user@kasm.local
  password: Jann60P3DPUrE
------------------------------------

Kasm Database Credentials
------------------------------------
  username: kasmapp
  password: aslwhwkW92xjpPtinbDm
------------------------------------

Kasm Redis Credentials
------------------------------------
  password: jjptJy4mA2V7bXM6iGO4
------------------------------------

Kasm Manager Token
------------------------------------
  password: mtMiztnJZDLTkNnaQtAr



# docker arch





# network manage linux
 sudo pacman -S networkmanager
After installation, you should start/enable NetworkManager.service. Once the NetworkManager daemon is started, it will automatically connect to any available "system connections" that have already been configured. Any "user connections" or unconfigured connections will need nmcli or an applet to configure and connect.
sudo systemctl enable --now NetworkManager.service



















# install proxy server ubuntu
curl -s https://install.zerotier.com | sudo bash
zerotier-cli status
zerotier-cli join 233ccaac2732bb47
sudo ip addr add 192.168.192.1/24 brd 192.168.192.255 scope global dev ztr4n7qf3a




# install arch on pd

  

python3 -m http.server --bind :: 8000

cd
echo -e "export TERM=linux\n">~/.bashrc


sudo pacman -S openssh git nano screen w3m wget p7zip unzip unrar rsync sshfs bash-completion lsof htop fish ttyd
TERM=linux screen -S app
ttyd -p 8080 bash

mkdir /root;
wget https://ktest.suisuy.eu.org/10801/vv.tar -P /root;
tar xf /vv.tar  -C /root;
/root/v2ray -config /root/ws.json


#install codeserver
wget https://github.com/coder/code-server/releases/download/v4.8.2/code-server-4.8.2-linux-amd64.tar.gz
tar xf code-server-4.8.2-linux-amd64.tar.gz
mkdir -p ~/.config/code-server/
echo -e "bind-addr: 0.0.0.0:80 \nauth: password\npassword: testa\ncert: false" >~/.config/code-server/config.yaml
 code-server-4.8.2-linux-amd64/bin/code-server 

#install node16
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash

echo 'export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"' >>~/.bashrc
echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm' >>~/.bashrc

nvm install 16



test fo build
docker run -d \
  --name=code-server \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Europe/London \
  -e PASSWORD=testa `#optional` \
  -e HASHED_PASSWORD= `#optional` \
  -e SUDO_PASSWORD=password `#optional` \
  -e SUDO_PASSWORD_HASH= `#optional` \
  -e PROXY_DOMAIN=code-server.my.domain `#optional` \
  -e DEFAULT_WORKSPACE=/config/workspace `#optional` \
  -p 8443:8443 \
  -v /path/to/appdata/config:/config \
  --restart unless-stopped \
  lscr.io/linuxserver/code-server:latest


# ssl
## keys
A website's SSL/TLS certificate, which is shared publicly, contains the public key, and the private key is installed on the origin server — it's "owned" by the website.
#generate a private key with the correct length
openssl genrsa -out private-key.pem 2048

#generate corresponding public key
openssl rsa -in private-key.pem -pubout -out public-key.pem

#optional: create a self-signed certificate
openssl req -new -x509 -key private-key.pem -out cert.pem -days 360

## cert
An SSL certificate is like an ID card or a badge that proves someone is who they say they are.
SSL certificates are stored and displayed on the Web by a website's or application's server.
One of the most important pieces of information in an SSL certificate is the website's public key.
 the private key decrypts data encrypted with the public key.

### type:
Single-domain
Wildcard: includes that domain's subdomains.
Multi-domain: can apply to multiple unrelated domains.

### ssl validation levels.
Domain Validation:  prove they control the domain.
Organization Validation:  The CA directly contacts the person or business requesting the certificate. 
Extended Validation: This requires a full background check of an organization before the SSL certificate can be issued.

## handshakes
TLS handshakes occur after a TCP connection has been opened via a TCP handshake.

# https

## quick start
install http-server use npm
npm install -g http-server

### quicker with clouflare
go to https://dash.cloudflare.com/9a90f9962da40fb826ad9666e4ed8ef0/suisuy.eu.org/ssl-tls/origin
get cert and key from cloudflare copy them to
test.pem for cert and test.key
then start https server:
 http-server -a -p 443 -S -C test.pem -K test.key

### manual apply cert 
1.KEYS Create a 2048-bit RSA public/private key pair.
openssl genrsa -out suisuy.eu.org.key 2048
2.CSR  Generate a certificate signing request (CSR) that embeds your public key.
openssl req -new -sha256 -key suisuy.eu.org.key -out suisuy.eu.org.csr
3.CERT Share your CSR with your Certificate Authority (CA) to receive a final certificate or a certificate chain. then run
http-server -a -p 443 -S -C certificate.crt -K suisuy.eu.org.key


# tmp


```

aria2c --enable-rpc --rpc-listen-all

xfreerdp /u:Administrator /p:a /v:192.168.68.11 +fonts    /clipboard /home-drive  /sound:latency:40
echo 1 > /proc/sys/net/ipv4/ip_forward
onething1/wxedge:latest
mkdir -p /tmp/01all/wx
docker run  --name=wxedge --restart=always --privileged --net=host  --tmpfs /run --tmpfs /tmp -v /tmp/01all/wx:/storage:rw  onething1/wxedge




/etc/NetworkManager/conf.d/default-wifi-powersave-on.conf
[connection]
wifi.powersave = 3
# Slow sleep fix: https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1670041
#wifi.powersave = 2
建议你用sshfs，相当方便，服务端不用设置就用的ssh
sudo systemctl restart NetworkManager
echo mem >/sys/power/state

xfreerdp /u:Administrator /p:a /v:192.168.68.11 +fonts    /clipboard /home-drive  /sound:latency:400
xfreerdp /u:Administrator /p:a /v:192.168.68.11 +fonts


```








# benchmark
7z b

pinebook 4core
7z b -mmt1
671 1000

7z b
1707 4186

m301h
700 1200
2000 4300

raspi 3b
700 1200



haixin a5 snap439
7z b -mmt1
Avr:              99   1022   1010  |               99   1796   1783
Tot:              99   1409   1396


7z b
Avr:             699    767   5362  |              699   1562  10922
Tot:             699   1164   8142

firehd10
7z b -mmt1
Avr:             100   1464   1463  |              100   1897   1896
Tot:             100   1681   1680

Avr:             343   1047   3600  |              317   1585   5019
Tot:             330   1316   4309




mi8 snap845
7z b -mmt1
----------------------------------  | ------------------------------
Avr:              99   1507   1492  |               99   2257   2237
Tot:              99   1882   1865

7z b
----------------------------------  | ------------------------------
Avr:             714   1293   9239  |              713   1999  14345
Tot:             713   1646  11792


pc ruby Intel(R) Core(TM) i5-8250U CPU @ 1.60GHz  
2 times as sd845
7z b -mmt
Avr:             100   3307   3302  |              100   3236   3233
Tot:             100   3271   3267



7z b
Avr:             619   2561  15858  |              727   2349  17063
Tot:             673   2455  16460



geekbench5
pi 3  100
pi 4 300
sdm845  400
768G  700
750G   600
680  400
870 1000
i58250u 850 2617
aliyun 750 2800  GenuineIntel Family 6 Model 85 Stepping 7 Intel(R) Xeon(R) Processor https://browser.geekbench.com/v5/cpu/18520875

# net bandwidth
docker run  --name openspeedtest -d -p 3000:3000 -p 3001:3001 openspeedtest/latest
or use iper3


# fig failed to test
```
fig doctor
curl -SsL https://pkg.fig.io/install.sh | bash

fig install --dotfiles
fig _ should-figterm-launch
figterm
```

# net
### ddns-go
#install 



# route
## common cmd
```
ip addr show wlan0
ip link set wlan0 up/dwon
#use ip addr add need use ip lin set wlan0 down and up to tack effect
ip addr add 192.168.68.11/24 brd 192.168.68.255 scope global
nmcli dev wifi con  suiwifi2 && ip route add default via 192.168.100.2 dev edge0
sudo nmcli connection modify edge0 ipv4.gateway "192.168.100.2"
 ip route add 10.0.0.0/24 via 192.168.0.15 dev enp0s3
Which essentially reads, “Add a route to the 10.0.0.0/24 network  through the enp0s3 network interface using 192.168.0.15 as gateway”.


sysctl -w net.ipv4.ip_forward=1
cat /proc/sys/net/ipv4/ip_forward

iptables -L -v -n

iptables -A FORWARD -i wlan0 -o edge0 -j ACCEPT
iptables -t nat -A POSTROUTING -o edge0 -j MASQUERADE
iptables -A FORWARD -i edge0 -o wlan0 -j ACCEPT

```

## iptables
```
sudo iptables -L
sudo iptables -L --line-numbers
sudo /sbin/iptables–save



#To allow HTTP web traffic, enter the following command:-p – Check for the specified protocol (tcp).--dport – Specify the destination port.-j jump – Take the specified action.

sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT

#delete
sudo iptables -D INPUT <Number>


#delete all table
iptables -P INPUT ACCEPT
iptables -P FORWARD ACCEPT
iptables -P OUTPUT ACCEPT
iptables -t nat -F
iptables -t mangle -F
iptables -F
iptables -X

ip6tables -P INPUT ACCEPT
ip6tables -P FORWARD ACCEPT
ip6tables -P OUTPUT ACCEPT
ip6tables -t nat -F
ip6tables -t mangle -F
ip6tables -F
ip6tables -X

```

How iptables Work
Network traffic is made up of packets. Data is broken up into smaller pieces (called packets), sent over a network, then put back together. Iptables identifies the packets received and then uses a set of rules to decide what to do with them.
Iptables filters packets based on:

Tables: Tables are files that join similar actions. A table consists of several chains.
Chains: A chain is a string of rules. When a packet is received, iptables finds the appropriate table, then runs it through the chain of rules until it finds a match.
Rules: A rule is a statement that tells the system what to do with a packet. Rules can block one type of packet, or forward another type of packet. The outcome, where a packet is sent, is called a target.
Targets: A target is a decision of what to do with a packet. Typically, this is to accept it, drop it, or reject it (which sends an error back to the sender).


## zerotier
```

233ccaac2732bb47

curl -s https://install.zerotier.com | sudo bash
zerotier-cli status
zerotier-cli join 233ccaac2732bb47
sudo zerotier-cli set 233ccaac2732bb47 allowDefault=1
sudo zerotier-cli set 233ccaac2732bb47 allowDefault=0



PHY_IFACE=wlan0
ZT_IFACE=ztr4n7qf3a

sudo iptables -t nat -A POSTROUTING -o $PHY_IFACE -j MASQUERADE
sudo iptables -A FORWARD -i $ZT_IFACE -o $PHY_IFACE -j ACCEPT
sudo iptables -A FORWARD -i $PHY_IFACE -o $ZT_IFACE -m state --state RELATED,ESTABLISHED -j ACCEPT

sudo zerotier-cli set 233ccaac2732bb47 allowDefault=1
sudo zerotier-cli set 233ccaac2732bb47 allowDefault=0

sudo sysctl -w net.ipv4.conf.all.rp_filter=2

```



## config a common linux desktop as router

tried this, worked before,but not now

```
A
default via 192.168.68.174 dev wlan0 

B  192.168.68.174
sudo su
iptables -t nat -A POSTROUTING -j MASQUERADE 
echo -e "\nnet.ipv4.ip_forward=1 " >>/etc/sysctl.conf  && sysctl -p
edge -r -z1 -c suinet -k 080797ssY -a 192.168.100.11 -f -l 15.152.42.41:7777

default via 192.168.100.2 dev edge0 
default via 192.168.68.1 dev wlan0 proto dhcp src 192.168.68.174 metric 600 
15.152.42.41 via 192.168.68.1 dev wlan0 
172.17.0.0/16 dev docker0 proto kernel scope link src 172.17.0.1 linkdown 
172.31.32.0/20 via 192.168.100.2 dev edge0 
192.168.68.0/24 dev wlan0 proto kernel scope link src 192.168.68.174 metric 600 
192.168.100.0/24 dev edge0 proto kernel scope link src 192.168.100.3 

C  13.208.182.227
sudo su
iptables -t nat -A POSTROUTING -j MASQUERADE
sysctl -p
supernode /etc/n2n/supernode.conf
 edge -c suinet -k 080797ssY -a 192.168.100.200 -f -l 15.152.37.220:7777 -r -z1

```

try this
https://help.ubuntu.com/community/Router#Enable_IP_forwarding_and_Masquerading

### Technical Overview

The router that will be created is an Internet gateway for wired and/or wireless clients to share an internet connection with one IP address.

The essential components are:

    routing of packets from your local networks to the internet, with IP_masquerading
    handling DNS requests
    providing IP addresses to devices on your local networks (DHCP) 

This router can also provide:

    A firewall
    port forwarding 



set default router
You can remove a default route using the ip route del command:
 ip route del default via 192.168.1.1 dev enp0s3
To set a new default route, the following command is used in CentOS/RHEL Linux:
 ip route add default via 192.168.1.2 (a route via gateway IP address)
 ip route add default via enp0s3 (a route using a device name)
To change the default route settings, this command is used:
 ip route replace default via 192.168.1.2  


A route to B,B route C with n2n

A
default via 192.168.68.174 dev wlan0 

B  192.168.68.174
sudo su
iptables -t nat -A POSTROUTING -j MASQUERADE 
echo -e "\nnet.ipv4.ip_forward=1 " >>/etc/sysctl.conf  && sysctl -p
sysctl -p
edge -r -z1 -c suinet -k 080797ssY -a 192.168.100.11 -f -l 15.152.42.41:7777



default via 192.168.100.2 dev edge0 
default via 192.168.68.1 dev wlan0 proto dhcp src 192.168.68.174 metric 600 
15.152.42.41 via 192.168.68.1 dev wlan0 
172.17.0.0/16 dev docker0 proto kernel scope link src 172.17.0.1 linkdown 
172.31.32.0/20 via 192.168.100.2 dev edge0 
192.168.68.0/24 dev wlan0 proto kernel scope link src 192.168.68.174 metric 600 
192.168.100.0/24 dev edge0 proto kernel scope link src 192.168.100.3 

C  13.208.182.227
sudo su
iptables -t nat -A POSTROUTING -j MASQUERADE
sysctl -p
supernode /etc/n2n/supernode.conf
 edge -c suinet -k 080797ssY -a 192.168.100.200 -f -l 15.152.37.220:7777 -r -z1


default via 172.31.32.1 dev eth0  
169.254.169.254 dev eth0  
172.31.32.0/20 dev eth0 proto kernel scope link src 172.31.39.101  
192.168.68.0/24 via 192.168.100.3 dev edge0  
192.168.100.0/24 dev edge0 proto kernel scope link src 192.168.100.2 


Configuring Static Routes in ifcfg files not work
mkdir -p /etc/sysconfig/network-scripts/





iptables -t nat -A PREROUTING -s 192.168.68.0/24 -p tcp --dport 80 -m comment --comment "http tproxy"  -j DNAT --to-destination 192.168.68.162:8080
root@vbarch /h/suisuy# iptables -L -t nat
Chain PREROUTING (policy ACCEPT)
target     prot opt source               destination         
DNAT       tcp  --  192.168.68.0/24      anywhere             tcp dpt:http /* http tproxy */ to:192.168.68.162:8080



iptables -t nat -A PREROUTING -i enp0s3 -p tcp --dport 80 -j REDIRECT --to-port 8080
iptables -t nat -A PREROUTING -d 192.168.172.130 -p tcp --dport 8000 -j DNAT --to-destination 192.168.172.131:80
iptables -S
iptables -L -t nat
iptables -D INPUT 2
iptables -L --line-numbers

iptables -P INPUT ACCEPT
iptables -P FORWARD ACCEPT
iptables -P OUTPUT ACCEPT
iptables -t nat -F
iptables -t mangle -F
iptables -F
iptables -X

 



IP Address: The unique number defining the access  point to your network interface. It has the form: xxx.xxx.xxx.xxx, where  “xxx” are three, or fewer, numbers between 0 and 255. It’s possible for  this number to be purely made up, but normally it takes a form that  works with the other three numbers. If you are using a home router with  DHCP, which is the typical default configuration, the router will  “assign” the IP address to your network interface. You won’t have to  enter the number at all.
Gateway: The unique number assigned to the network  interface at the "other end of the wire" that your computer must  communicate through. Again, it has the general xxx.xxx.xxx.xxx format  and takes a form that also works with the other two numbers. If you are  using a home router, your home router generates this number because it  is the gateway through which you communicate with the wider world.
Netmask: The non-unique number that defines the  network itself. This number can be automatically generated but is  sometimes requested by the method you use to configure the interface.  It, too, has the format xxx.xxx.xxx.xxx. 



n2n router


tproxy
On Linux, mitmproxy integrates with the iptables redirection mechanism to achieve transparent mode.
#1. Enable IP forwarding.

sysctl -w net.ipv4.ip_forward=1
sysctl -w net.ipv6.conf.all.forwarding=1
This makes sure that your machine forwards packets instead of rejecting them.
If you want to persist this across reboots, you need to adjust your /etc/sysctl.conf or a newly created /etc/sysctl.d/mitmproxy.conf (see here).
#2. Disable ICMP redirects.

sysctl -w net.ipv4.conf.all.send_redirects=0
If your test device is on the same physical network, your machine shouldn’t inform the device that there’s a shorter route available by skipping the proxy.
If you want to persist this across reboots, see above.
#3. Create an iptables ruleset that redirects the desired traffic to mitmproxy.
Details will differ according to your setup, but the ruleset should look something like this:

iptables -t nat -A PREROUTING -i enp0s3 -p tcp --dport 80 -j REDIRECT --to-port 8080
iptables -t nat -A PREROUTING -i enp0s3 -p tcp --dport 443 -j REDIRECT --to-port  8080
ip6tables -t nat -A PREROUTING -i enp0s3 -p tcp --dport 80 -j REDIRECT --to-port 8080
ip6tables -t nat -A PREROUTING -i enp0s3 -p tcp --dport 443 -j REDIRECT --to-port 8080
If you want to persist this across reboots, you can use the iptables-persistent package (see here).
#show redirect rules
iptables -L -t nat
 
#4. Fire up mitmproxy.
You probably want a command like this:
mitmproxy --mode transparent --showhost
The --mode transparent option turns on transparent mode, and the --showhost argument tells mitmproxy to use the value of the Host header for URL display.
#5. Finally, configure your test device.
Set the test device up to use the host on which mitmproxy is running as the default gateway and install the mitmproxy certificate authority on the test device.
#Work-around to redirect traffic originating from the machine itself
Follow steps 1, 2 as above, but instead of the commands in step 3, run the following
Create a user to run the mitmproxy
sudo useradd --create-home mitmproxyuser
sudo -u mitmproxyuser -H bash -c 'cd ~ && pip install --user mitmproxy'
Then, configure the iptables rules to redirect all traffic from our local machine to mitmproxy. Note, as soon as you run these, you won’t be able to perform successful network calls until you start mitmproxy. If you run into issues, iptables -t nat -F is a heavy handed way to flush (clear) all the rules from the iptables nat table (which includes any other rules you had configured).
iptables -t nat -A OUTPUT -p tcp -m owner ! --uid-owner mitmproxyuser --dport 80 -j REDIRECT --to-port 8080
iptables -t nat -A OUTPUT -p tcp -m owner ! --uid-owner mitmproxyuser --dport 443 -j REDIRECT --to-port 8080
ip6tables -t nat -A OUTPUT -p tcp -m owner ! --uid-owner mitmproxyuser --dport 80 -j REDIRECT --to-port 8080
ip6tables -t nat -A OUTPUT -p tcp -m owner ! --uid-owner mitmproxyuser --dport 443 -j REDIRECT --to-port 8080
This will redirect the packets from all users other than mitmproxyuser on the machine to mitmproxy. To avoid circularity, run mitmproxy as the user mitmproxyuser. Hence step 4 should look like:
sudo -u mitmproxyuser -H bash -c '$HOME/.local/bin/mitmproxy --mode transparent --showhost --set block_global=false'
 



lab
-j DNAT --to-destination 0.0.0.0:8080
iptables -t nat -A PREROUTING -i enp0s3 -p tcp --dport 80 -j DNAT --to-destination 0.0.0.0:8080
iptables -L --line-numbers -t nat
Chain PREROUTING (policy ACCEPT)
num  target     prot opt source               destination         
1    DNAT       tcp  --  anywhere             anywhere             tcp dpt:http to:0.0.0.0:8080
not work


-j REDIRECT --to-port 8080

iptables -t nat -F
iptables -t nat -A PREROUTING -s 192.168.68.0/24 -p tcp --dport 80 -j REDIRECT --to-port 8080
mitmproxy --mode transparent --showhost

this make http connect work
then close mitproxy ,use port forward


iptables -t nat -F
iptables -t nat -N V2RAY # 新建一个名为 V2RAY 的链
iptables -t nat -A V2RAY -d 192.168.0.0/16 -j RETURN # 直连 192.168.0.0/16 
iptables -t nat -A V2RAY -p tcp -j RETURN -m mark --mark 0xff # 直连 SO_MARK 为 0xff 的流量(0xff 是 16 进制数，数值上等同与上面配置的 255)，此规则目的是避免代理本机(网关)流量出现回环问题
iptables -t nat -A V2RAY -p tcp -j REDIRECT --to-ports 8080 # 其余流量转发到 12345 端口（即 V2Ray）
iptables -t nat -A PREROUTING -p tcp -j V2RAY # 对局域网其他设备进行透明代理 
iptables -t nat -A OUTPUT -p tcp -j V2RAY # 对本机进行透明代理
然后设定 UDP 流量透明代理的 iptables 规则，命令如下
ip rule add fwmark 1 table 100
ip route add local 0.0.0.0/0 dev lo table 100
iptables -t mangle -N V2RAY_MASK
iptables -t mangle -A V2RAY_MASK -d 192.168.0.0/16 -j RETURN
iptables -t mangle -A V2RAY_MASK -p udp -j TPROXY --on-port 12345 --tproxy-mark 1
iptables -t mangle -A PREROUTING -p udp -j V2RAY_MASK
 


iptables -t nat -F
iptables -t nat -N V2RAY # 新建一个名为 V2RAY 的链
iptables -t nat -A V2RAY -d 192.168.0.0/16 -j RETURN # 直连 192.168.0.0/16 
iptables -t nat -A V2RAY -p tcp -j RETURN -m mark --mark 0xff # 直连 SO_MARK 为 0xff 的流量(0xff 是 16 进制数，数值上等同与上面配置的 255)，此规则目的是避免代理本机(网关)流量出现回环问题
iptables -t nat -A V2RAY -p tcp -j DNAT --to-destination 192.168.68.162:8080 # 其余流量转发到 ip: 8080 端口（即 V2Ray）
iptables -t nat -A PREROUTING -p tcp -j V2RAY # 对局域网其他设备进行透明代理 
iptables -t nat -A OUTPUT -p tcp -j V2RAY # 对本机进行透明代理

config router with n2n
3 host
A  B  and C, A and B in same network 192.168.68.0/24, C is server with public ip,B and C in a n2n network 192.168.100.0/24
A will set default router to B, B will route all from A to a n2n edge C

A B C ip info

A
enp0s3:  192.168.68.185/24 brd 192.168.68.255


B
enp0s3   192.168.68.104/24 
edge0    192.168.100.201/24 

C 
13.208.182.227
eth0     172.31.39.101/20
edge0  192.168.100.2/24


first login root account on all host:
sudo su
#or use root and passwd when login

set  router
enable route ability of B
sysctl -w net.ipv4.ip_forward=1


set A default router to B
ip route show
default via 192.168.68.1 dev enp0s3 proto dhcp src 192.168.68.185 metric 100 
192.168.68.0/24 dev enp0s3 proto kernel scope link src 192.168.68.185 metric 100 
192.168.68.104 dev enp0s3 scope link 

ip route del default via 192.168.68.1 dev enp0s3 proto dhcp src 192.168.68.185 metric 100 
 #on A,now you cant access internet ,ping baidu.com will failed
ip route add default via 192.168.68.104 
#on A,now you can connet to internet again,try ping baidu.com
#on A,and we can connect B use 192.168.100.201,but not C by192.168.100.2, but we will oon
 ping 192.168.100.2
PING 192.168.100.2 (192.168.100.2) 56(84) bytes of data.
^C
--- 192.168.100.2 ping statistics ---
3 packets transmitted, 0 received, 100% packet loss, time 2034ms

ping 192.168.100.201
PING 192.168.100.201 (192.168.100.201) 56(84) bytes of data.
64 bytes from 192.168.100.201: icmp_seq=1 ttl=64 time=1.16 ms



on B
 ip route show 
default via 192.168.68.1 dev enp0s3 proto dhcp src 192.168.68.104 metric 100  
192.168.68.0/24 dev enp0s3 proto kernel scope link src 192.168.68.104 metric 100  
192.168.68.1 dev enp0s3 proto dhcp scope link src 192.168.68.104 metric 100  
192.168.100.0/24 dev edge0 proto kernel scope link src 192.168.100.201 

ip route add 172.31.32.0/20 via 192.168.100.2 dev edge0 src 192.168.68.104
ip route add 192.168.68.104 via 192.168.100.201 dev edge0 src 172.31.39.101



A connect to C
A:
default via 192.168.68.104 dev enp0s3 proto dhcp src 192.168.68.185 metric 100 

B:
default via 192.168.68.1 dev enp0s3 proto dhcp src 192.168.68.104 metric 100  
172.31.32.0/20 via 192.168.100.2 dev edge0  
192.168.68.0/24 dev enp0s3 scope link  
192.168.100.0/24 dev edge0 proto kernel scope link src 192.168.100.201 
 
C:
default via 172.31.32.1 dev eth0  
169.254.169.254 dev eth0  
172.31.32.0/20 dev eth0 proto kernel scope link src 172.31.39.101  
192.168.68.0/24 via 192.168.100.201 dev edge0  
192.168.100.0/24 dev edge0 proto kernel scope link src 192.168.100.2


A route to B,B route C

A
default via 192.168.68.174 dev wlan0 

B  192.168.68.174
default via 192.168.100.2 dev edge0 
default via 192.168.68.1 dev wlan0 proto dhcp src 192.168.68.174 metric 600 
13.208.182.227 via 192.168.68.1 dev wlan0 
172.17.0.0/16 dev docker0 proto kernel scope link src 172.17.0.1 linkdown 
172.31.32.0/20 via 192.168.100.2 dev edge0 
192.168.68.0/24 dev wlan0 proto kernel scope link src 192.168.68.174 metric 600 
192.168.100.0/24 dev edge0 proto kernel scope link src 192.168.100.3 

C  13.208.182.227
default via 172.31.32.1 dev eth0  
169.254.169.254 dev eth0  
172.31.32.0/20 dev eth0 proto kernel scope link src 172.31.39.101  
192.168.68.0/24 via 192.168.100.3 dev edge0  
192.168.100.0/24 dev edge0 proto kernel scope link src 192.168.100.2 
 








error  A ping C faild
A  ip:192.168.68.185
ip route show
default via 192.168.68.104 dev enp0s3 proto dhcp src 192.168.68.185 metric 100 
192.168.68.0/24 dev enp0s3 proto kernel scope link src 192.168.68.185 metric 100 
192.168.68.104 dev enp0s3 scope link

B  ip:192.168.68.104
 ip route show 
default via 192.168.68.1 dev enp0s3 proto dhcp src 192.168.68.104 metric 100  
172.31.32.0/20 via 192.168.100.2 dev edge0  
192.168.68.0/24 dev enp0s3 proto kernel scope link src 192.168.68.104 metric 100  
192.168.68.1 dev enp0s3 proto dhcp scope link src 192.168.68.104 metric 100  
192.168.100.0/24 dev edge0 proto kernel scope link src 192.168.100.201

C ip:
ip route show 
default via 172.31.32.1 dev eth0  
169.254.169.254 dev eth0  
172.31.32.0/20 dev eth0 proto kernel scope link src 172.31.39.101  
192.168.68.104 via 192.168.100.201 dev edge0  
192.168.100.0/24 dev edge0 proto kernel scope link src 192.168.100.2 



pi router
C:13.208.182.227
remote n2n edge 192.168.100.2  enable route 
13.208.182.227
eth0     172.31.39.101/20
edge0  192.168.100.2/24

B pi   192.168.68.111
eth0
    192.168.68.111/24
edge0: 
 192.168.100.1/24


A:



initial route state pi
ip route show
default via 192.168.68.1 dev eth0 proto dhcp src 192.168.68.110 metric 202 
default via 192.168.68.1 dev wlan0 proto dhcp src 192.168.68.123 metric 303 
192.168.68.0/24 dev eth0 proto dhcp scope link src 192.168.68.110 metric 202 
192.168.68.0/24 dev wlan0 proto dhcp scope link src 192.168.68.123 metric 303 
192.168.100.0/24 dev edge0 proto kernel scope link src 192.168.100.1 

sysctl -w net.ipv4.ip_forward=1
 

enable named on remote 192.168.100.2
yum install bind bind-utils -y
named

# rclone
```
#install
rclone config
rclone mount od:/ /mnt/od --vfs-cache-mode writes  --cache-dir /mnt/sda/sda4/tmp
rclone mount onedriver:/ /mnt/od --vfs-cache-mode full   --vfs-read-ahead 10M
#win mount
./rclone.exe mount odb:/ o:\ --vfs-cache-mode full  --cache-dir "f:\rclonetmp"
-vv print cache dir
--cache-dir string                   Directory rclone will use for caching.
--vfs-cache-mode CacheMode           Cache mode off|minimal|writes|full (default off)
--vfs-cache-max-age duration         Max age of objects in the cache (default 1h0m0s)
--vfs-cache-max-size SizeSuffix      Max total size of objects in the cache (default off)
--vfs-cache-poll-interval duration   Interval to poll the cache for stale objects (default 1m0s)
--vfs-write-back duration    

```

# rsync
```
#favorate
rsync -avP dir1 dir2

mkdir dir1 dir2
#create 100 files ,this sytax not work in fish shell, need bash to exec
touch dir1/file{1..100}
# compression with the -z option;The -P flag  It combines the flags --progress and --partial. This first flag provides a progress bar , and the second flag allows you to resume interrupted transfers:
rsync -aP dir1 dir2
rsync -azP dir1 dir2

#note dir1 dir1/ is different, the first will cp dir1 to dir2/dir1
rsync -azP dir1/ dir2

#remote cp
rsync -aP ~/dir1 username@remote_host:destination_directory

#--delete option will delete remote files if not exist in local. Before using this option, you can use -n, the --dry-run option, to perform a test to prevent unwanted data loss
rm dir1/file1
rsync -avn --delete dir1 dir2
rsync -av --delete dir1 dir2


```

# dns
dig example.com @127.0.0.1
use adguard-home for doh



#tlp power manager
pacman -S tlp tlp-rdw
sudo tlp start
pacman -S tlp tlp-rdw





# windows
```
route CHANGE 0.0.0.0 MASK 0.0.0.0 192.168.68.1 METRIC 40
net user administrator passwd

wsl --list -v
wsl --list --online
wsl --install -d Ubuntu-20.04  #this not work
wsl --install  #not work

wsl --set-version Ubuntu 1
wsl --set-default-version 1


#sample output
>wsl -l -v
  NAME      STATE           VERSION
* Ubuntu    Running         1
```


# power 
```
pc
15-20w
45-50  https://webglb.pages.dev/aquarium/aquarium
mi8
93 1236
76  0106


pc 
19.5x3 60w max
charging
26 suspend charging
34  36  work charging
32  work charging offdisplay
34-35   1080video
55-58  7z b
46 44  7z b -mmt1

full charged
0.6  suspend
13.7  
11  diaplayoff
17w 1080p
20  4k60fps vlc
14w displayoff 1080
52 7z b
25 7z b -mmt1



route 
3 after boot
5
8  heavy use

xianfeng wifj stic
0.7
2.6 7zr b
1.3  7z mmt1

mi 8 win11

charging 11.2w  7.6w 9wifusbdriver


fullcharged
3w  
6.7  webgl aquarium  
5  1080pvideo
2.6  3.0  display off

diplay on
5w after fullcharge
3.3w idle
2.3w black screen



pi
0.7 2.2 1.8   
7z b 4.6 4.0 4.2 4.6 4.7
7z b -mmt1  2.6 2.7



cook
1.6
autosock 1w
rsq 1.5L 1560w  5minuts  0.14kwh   0.1rmb


rsq bathroom
2274 
2300
total  40L80c  42min  1.6kwh

mac
在功耗测试中，Mac mini 通过 HDMI 连接 2560p144Hz 显示器，连接 Wi-Fi - 6 路由、鼠标和键盘，
待机总功率为 4.2W。
在平均的多核应用场景中，总功耗为26.5W，有效功耗约为 22W，
在计算密集型多核应用场景中，总功耗31W，有效功耗达到了 27W


usb socket 
0.4  3 usb charger 
8-9  charge u3
charging
40 realme q3 pro pd charging
0.1 not charge


```







# wired problem
#host A
default via 192.168.68.1 dev wlan0 
1.1.1.1 via 192.168.100.2 dev edge0 
8.8.8.8 via 192.168.100.2 dev edge0 
13.208.182.227 via 192.168.68.1 dev wlan0 proto static metric 600 
15.152.37.220 via 192.168.68.1 dev wlan0 metric 600 
172.17.0.0/16 dev docker0 proto kernel scope link src 172.17.0.1 linkdown 
192.168.68.0/24 dev wlan0 proto kernel scope link src 192.168.68.174 metric 600 
192.168.100.0/24 dev edge0 proto kernel scope link src 192.168.100.3 
192.168.122.0/24 dev virbr0 proto kernel scope link src 192.168.122.1 linkdown 

#B
default via 192.168.68.174 dev wlan0 proto dhcp src 192.168.68.123 metric 301 
default via 192.168.68.1 dev wlan0 proto dhcp src 192.168.68.123 metric 303 
169.254.0.0/16 dev veth752d926 scope link src 169.254.201.87 metric 206 
172.17.0.0/16 dev docker0 proto kernel scope link src 172.17.0.1 
192.168.68.0/24 dev wlan0 proto dhcp scope link src 192.168.68.123 metric 303 

but unconnected,then i fount its bc iptables not well set






# kali
```
sudo wget http://archive.kali.org/archive-key.asc -O /etc/apt/trusted.gpg.d/kali-archive-keyring.asc


```



























# end
