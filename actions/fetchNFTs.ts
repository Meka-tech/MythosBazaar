import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants";
import { FormatIPFSUrl } from "@/utils/formatIpfs";

export const fetchNFTs = async () => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      provider
    );

    const marketItems = await contract.fetchMarketItems();

    const items = await Promise.all(
      marketItems.map(async (item: any) => {
        const tokenURI = await contract.tokenURI(item.tokenId);

        // Fetch the metadata from the URI
        let image = "";
        let title = "";
        let description = "";

        try {
          const formattedURI = FormatIPFSUrl(tokenURI);

          const metadataResponse = await fetch(formattedURI);
          const metadata = await metadataResponse.json();

          title = metadata.title;
          description = metadata.description;
          image = FormatIPFSUrl(metadata.image);
        } catch (error) {
          console.error(
            `Error fetching metadata for token ${item.tokenId}:`,
            error
          );
        }

        return {
          tokenId: item.tokenId.toString(),
          seller: item.seller,
          owner: item.owner,
          price: ethers.formatEther(item.price),
          sold: item.sold,
          image,
          title,
          description
        };
      })
    );

    return items;
  } catch (error) {
    console.error("Error fetching market items:", error);
    throw error;
  }
};
