import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants";

import { FormatIPFSUrl } from "@/utils/formatIpfs";

export const fetchUserNFTs = async (signer: ethers.JsonRpcSigner) => {
  try {
    // Use the signer's provider and create contract with signer
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );

    // Call the contract function
    const marketItems = await contract.fetchUserRelatedItems();

    // If no items, return empty array
    if (!marketItems || marketItems.length === 0) {
      return [];
    }

    const items = await Promise.all(
      marketItems.map(async (item: any) => {
        try {
          const tokenURI = await contract.tokenURI(item.tokenId);

          let metadata = {
            title: "",
            description: "",
            image: ""
          };

          if (tokenURI) {
            const formattedURI = FormatIPFSUrl(tokenURI);
            const metadataResponse = await fetch(formattedURI);
            metadata = await metadataResponse.json();
          }

          return {
            tokenId: item.tokenId.toString(),
            seller: item.seller,
            owner: item.owner,
            price: ethers.formatEther(item.price.toString()),
            sold: item.sold,
            image: metadata.image ? FormatIPFSUrl(metadata.image) : "",
            title: metadata.title || `NFT #${item.tokenId}`,
            description: metadata.description || ""
          };
        } catch (error) {
          console.error(`Error processing token ${item.tokenId}:`, error);
          return null;
        }
      })
    );
    const Items = items.filter((item) => item !== null);

    return Items;
  } catch (error) {
    console.error("Error fetching user NFTs:", error);
    throw error;
  }
};
