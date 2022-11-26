function FindProxyForURL(url, host) {
  if (isPlainHostName(host) || dnsDomainIs(host, ".localhost")) {
    return "DIRECT";
  }
  else if (isInNet(host, "198.95.0.0", "255.255.0.0", "172.22.22.0")) {
    return "DIRECT";
  }
  else if (shExpMatch(host, "*.cn")) {
    return "DIRECT";
  }
  else if (shExpMatch(host, "*.cn")) {
    return "DIRECT";
  }

  return "PROXY 192.168.68.2:10807; PROXY 192.168.68.2:10809;PROXY 192.168.68.2:10801;PROXY 192.168.68.2:10802;DIRECT";

}
