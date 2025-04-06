import nftMarketplaceABI from "@/constants/NFTMarketplace.json";

export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
export const CONTRACT_ABI = nftMarketplaceABI.abi;
export const PINATA_SECRET = process.env.NEXT_PUBLIC_PINATA_SECRET!;
export const PINATA_KEY = process.env.NEXT_PUBLIC_PINATA_KEY!;
export const DEPLOY_ADDRESS = process.env.NEXT_PUBLIC_DEPLOY_ADDRESS;
