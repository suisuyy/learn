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
