export const ShortenWallet = (walletAddress: string) => {
  const firstPart = walletAddress.slice(0, 6);
  const secondPart = walletAddress.slice(-4);
  const shortened = `${firstPart}...${secondPart}`;
  return shortened;
};
