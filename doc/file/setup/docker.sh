mkdir -p /etc/docker
export FILE=/etc/docker/daemon.json 
cat >$FILE << 'EOF'  
{
    "registry-mirrors": [
        "http://hub-mirror.c.163.com",
        "https://docker.mirrors.ustc.edu.cn",
        "https://registry.docker-cn.com"
    ]
}


EOF

systemctl restart docker

#ExecStart=/usr/bin/dockerd -g /new/path/docker -H fd://
#ExecStart=/usr/bin/dockerd -g /new/path/docker -H fd://
/lib/systemd/system/docker.service

