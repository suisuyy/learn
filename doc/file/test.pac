function FindProxyForURL(url, host) {
  if (isPlainHostName(host) || dnsDomainIs(host, ".localhost")) {
    return "DIRECT";
  }
  else if (/^192\.168\..*\./.test(host)) return "DIRECT";
  else if (/^172\.22\..*\./.test(host)) return "DIRECT";

  else if (shExpMatch(host, "*.cn")) {
    return "DIRECT";
  }
  else if (shExpMatch(host, "ruby.suisuy.eu.org")) {
    return "DIRECT";
  }
  else if (shExpMatch(host, "*.cn") ||  shExpMatch(host, "cn.*")) {
    return "DIRECT";
  }

  return "PROXY 192.168.100.106;PROXY 192.168.68.3:10807;PROXY 192.168.68.1:10807; PROXY 192.168.68.3:10809;PROXY 192.168.68.2:10801;PROXY 192.168.68.2:10802;DIRECT";

}
