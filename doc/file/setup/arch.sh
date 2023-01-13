


sudo pacman -S wqy-microhei base-devel sudo openssh usbutils automake autoconf mlocate  alsa-utils  git vim  screen bc nmap w3m aria2 p7zip unrar rsync sshfs tinyproxy ncdu bash-completion qemu-user-static  qemu-user-static-binfmt 
#sudo no passwd need
echo "%suisuy  ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers
#config bash and ssh and screen 
echo -e "\n bind 'set completion-ignore-case on'\n bind 'set show-all-if-ambiguous on'\n bind '\C-j:menu-complete'\n" >>~/.bashrc
echo -e "ServerAliveInterval 1\nServerAliveCountMax 2" >>~/.ssh/config

echo -e \
"escape ^eE \n\
hardstatus alwayslastline\n\
hardstatus string '%{gk}[%{wk}%?%-Lw%?%{=b kR}(%{W}%n*%f %t%?(%u)%?%{=b kR})%{=w}%?%+Lw%?%? %{g}][%{d}%l%{g}][ %{=w}%Y/%m/%d %0C:%s%a%{g} ]%{W}' \n\
termcapinfo xterm* ti@:te@"\n\
>~/.screenrc


