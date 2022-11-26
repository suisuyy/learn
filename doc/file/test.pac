function FindProxyForURL(url, host) {
  if (isInNet(host,
    "198.95.0.0",
    "255.255.0.0")

  ) {
    return "DIRECT";
  }
  return "PROXY proxy.mydomain.com:8080";
}