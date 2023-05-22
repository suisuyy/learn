export SNAME='sinit'

cat >/etc/systemd/system/${SNAME}.service << "EOF"
[Unit]
Description=auto bash /root/sinit.sh at boot

[Service]
Type=simple
ExecStart=/bin/bash /root/sinit.sh
Restart=always
 
[Install]
WantedBy=multi-user.target

EOF


#push your sh in $STARTSH_DIR,$SNAME will exec them all on boot

cat << 'EOF' >/root/${SNAME}.sh 
export STARTSH_DIR='/root/startsh'
sleep 10


mkdir -p $STARTSH_DIR;
cd $STARTSH_DIR
for z in *.sh; do bash $z & done

#put you command here like 
/bin/screen -S test -dm bash -c "/bin/python3 -m http.server --directory /tmp  3003 ; read;bash" &

sleep infinity


EOF




chmod 777 /root/${SNAME}.sh
chmod 777 /etc/systemd/system/${SNAME}.service
systemctl enable --now ${SNAME}

#systemctl restart sinit
systemctl status --now ${SNAME}


vim /root/${SNAME}.sh

