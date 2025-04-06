import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants";

export const buyNFT = async (
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
    const tx = await contract.createMarketSale(tokenId, {
      value: ethers.parseEther(price)
    });
    await tx.wait();
  } catch (err) {}
};
