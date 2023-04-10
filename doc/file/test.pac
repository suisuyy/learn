function FindProxyForURL(url, host) {
  if (isPlainHostName(host) || dnsDomainIs(host, ".localhost")) {
    return "DIRECT";
  }
  else if (/^192\.168\..*\./.test(host)) return "DIRECT";
  else if (/^172\.22\..*\./.test(host)) return "DIRECT";

  else if (shExpMatch(host, "*.cn")) {
    return "DIRECT";
  }
…