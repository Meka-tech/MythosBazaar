import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants";
import { FormatIPFSUrl } from "@/utils/formatIpfs";
import { MarketItem } from "@/types/types";

export const fetchNft = async (
  tokenId: number,
  signer: ethers.Signer
): Promise<MarketItem | null> => {
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

  try {
    const Item = await contract.fetchItem(tokenId);

    const tokenURI = await contract.tokenURI(Item.tokenId);

    const formattedURI = FormatIPFSUrl(tokenURI);

    const metadataResponse = await fetch(formattedURI);
    const metadata = await metadataResponse.json();

    if (!Item) {
      return null;
    }

    return {
      tokenId,
      owner: Item.owner || "",
      seller: Item.seller,
      price: Number(ethers.formatEther(Item.price)),
      sold: Item.sold,
      title: metadata.title,
      description: metadata.description,
      image: FormatIPFSUrl(metadata.image)
    };
  } catch (error) {
    console.error(`Error fetching token ${tokenId}:`, error);
    throw new Error("Token not found");
  }
};
