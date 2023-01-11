sudo pacman -S wqy-microhei base-devel sudo alsa-utils openssh git vim bash-completion screen w3m aria2 p7zip unrar rsync sshfs tinyproxy ncdu 
sudo pacman -S spice-vdagentd xorg-xwininfo chromium  

echo -e "\n[sublime-text]\nSigLevel = Never\nServer = https://download.sublimetext.com/arch/stable/x86_64" | sudo tee -a /etc/pacman.conf
sudo pacman -Syu sublime-text


#echo 'setxkbmap -option caps:swapescape' >>~/.xprofile



#gdm
export gdm_CONF='/etc/gdm3/custom.conf' 
mkdir ~/bk
cp $gdm_CONF ~/bk
mv 
cat >  /etc/gdm3/custom.conf << "EOF"
# GDM configuration storage
#
# See /usr/share/gdm/gdm.schemas for a list of available options.

[daemon]
# Uncomment the line below to force the login screen to use Xorg
#WaylandEnable=false

# Enabling automatic login
 AutomaticLoginEnable = true
  AutomaticLogin = suisuy

# Enabling timed login
#  TimedLoginEnable = true
#  TimedLogin = user1
#  TimedLoginDelay = 10

[security]

[xdmcp]

[chooser]

[debug]
# Uncomment the line below to turn on debugging
# More verbose logs
# Additionally lets the X server dump core if it crashes
#Enable=true


EOF
