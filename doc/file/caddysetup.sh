sudo apt install curl wget

echo 'deb [trusted=true] https://dl.cloudsmith.io/public/caddy/stable/deb/debian any-version main' >>/etc/apt/source.list

apt update;apt install caddy
caddy run
caddy start



http://0.0.0.0:8081 {
    # http config
    reverse_proxy localhost:81
}






apt install -y tinyproxy

echo 'ReversePath "/"	"http://localhost:81" ' >>/etc/tinyproxy/tinyproxy.conf
echo 'Port 8081'>> /etc/tinyproxy/tinyproxy.conf
echo 'Listen 0.0.0.0'>> /etc/tinyproxy/tinyproxy.conf

systemctl enable --now tinyproxy















