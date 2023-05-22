
sudo pacman -S wqy-microhei base-devel sudo openssh usbutils automake autoconf mlocate  alsa-utils  lsof git vim  screen bc nmap w3m aria2 p7zip unrar rsync sshfs tinyproxy ncdu bash-completion qemu-user-static  qemu-user-static-binfmt 


#kenel
cat /proc/sys/vm/swappiness
echo vm.swappiness=1 >> /etc/sysctl.conf && sysctl -p
cat /proc/sys/vm/swappiness
sysctl vm.swappiness


#sudo no passwd need
echo "%suisuy  ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers
#config bash and ssh and screen 
echo -e "\n bind 'set completion-ignore-case on'\n bind 'set show-all-if-ambiguous on'\n bind '\C-p:menu-complete'\n" >>~/.bashrc
echo -e "ServerAliveInterval 1\nServerAliveCountMax 2" >>~/.ssh/config
#screen
echo -e \
"escape ^aA \n\
hardstatus alwayslastline\n\
hardstatus string '%{gk}[%{wk}%?%-Lw%?%{=b kR}(%{W}%n*%f %t%?(%u)%?%{=b kR})%{=w}%?%+Lw%?%? %{g}][%{d}%l%{g}][ %{=w}%Y/%m/%d %0C:%s%a%{g} ]%{W}' \n\
termcapinfo xterm* ti@:te@"\n\
>~/.screenrc
