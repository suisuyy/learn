var proxy = "PROXY 192.168.192.1:10801;PROXY 192.168.68.2:10809; PROXY 192.168.68.2:10807;PROXY 192.168.68.2:10801;PROXY 192.168.68.2:10802;DIRECT";

var proxyRegx=/cn.bing.com|.*\.bing\..*/;
var directRegx=/.*\.cn|cn\..*|.*bilibili.com|.*baidu\..*/;



function FindProxyForURL(url, host) {
  if (proxyRegx.test(url)) return proxy;

  else if (isPlainHostName(host) || dnsDomainIs(host, ".localhost")) return "DIRECT";
  else if (/^192\.168\..*\.|^172\.22\..*\./.test(host)) return "DIRECT";
  else if (directRegx.test(url)) return "DIRECT";
  
  return proxy;
}
