
- [benchmark](#benchmark)
- [route](#route)
- [rclone](#rclone)
- [dns](#dns)
- [rclone](#rclone-1)
  - [dipper](#dipper)
  - [ubports dipper](#ubports-dipper)
- [wired problem](#wired-problem)
- [tmp](#tmp)
- [end](#end)





# android chroot

/dev/shm is a public shared memory directory, 

## net

groupadd -g 3001 aid_bt
groupadd -g 3002 aid_bt_net
groupadd -g 3003 aid_inet
groupadd -g 3004 aid_net_raw
groupadd -g 3005 aid_admin
usermod -a -G aid_bt,aid_bt_net,aid_inet,aid_net_raw,aid_admin root

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

# route



common cmd
nmcli dev wifi con  suiwifi2 && ip route add default via 192.168.100.2 dev edge0
sudo nmcli connection modify edge0 ipv4.gateway "192.168.100.2"
 ip route add 10.0.0.0/24 via 192.168.0.15 dev enp0s3
Which essentially reads, “Add a route to the 10.0.0.0/24 network  through the enp0s3 network interface using 192.168.0.15 as gateway”.


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
wget -O dnsproxy.tar.gz "https://github.com/AdguardTeam/dnsproxy/releases/download/${VERSION}/dnsproxy-linux-amd64-${VERSION}.tar.gz"
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



# end


