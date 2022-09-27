
- [android chroot](#android-chroot)
  - [net](#net)
- [benchmark](#benchmark)
- [net bandwidth](#net-bandwidth)
- [fig](#fig)
- [qinglong](#qinglong)
- [route](#route)
  - [common cmd](#common-cmd)
  - [iptables](#iptables)
  - [zerotier](#zerotier)
  - [config mi8 lineage termux as router](#config-mi8-lineage-termux-as-router)
  - [config a common linux desktop as router](#config-a-common-linux-desktop-as-router)
    - [Technical Overview](#technical-overview)
- [rclone](#rclone)
- [dns](#dns)
- [rclone](#rclone-1)
  - [dipper](#dipper)
  - [ubports dipper](#ubports-dipper)
- [windows](#windows)
- [wired problem](#wired-problem)
- [tmp](#tmp)
- [upnp](#upnp)
- [end](#end)
- [hack](#hack)
  - [box m301h sm ciot](#box-m301h-sm-ciot)
- [mi8 win11](#mi8-win11)

test fo build



# android chroot

/dev/shm is a public shared memory directory,

## net
```

groupadd -g 3001 aid_bt
groupadd -g 3002 aid_bt_net
groupadd -g 3003 aid_inet
groupadd -g 3004 aid_net_raw
groupadd -g 3005 aid_admin
usermod -a -G aid_bt,aid_bt_net,aid_inet,aid_net_raw,aid_admin root

edit /etc/passwd look up "_apt", change the value of group from 65534 to 3003 enter image description here, more magic group:

uid=32011(phablet) gid=32011(phablet) groups=32011(phablet),4(adm),5(tty),20(dialout),24(cdrom),27(sudo),30(dip),44(video),46(plugdev),1001(radio),1002(bluetooth),1003(android_graphics),1004(android_input),1005(audio),1013(android_media),1015(sdcard_rw),1021(gps),2001(android_cache),3002(android_net3),3003(android_net),3004(android_net2),9997(android_nvram)
```


That's because Android normally adds users (i.e. apps) to these groups only when the specific app has networking permissions.

Adding a user to these groups gives it permission to use socket() as described in the question:

usermod -a -G aid_bt,aid_bt_net,aid_inet,aid_net_raw,aid_admin admin

However, when a process uses seteuid() to switch from root to a unprivileged user (for example someuser), then it's not enough (or probably irrelevant) that this effective user has aid_* group membership. Instead, the root user must explicitly be a member of these groups:

usermod -a -G aid_bt,aid_bt_net,aid_inet,aid_net_raw,aid_admin root

This solved the problem for me.

Note that I've also tried to play with setegid() and similar as an alternative, but none of that helped...



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


# benchmark
7z b

pinebook 4core
7z b -mmt1
671 1000

7z b
1707 4186

raspi 3b



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

# net bandwidth
docker run  --name openspeedtest -d -p 3000:3000 -p 3001:3001 openspeedtest/latest



# fig
```
fig doctor
curl -SsL https://pkg.fig.io/install.sh | bash

fig install --dotfiles
fig _ should-figterm-launch
figterm
```

# qinglong
```
mkdir -p /etc/docker
tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": [
    "https://0b27f0a81a00f3560fbdc00ddd2f99e0.mirror.swr.myhuaweicloud.com",
    "https://ypzju6vq.mirror.aliyuncs.com",
    "https://registry.docker-cn.com",
    "http://hub-mirror.c.163.com",
    "https://docker.mirrors.ustc.edu.cn"
  ]
}


systemctl daemon-reload
systemctl restart docker

docker run -dit \
  -v $PWD/ql/data:/ql/data \
  -p 5700:5700 \
  --name qinglong \
  --hostname qinglong \
  whyour/qinglong:latest

```



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



## config mi8 lineage termux as router
apt install n2n



## config a common linux desktop as router

tried this, worked before,but not now

```
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
 
mitmproxy --mode transparent --showhost --listen-host 0.0.0.0

 



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
install
rclone config
rclone mount onedriver:/ /path/to/local/mount --vfs-cache-mode
rclone mount onedriver:/ ./onedriver/ --vfs-cache-mode full   --vfs-read-ahead 10M
rclone mount onedriver:/ ./onedriver/ --vfs-cache-mode full
# dns
dns
./cloudflared-linux-amd64 proxy-dns --port 53
dig +short @127.0.0.1 -p5553 cloudflare.com AAAA
dnsmasq 


pip3 install doh-proxy
 sudo doh-proxy \
    --upstream-resolver=::1 \
    --certfile=./fullchain.pem \
    --keyfile=./privkey.pem

dnscrypt-proxy.toml:
server_names = ['cloudflare', 'cloudflare-ipv6']
 sudo systemctl status dnscrypt-proxy

sudo dnsproxy-adguard -u sdns://AgcAAAAAAAAABzEuMC4wLjGgENk8mGSlIfMGXMOlIlCcKvq7AVgcr
Zxtjon911-ep0cg63Ul-I8NlFj4GplQGb_TTLiczclX57DvMV8Q-JdjgRgSZG5zLmNsb3VkZmxhcmUuY29tCi9kbnMtcXVlcnk




1. Install DNS Proxy
VERSION=$(curl -s https://api.github.com/repos/AdguardTeam/dnsproxy/releases/latest | grep tag_name | cut -d '"' -f 4) && echo "Latest AdguardTeam dnsproxy version is $VERSION"
wget -O dnsproxy.tar.gz "https://github.com/AdguardTeam/dnsproxy/releases/download/${VERSION}/dnsproxy-linux-arm64-${VERSION}.tar.gz"
tar -xzvf dnsproxy.tar.gz
cd linux-amd64
mv dnsproxy /usr/bin/dnsproxy
#2. Connect DNS.SB DoH Server
dnsproxy -l 127.0.0.1 -p 53 -u https://doh.dns.sb/dns-query -b 185.222.222.222:53
Now we can open another terminal to test DNS
root@dns ~ # dig example.com @127.0.0.1

; <<>> DiG 9.16.15-Debian <<>> example.com @127.0.0.1
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 22295
;; flags: qr rd ra ad; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 4096
;; QUESTION SECTION:
;example.com.			IN	A

;; ANSWER SECTION:
example.com.		1094	IN	A	93.184.216.34

;; Query time: 3 msec
;; SERVER: 127.0.0.1#53(127.0.0.1)
;; WHEN: Fri Jul 02 13:07:43 UTC 2021
;; MSG SIZE  rcvd: 56
We can see the response server  SERVER: 127.0.0.1#53(127.0.0.1) is working fine.

#tlp power manager
pacman -S tlp tlp-rdw
sudo tlp start
pacman -S tlp tlp-rdw


# rclone
rclone mount sonedriver:/ /home/admin/onedriver --vfs-cache-max-age 10m --vfs-cache-mode full    
rclone mount onedriver:/ /home/admin/mnt/one  --allow-non-empty --vfs-cache-max-age 10m --vfs-cache-mode full

rclone ls  sonedriver:/
rclone mount remote:path/to/files /path/to/local/mount
fusermount -u /path/to/local/mount

--cache-dir string                   Directory rclone will use for caching.
--vfs-cache-mode CacheMode           Cache mode off|minimal|writes|full (default off)
--vfs-cache-max-age duration         Max age of objects in the cache (default 1h0m0s)
--vfs-cache-max-size SizeSuffix      Max total size of objects in the cache (default off)
--vfs-cache-poll-interval duration   Interval to poll the cache for stale objects (default 1m0s)
--vfs-write-back duration            Time to writeback files after last use when using cache (default 5s)

If run with -vv rclone will print the location of the file cache. The files are stored in the user cache file area which is OS dependent but can be controlled with --cache-dir or setting the appropriate environment variable.

#Without the use of --vfs-cache-mode this can only write files sequentially, it can only seek when reading. This means that many applications won't work with their files on an rclone mount without --vfs-cache-mode writes or --vfs-cache-mode full. See the VFS File Caching section for more info



#hack


## dipper
userdata can be ext2 f2fs


## ubports dipper

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

but unconnected




# tmp
docker run --privileged --pull=always --name my-tl-demo --publish 9922:22 -t oposs/tl-ubuntu


Android needs kernel support to run docker
install termux  https://f-droid.org/en/packages/com.termux/

Update termux
apt update && apt upgrade -y
pkg install root-repo

Installation Dependencies
pkg install golang make cmake ndk-multilib tsu tmux docker

Compilation tini
```
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
```

Start up docker
```
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


# upnp



# end


# hack
## box m301h sm ciot
cpu: hi3798mv300
1g 8g 
![image](https://github.com/suisuyy/learn/raw/main/images/Mon_Aug_29_2022_1661784305731.png)



# mi8 win11
```
额外说明
win10 从版本号21277才支持x64位软件

手机安装win11

adb push parted  /tmp
adb shell chmod +x /tmp/parted


parted /dev/block/sda
rm 23
mkpart aboot fat32 53GB 54GB
mkpart userdata ext4 54GB 59GB
set 23 esp on 
q
reboot recovery
mke2fs -t ext4 /dev/block/by-name/userdata
mkfs.fat -F32 -s1 /dev/block/by-name/esp


现在已经不需要手机进入pe，可全程电脑操作
大致刷机过程是
1 进入twrp，重新分区，删除userdata分区再建立3个分区 esp win userdata并格式化
2 进入efi大容量存储模式将手机win分区挂载到电脑，然后电脑打开dism++安装Windows和驱动并添加引导
3 打开测试模式使Windows可以使用woa驱动



卸载data 和 sdcard分区。直接使用adb在手机里运行命令卸载。
手机进入twrp连接电脑，电脑打开powershell 执行以下命令
adb shell umount /data 
adb shell umount /sdcard 
这里使用 adb shell 具体命令  用来执行一次命令

使用adb push将分区程序parted传输到手机移动到手机临时文件夹/tmp,,并修改parted属性使其可运行
adb push parted  /tmp
adb shell chmod +x /tmp/parted

第一行命令中parted文件路径要替换你电脑中parted文件的路径

使用adb shell登陆进手机系统以执行命令
adb shell  
使用adb shell会远程进入手机的shell交互界面，方便用来在手机执行多条命令
执行完adb shell登陆进手机之后输入的命令都是直接在手机运行的


使用parted命令修改手机硬盘分区 /dev/block/sda 指当前手机硬盘
/tmp/parted /dev/block/sda
执行命令后会进入parted程序提供的交互界面，可以使用parted提供的命令如print（查看当前所有分区）rm（remove缩写 删除）
输入命令后会进入parted程序提控的界面，这时可以使用parted提供的命令来管理手机硬盘，print可以显示现在所有磁盘分区状态
print

可以看到现在手机有很多分区，我们在这里会删除name 是userdata的分区，再添加3个分区名为esp win userdata，
userdata分区是被安卓使用作为内部存储的分区，esp分区用来引导windows系统的，win分区被windows使用一般是C盘。以下命令建议一行一行的复制粘贴，保证前一个命令完成再执行下一条
rm 21 #21是userdata分区号
mkpart esp fat32 1611MB 2100MB
mkpart win ntfs 2100MB 42GB   
mkpart userdata ext4 42GB 59GB  
set 21 esp on  

分区好再用print查看分区状态，可以看到这里给了win分区50.9GB，给安卓6GB左右

使用quit退出parted程序
使用命令重启recovery以让分区修改生效
quit  #退出parted分区程序
reboot recovery  #手机重启twrp
使用以下命令格式化刚刚新建的分区
mkfs.fat -F32 -s1 /dev/block/by-name/esp
mkfs.ntfs -f /dev/block/by-name/win
mke2fs -t ext4 /dev/block/by-name/userdata



然后执行命令进入fastboot，执行后手机会重启进入fasteboot，电脑也会退出shell环境
reboot bootloader
使用fastboot进入自动启动大容量存储的uefi ，成功后电脑会识别到存储，可以在我的电脑看到刚刚手机新建的分区
fastboot boot boot.img

电脑使用dism++安装系统到手机的最大的分区,注意选中添加引导和格式化

修改手机efi分区，打开测试模式以关闭驱动签名认证，因为刚刚加载的驱动是没有经过微软认证的，不打开测试模式Windows无法使用驱动
为efi系统分区设定盘符以便对其进行修改
diskpart  
select disk 7
list part
select part 21 #21为你的esp分区号
assign letter=T
exit
第二行的 select disk 7 中的数字7 可能要根据实际情况修改

复制下面内容到命令窗口，这里使用powershell会出错，用cmd才行
bcdedit /store T:\efi\microsoft\boot\bcd /set {Default} testsigning on
bcdedit /store T:\efi\microsoft\boot\bcd /set {Default} nointegritychecks on


 

在安装之前应先解锁手机，刷入第三方twrp
和一般使用手机电脑依靠鼠标或者触摸操作不同，这次刷机主要使用键盘输入命令控制电脑手机，powershell是windows自带程序用来执行命令，打开输入命令后按回车执行命令，常见命令有ls用来显示当前目录所有文件，cd用来进入指定文件夹，adb是命令行应用也是再powershell里面使用，命令由命令名+参数组成，两者一般会用空格分开，比如之后使用的umount /data命令，umount 是命令名表示卸载， /data为参数，就是卸载/data分区


adb是安卓开发调试工具，这里用来执行命令完成一些高级系统管理功能来远程管理手机，后面执行的命令大多都是通过adb shell在电脑上输入命令传到手机执行的，这里adb有两种工作模式，一个是直接在电脑上运行命令如adb push用来传输文件，而adb shell是登陆到手机系统里，之后输入的命令会直接在手机执行，可使用exit命令退出shell模式，要注意分别

```