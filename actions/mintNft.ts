import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants";

export const mintNFT = async (
  tokenURI: string,
  price: string,
  signer: ethers.JsonRpcSigner
): Promise<number | null> => {
  try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );

    const priceInWei = ethers.parseEther(price);
    const listingPrice = await contract.getListingPrice();

    const tx = await contract.createToken(tokenURI, priceInWei, {
      value: listingPrice
    });

    const receipt = await tx.wait();

    const eventSignature =
      "idMarketItemCreated(uint256,address,address,uint256,bool)";
    const eventTopic = ethers.id(eventSignature);

    const eventLog = receipt.logs.find(
      (log: { topics: string[]; address: string }) =>
        log.topics[0] === eventTopic && log.address === CONTRACT_ADDRESS
    );

    if (!eventLog) {
      console.error("Event not found in logs. Full receipt:", receipt);
      return null;
    }

    // Parse the event data
    const iface = new ethers.Interface(CONTRACT_ABI);
    const parsedLog = iface.parseLog(eventLog);
    const tokenId = parsedLog?.args.tokenId;

    return Number(tokenId);
  } catch (error) {
    console.error("Error minting NFT:", error);
    return null;
  }
};
