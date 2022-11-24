sudo apt -y install python3 htop tinyproxy build-essential git vim unzip unrar screen fish aria2


#config bash and ssh and screen
echo -e "\n bind 'set completion-ignore-case on'\n bind 'set show-all-if-ambiguous on'\n bind '\C-p:menu-complete'\n" >>~/.bashrc
echo -e "ServerAliveInterval 1\nServerAliveCountMax 2" >>~/.ssh/config

echo -e \
"escape ^Jj \n\
hardstatus alwayslastline\n\
hardstatus string '%{gk}[%{wk}%?%-Lw%?%{=b kR}(%{W}%n*%f %t%?(%u)%?%{=b kR})%{=w}%?%+Lw%?%? %{g}][%{d}%l%{g}][ %{=w}%Y/%m/%d %0C:%s%a%{g} ]%{W}' \n\
termcapinfo xterm* ti@:te@"\n\
>~/.screenrc


