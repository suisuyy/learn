sudo pacman -S wqy-microhei base-devel sudo alsa-utils openssh git vim bash-completion screen w3m aria2 p7zip unrar rsync sshfs tinyproxy ncdu 
sudo pacman -S spice-vdagentd 
pacman -S xorg-xwininfo
echo -e "\n[sublime-text]\nSigLevel = Never\nServer = https://download.sublimetext.com/arch/stable/x86_64" | sudo tee -a /etc/pacman.conf
sudo pacman -Syu sublime-text


#echo 'setxkbmap -option caps:swapescape' >>~/.xprofile

