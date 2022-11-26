function FindProxyForURL(url, host) {
  if (isPlainHostName(host) || dnsDomainIs(host, ".mydomain.com")) {
    return "DIRECT";
  }
  else if (shExpMatch(host, "*.cn")) {
    return "DIRECT";
  }
  else if (shExpMatch(host, "*.cn")) {
    return "DIRECT";
  }

  return "PROXY 192.168.68.2:10809; PROXY 192.168.68.2:10807";

}