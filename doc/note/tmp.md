

macOS Ventura	13.0.1
macOS Monterey	12.6.1
macOS Big Sur	11.7.1
macOS Catalina  10.15.7
macOS Mojave	10.14.6
macOS High Sierra	10.13.6
macOS Sierra	10.12.6
OS X El Capitan	10.11.6
OS X Yosemite	10.10.5
OS X Mavericks	10.9.5
OS X Mountain Lion	10.8.5
OS X Lion	10.7.5
Mac OS X Snow Leopard	10.6.8
Mac OS X Leopard	10.5.8
Mac OS X Tiger	10.4.11
Mac OS X Panther	10.3.9
Mac OS X Jaguar	10.2.8
Mac OS X Puma	10.1.5
Mac OS X Cheetah	10.0.4

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

wget https://ghproxy.com/https://github.com/krallin/tini/archive/v0.19.0.tar.gz

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
select part 21
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




Germany
platform
https://open.hpi.de/courses
openHPI is the educational Internet platform of the German Hasso  Plattner Institute, Potsdam. On openHPI you take part in a worldwide  social learning network based on interactive online courses covering  different subjects in Information and Communications Technology (ICT).




Technical University of Munich
https://www.edx.org/course/software-engineering-essentials?source=aw&awc=6798_1659695716_ce686607f0c01f8de6a2e407c5d1e12a&utm_source=aw&utm_medium=affiliate_partner&utm_content=text-link&utm_term=301045_https%3A%2F%2Fwww.class-central.com%2F

https://www.edx.org/course/ilabx-the-internet-masterclass


Switzerland
https://www.coursera.org/learn/introductiontoprobability
https://www.coursera.org/learn/particle-physics
https://www.coursera.org/unige
Finland

https://www.mooc.fi/en/#courses
https://wsd.cs.aalto.fi/
https://course.elementsofai.com/
https://wsd.cs.aalto.fi/2-internet-and-http/1-introduction-to-the-internet/
https://course.elementsofai.com/
https://tdd.mooc.fi/
https://fitech.io/en/
Sweden

https://www.coursera.org/lunduniversity
https://www.edx.org/school/chalmersx

Norway

adb shell pm disable-user com.android.internal.display.cutout.emulation.tall
adb shell pm disable-user com.android.internal.display.cutout.emulation.double
adb shell pm disable-user com.qualcomm.qti.modemtestmode
adb shell pm disable-user com.android.logsettings
adb shell pm disable-user com.hmct.userexperienceprogram
adb shell pm disable-user com.android.hmct.bmct
adb shell pm disable-user com.android.traceur
adb shell pm disable-user com.hmct.einklauncher
adb shell pm disable-user com.hmct.updater
adb shell pm disable-user com.hmct.ota.appinstall
adb shell pm disable-user com.juphoon.service
adb shell pm disable-user com.android.backupreceiver
adb shell pm disable-user com.tencent.android.location
adb shell pm disable-user com.hmct.semantic.analysis
adb shell pm disable-user com.android.location.fused
adb shell pm disable-user com.hmct.floatwindow
adb shell pm disable-user com.hmct.payguard
adb shell pm disable-user com.android.stk
adb shell pm disable-user com.hmct.hmctmanual
adb shell pm disable-user com.hmct.HmctService
adb shell pm disable-user com.hmct.ftmode
以上命令 去除负一屏，去除系统更新（老版本更流畅），刘海屏，智慧识别，体验计划，日志，支付保护，MBN测试，悬浮球 等，运行测试完美。

50/8















































