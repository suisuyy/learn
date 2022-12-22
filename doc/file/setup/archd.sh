echo 'setxkbmap -option caps:swapescape' >>~/.xprofile
pacman -S xorg-xwininfo
echo -e "\n[sublime-text]\nSigLevel = Never\nServer = https://download.sublimetext.com/arch/stable/x86_64" | sudo tee -a /etc/pacman.conf
sudo pacman -Syu sublime-text
