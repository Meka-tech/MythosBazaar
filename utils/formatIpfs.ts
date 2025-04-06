export const FormatIPFSUrl = (url: string) => {
  let formattedUrl = url.startsWith("ipfs://")
    ? `https://ipfs.io/ipfs/${url.split("ipfs://")[1]}`
    : url;
  return formattedUrl;
};
