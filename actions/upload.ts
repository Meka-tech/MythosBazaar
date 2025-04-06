import axios from "axios";
import { PINATA_KEY, PINATA_SECRET } from "@/constants";
export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          pinata_api_key: PINATA_KEY,
          pinata_secret_api_key: PINATA_SECRET
        }
      }
    );
    const url = `https://ipfs.io/ipfs/${res.data.IpfsHash}`;

    return url;
  } catch (error) {
    console.error("IPFS upload error:", error);
    return null;
  }
};

export const uploadJson = async (jsonData: object) => {
  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      jsonData,
      {
        headers: {
          "Content-Type": "application/json",
          pinata_api_key: PINATA_KEY,
          pinata_secret_api_key: PINATA_SECRET
        }
      }
    );

    return `https://ipfs.io/ipfs/${res.data.IpfsHash}`; // Returns the IPFS URL
  } catch (error) {
    console.error("IPFS JSON upload error:", error);
    return null;
  }
};
