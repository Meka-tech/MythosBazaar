import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants";

export const GetListingPrice = async () => {
  try {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI);

    const listingPrice = await contract.getListingPrice();

    return listingPrice;
  } catch (err) {}
};
