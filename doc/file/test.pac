var proxy = "PROXY 192.168.192.1:11111;PROXY 192.168.192.1:22222; PROXY 192.168.192.2:11111;PROXY 192.168.23.4:11111;PROXY 192.168.100.4:11111;DIRECT";

var proxyRegx=/cn.bing.com|.*\.bing\..*/;
var directRegx=/.*\.cn|cn\..*|.*bilibili.com|.*baidu\..*|.*123\..*/;



function FindProxyForURL(url, host) {
  if (proxyRegx.test(url)) return proxy;

  else if (isPlainHostName(host) || dnsDomainIs(host, ".localhost")) return "DIRECT";
  else if (/^192\.168\..*\.|^172\.22\..*\./.test(host)) return "DIRECT";
  else if (directRegx.test(url)) return "DIRECT";
  
  return proxy;
}
