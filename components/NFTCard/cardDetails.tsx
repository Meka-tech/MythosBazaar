import React, { useRef, useState } from "react";
import PrimaryButton from "../button";
import { ShortenWallet } from "@/utils/shortenWallet";
import { useRouter } from "next/navigation";
import { useWallet } from "@/context/WalletContext";
import { CONTRACT_ADDRESS } from "@/constants";

const CardDetails = ({
  title,
  owner,
  seller,
  sold,
  description,
  id,
  buy,
  show,
  sellerView
}: {
  title: string;
  owner: string;
  sold: boolean;
  seller: string;
  description: string;
  id: number;
  buy: () => void;
  show?: boolean;
  sellerView?: boolean;
}) => {
  const [hover, setHover] = useState(false);
  const leaveTimeout = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const { walletAddress } = useWallet();

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
      className={`${show ? "" : "md:translate-y-[200%]"} ${
        hover
          ? "md:flex-col md:items-start"
          : "flex-row items-center justify-between"
      } absolute z-10 bottom-4 left-1/2 -translate-x-1/2 w-[90%] rounded-lg md:px-3 md:py-4 p-2 bg-blend-color bg-black/20 backdrop-blur-sm border-[1px] border-white/10  flex  duration-300 ease-in-out transition-all `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`${
          hover
            ? " md:flex-row md:items-center md:justify-between md:w-full md:pb-1 md:mb-1 md:border-b-[1px] md:border-b-white/20 "
            : " flex-col "
        } flex flex-col`}
      >
        <h3 className="text-xs md:text-lg text-white font-semibold">{title}</h3>
        {walletAddress === owner ? (
          <></>
        ) : (
          <p className="inline-flex text-[8px] md:text-xs">
            By{" "}
            {owner === CONTRACT_ADDRESS
              ? "Mythos Bazaar"
              : ShortenWallet(owner)}
          </p>
        )}
      </div>

      <div
        className={`${
          hover
            ? "md:opacity-100 md:block"
            : "absolute opacity-0 -translate-x-[100%]"
        } p-1 hidden max-h-[12rem] overflow-scroll`}
      >
        <p className="text-xs">{description}</p>
        <p className="text-xs mt-2">Seller : {ShortenWallet(seller)}</p>
      </div>
      {sellerView && !sold ? (
        <PrimaryButton
          onClick={() => {
            // buy();
          }}
          text="View"
          className={`${
            hover ? "md:w-full md:mt-2" : "w-fit"
          }  bg-black hover:bg-black text-[8px] md:text-sm w-fit ml-auto`}
        />
      ) : !sold && !sellerView ? (
        <PrimaryButton
          onClick={() => {
            router.push(`/nft/${id}`);
          }}
          text="Buy"
          className={`${
            hover ? "md:w-full md:mt-2" : "w-fit"
          }  bg-black hover:bg-black text-[8px] md:text-sm w-fit ml-auto`}
        />
      ) : (
        <PrimaryButton
          onClick={() => {
            router.push(`/list/${id}`);
          }}
          text="List for sale"
          className={`${
            hover ? "md:w-full md:mt-2" : "w-fit"
          }  bg-black hover:bg-black text-[8px] md:text-sm w-fit ml-auto`}
        />
      )}
    </div>
  );
};

export default CardDetails;
