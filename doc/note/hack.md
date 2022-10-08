

# android chroot
```

/dev/shm is a public shared memory directory,

## net

groupadd -g 3001 aid_bt
groupadd -g 3002 aid_bt_net
groupadd -g 3003 aid_inet
groupadd -g 3004 aid_net_raw
groupadd -g 3005 aid_admin
usermod -a -G 3001,3002,3003,3004,3005 root

edit /etc/passwd look up "_apt", change the value of group from 65534 to 3003 enter image description here, more magic group:

# example user for 
uid=32011(phablet) gid=32011(phablet) groups=32011(phablet),4(adm),5(tty),20(dialout),24(cdrom),27(sudo),30(dip),44(video),46(plugdev),1001(radio),1002(bluetooth),1003(android_graphics),1004(android_input),1005(audio),1013(android_media),1015(sdcard_rw),1021(gps),2001(android_cache),3002(android_net3),3003(android_net),3004(android_net2),9997(android_nvram)



```