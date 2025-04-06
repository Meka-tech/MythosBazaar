import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants";

export const relistNFT = async (
  tokenId: number,
  price: string,
  signer: ethers.JsonRpcSigner
) => {
  try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );

    const priceInWei = ethers.parseEther(price);
    const listingPrice = await contract.getListingPrice();
    const tx = await contract.reSellToken(tokenId, priceInWei, {
      value: listingPrice
    });

    await tx.wait();
  } catch (error) {
    console.error("Error listing NFT:", error);
  }
};
