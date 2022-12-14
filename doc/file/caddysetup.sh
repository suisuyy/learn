sudo apt install curl wget

echo 'deb [trusted=true] https://dl.cloudsmith.io/public/caddy/stable/deb/debian any-version main' >>/etc/apt/source.list

apt update;apt install caddy


ReversePath "/"	"http://localhost:81"
Port 8081>> /etc/tinyproxy/tinyproxy.conf