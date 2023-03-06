cat >/root/sinit.sh << "EOF"
#put you command here like
#/bin/python3 -m http.server --directory /tmp  3003


#sleep infinity needed for systemd keep alive,or service status will be loaded not active
sleep infinity


EOF


cat >/etc/systemd/system/sinit.service << "EOF"
[Unit]
Description=auto bash /root/sinit.sh at boot

[Service]
Type=simple
ExecStart=/bin/bash /root/sinit.sh
Restart=always
 
[Install]
WantedBy=multi-user.target

EOF

chmod 777 /root/sinit.sh
chmod 777 /etc/systemd/system/sinit.service
systemctl enable --now sinit

systemctl restart sinit
systemctl status --now sinit

