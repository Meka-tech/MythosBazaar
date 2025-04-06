"use client";
import { MarketItem } from "@/types/types";
import Image from "next/image";
import { buyNFT } from "../../actions/buyNFT";
import { useWallet } from "../../context/WalletContext";

import CardDetails from "./cardDetails";
import { useMemo, useRef, useState } from "react";
import EthImg from "@/app/assets/images/ethereum_black.png";
import { useRouter } from "next/navigation";
import { FaEthereum } from "react-icons/fa6";

interface NFTCardProps {
  item: MarketItem;
}

export default function NFTCard({ item }: NFTCardProps) {
  // Placeholder NFT image

  const { signer, walletAddress } = useWallet();

  const OnBuyNft = async () => {
    if (!signer) {
      alert("Connect your wallet");
      return;
    }
    try {
      await buyNFT(item.tokenId, item.price.toString(), signer);
    } catch (err) {
      alert("Something went wrong");
    }
  };
  const [hover, setHover] = useState(false);
  const leaveTimeout = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const sellerView = useMemo(() => {
    if (walletAddress === item.seller) {
      return true;
    }
    return false;
  }, [walletAddress, item.seller]);

  const handleMouseEnter = () => {
    if (leaveTimeout.current) {
      clearTimeout(leaveTimeout.current);
      leaveTimeout.current = null;
    }
    setHover(true);
  };

  const handleMouseLeave = () => {
    leaveTimeout.current = setTimeout(() => {
      setHover(false);
    }, 1000);
  };

  return (
    <div
      className=" rounded-lg overflow-hidden shadow-black/50 shadow-lg hover:shadow-xl transition-shadow duration-300 relative h-72 md:h-100 w-full min-w-10 "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {item.image && (
        <Image
          src={item.image}
          alt={`NFT #${item.tokenId}`}
          fill
          onClick={() => {
            router.push(`/nft/${item.tokenId}`);
          }}
          className={`${
            hover ? "scale-110" : "scale-100"
          } object-cover rounded-lg absolute w-full h-full transition-all duration-300 ease-in-out cursor-pointer`}
        />
      )}

      <div className="absolute top-4 left-4 z-10 bg-blend-color backdrop-blur-sm p-2 rounded-lg border-[1px] border-white/10">
        <p
          className={`${
            hover ? "md:text-md" : "text-xs"
          }  font-semibold text-white transition-all ease-in-out duration-300`}
        >
          {item.price} ETH
        </p>
      </div>

      <div
        className={`${
          hover ? "" : "md:translate-x-[200%]"
        } absolute top-4 right-4 z-10 bg-blend-color backdrop-blur-sm p-2 rounded-lg border-[1px] border-white/10 transition-all duration-300 ease-in-out`}
      >
        <FaEthereum size={30} />
      </div>

      <CardDetails
        buy={() => OnBuyNft()}
        title={item.title || ""}
        sold={item.sold}
        description={item.description || ""}
        owner={item.owner}
        seller={item.seller}
        show={hover}
        sellerView={sellerView}
        id={item.tokenId}
      />
    </div>
  );
}
