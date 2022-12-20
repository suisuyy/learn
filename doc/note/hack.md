# hack

#fatboot adb

# fastboot cmd
Your bootloader supports the following oem commands in FastBoot mode:

oem unlock
oem lock
oem edl
oem device-info
oem enable-charger-screen
oem disable-charger-screen
oem off-mode-charge
oem poweroff
oem select-display-panel

So "oem edl" should switch the phone to EDL mode (any fastboot.exe will support that).

Additionally, "oem poweroff" should power the phone off.

##  adb verify
1. 我们如果在PC端使用过adb命令，则会在当前用户目录生成一对密钥，密钥存放在.android目录，其中adbkey为私钥，adbkey.pub为公钥。

2. adb会把公钥（adbkey.pub）发送给android设备来获取认证，建立adb连接。

3. android 会根据属性ro.adb.secure来判断，是否进行认证，如果为0，则不需要认证，允许建立adb连接。如果为1，则需要进行密钥认证。

4. 如果需要进行adb密钥认证，则把接收到的adbkey.pub与本地的/data/misc/adb/adb_keys进行对比，如果相同，则表明是允许此设备进行adb连接，如果不相同，则弹出对话框，提示用户是否允许打开usb调试功能




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


# arch chroot
```
usermod -a -G 3001,3002,3003,3004,3005 root
echo "nameserver 8.8.8.8"> /etc/resolv.conf
exit
sed -i "s/^SigLevel.*/SigLevel = Never/" /etc/pacman.conf
sed '1i Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxarm/$arch/$repo'  /etc/pacman.d/mirrorlist
nano /etc/pacman.conf
SigLevel = Never
pacman -S curl wget git vim bash-completion screen htop w3m aria2 p7zip unrar rsync sshfs tinyproxy 
mkdir init.d rc3.d rc5.d
File=a;ln -s /etc/init.d/$File /etc/rc3.d/S0$File;ln -s /etc/init.d/$File /etc/rc5.d/S0$File
pacman -S zerotier-one
zerotier-one &
zerotier-cli join 233ccaac2732bb47
sh -c "zerotier-one;"
tinyproxy -c /etc/tinyproxy/tinyproxy.conf #change conf user and group to root ,port to 10801 Allow 192.168.68.0/24
```
# android manual root
```
# Start shell session in the emulator VM
adb shell
# Use the provided BlueStacks binary to switch to root  
system/xbin/bstk/su
# Disable SELinux
setenforce 0
# Remount all filesystems
mount -o rw,remount,rw /
mount -o rw,remount,rw /system
mount -o rw,remount,exec,rw /storage/emulated
# Unzip SuperSU zip
cd /mnt/sdcard
mkdir supersu
cd supersu
unzip ../SuperSU-v2.82-201705271822.zip
# Extract su command and run its post-install
cp x64/su /system/xbin/su 
chmod a+rwx /system/xbin/su 
/system/xbin/su --install
# Start su daemon mode
/system/xbin/su --daemon
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

# box m301h sm ciot
cpu: hi3798mv300h  (mv300 in setting,its wrong)
1g 8g 





# arch install
pacman -S ttyd
ttyd -p 2222 /bin/bash

open the machineip:2222 on local computer browser
ls /sys/firmware/efi/efivars

fdisk -l

mkfs.fat -F32 /dev/sda1
mkfs.ext4 /dev/sda4
mount /dev/sda4 /mnt
pacstrap /mnt base linux linux-firmware  networkmanager   vim nano  
genfstab -U /mnt >> /mnt/etc/fstab



# in chroot
echo 'Server = http://mirrors.aliyun.com/archlinux/$repo/os/$arch' > /etc/pacman
pacman -S grub efibootmgr

useradd -m -s /bin/bash suisuy
usermod -aG wheel,audio,video,storage suisuy

#timedatectl list-timezones
echo myarch > /etc/hostname
echo -e "127.0.0.1	localhost \n::1		localhost"
echo -e "127.0.0.1    localhost \n::1         localhost" >> /etc/hosts




#Now, mount the ESP partition you had created
export ROOTP=/dev/nvme0n1p3
mkdir newroot;mount ${ROOTP} newroot
arch-chroot newroot
#Install grub like this:
export DISK=/dev/nvme0n1
export EFIP=/dev/nvme0n1p1


mount ${DISK}p1 /boot/efi

grub-install --target=x86_64-efi --bootloader-id=GRUB --efi-directory=/boot/efi
#One last step:

grub-mkconfig -o /boot/grub/grub.cfg












Install grub on Non-UEFI systems
Install grub package first:

pacman -S grub
And then install grub like this (don’t put the disk number sda1, just the disk name sda):

grub-install /dev/sda
Last step:

grub-mkconfig -o /boot/grub/grub.cfg




Solved it after finding a few similar posts in this forum. Here is what I did:

From my rescue flash drive:

mount -L arch_p /mnt
mount -L SYSTEM_DRV /mnt/boot
swapon -L swap_p
pacstrap /mnt base base-devel linux linux-firmware dhcpcd nano intel-ucode wpa_supplicant netctl dialog 
genfstab -Lp /mnt > /mnt/etc/fstab
arch-chroot /mnt
Now comes the critical part: I added module "vmd" as follows:
Created file /etc/modules-load.d/customload.conf with content

vmd
and in /etc/mkinitcpio.conf edited the line

MODULES=()
to look like

MODULES=(vmd)
then did

mkinitcpio -p linux
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=Arch-Linux-grub
grub-mkconfig -o /boot/grub/grub.cfg
Then exit chroot, umount everything, shutown, power up and Grub starts and is able to load linux as well as windows


Discover what is your interface with the follow command: iwconfig

Normally, your wifi interface is like this construct: wlp2s0. I'll put <interface name> where you need to put your interface

Put the interface up:

ip link set <interface name> up
Scan your interface to see if it is enabled:

iwlist <interface name> scan | less
If it is in the list, down the interface:

ip link set interface down
Go the netctl examples Directory:

cd /etc/netctl/examples
Copy the wireless-wpa to netctl Directory with the name you want:

cp /etc/netctl/examples/wireless-wpa /etc/netctl/wifi_name
Open the wireless-wpa file to edit with your preferred editor (e.g. nano):

sudo nano /etc/netctl/wifi_name
Change the following settings:

Interface: <Interface name>
ESSID: <your internet name>
key: <your internet password>
Save and exit

Run the netctl with the following commands:

cd /etc/netctl
netctl start wifi_name
If an error message appears, try this commad:

ip link set dev <interface name> down
try run your internet connectivity:

ping -c 3 www.google.com
If working, enable your internet to run permanently:

netctl enable wifi_name




