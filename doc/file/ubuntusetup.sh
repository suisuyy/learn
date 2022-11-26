sudo apt -y install python3 htop tinyproxy build-essential git vim unzip unrar screen fish aria2 cifs-utils
#install nodelts
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
bash
nvm install --lts
npm config set registry http://registry.npmmirror.com
#--registry=http://registry.npmmirror.com





#config bash and ssh and screen
echo -e "\n bind 'set completion-ignore-case on'\n bind 'set show-all-if-ambiguous on'\n bind '\C-p:menu-complete'\n" >>~/.bashrc
echo -e "ServerAliveInterval 1\nServerAliveCountMax 2" >>~/.ssh/config

echo -e \
"escape ^Jj \n\
hardstatus alwayslastline\n\
hardstatus string '%{gk}[%{wk}%?%-Lw%?%{=b kR}(%{W}%n*%f %t%?(%u)%?%{=b kR})%{=w}%?%+Lw%?%? %{g}][%{d}%l%{g}][ %{=w}%Y/%m/%d %0C:%s%a%{g} ]%{W}' \n\
termcapinfo xterm* ti@:te@"\n\
>~/.screenrc



sudo bash -c "echo blacklist nouveau > /etc/modprobe.d/blacklist-nvidia-nouveau.conf"
sudo bash -c "echo options nouveau modeset=0 >> /etc/modprobe.d/blacklist-nvidia-nouveau.conf"

cat /etc/modprobe.d/blacklist-nvidia-nouveau.conf

 sudo update-initramfs -u