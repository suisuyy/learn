#!/bin/bash

#install packages
sudo apt update
sudo apt install -y fonts-wqy-zenhei openssh-server iputils-ping iputils-* iperf3 curl wget git vim bash-completion screen w3m aria2 p7zip unrar rsync sshfs tinyproxy 
#sudo apt  install  -y dbus-x11 xfce4  xfce4-terminal


#config bash and screen
echo -e "\n bind 'set completion-ignore-case on'\n bind 'set show-all-if-ambiguous on'\n bind '\C-p:menu-complete'\n" >>~/.bashrc

echo -e \
"escape ^Jj \n\
hardstatus alwayslastline \n\
hardstatus string '%{gk}[%{wk}%?%-Lw%?%{=b kR}(%{W}%n*%f %t%?(%u)%?%{=b kR})%{=w}%?%+Lw%?%? %{g}][%{d}%l%{g}][ %{=w}%Y/%m/%d %0C:%s%a%{g} ]%{W}' \n\
termcapinfo xterm* ti@:te@"\n\
>~/.screenrc

