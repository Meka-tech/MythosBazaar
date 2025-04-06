"use client";
import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import { MarketItem } from "@/types/types";
import { fetchUserNFTs } from "@/actions/fetchUserNfts";
import NFTGrid from "@/components/NFTGrid";
import { useWallet } from "@/context/WalletContext";
import { ShortenWallet } from "../../../utils/shortenWallet";
import { FaEthereum } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { GetProfileImage } from "@/utils/getPfp";
import { showErrorToast } from "@/utils/toast";

export default function Profile() {
  const { signer, walletAddress } = useWallet();
  const [nfts, setNfts] = useState<MarketItem[]>([]);
  const [listedNfts, setListedNfts] = useState<MarketItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const FetchMarketItems = async () => {
    setLoading(true);
    try {
      if (!signer) {
        return;
      }
      const result: MarketItem[] = await fetchUserNFTs(signer);

      setNfts(result.filter((item) => item.owner === walletAddress));
      setListedNfts(
        result.filter((item) => item.seller === walletAddress && !item.sold)
      );
    } catch (err) {
      showErrorToast(err);
    } finally {
      setLoading(false);
    }
  };

  const hasSigner = useMemo(() => {
    if (signer) {
      return true;
    }
    return false;
  }, [signer]);

  useEffect(() => {
    FetchMarketItems();
  }, [hasSigner]);

  if (!walletAddress && !signer) {
    return;
  }
  return (
    <section className="">
      <Navbar />
      <div className="px-2 md:px-0">
        <div className="mt-5 mb-10 md:my-10">
          <Image
            width={100}
            height={100}
            src={GetProfileImage(walletAddress) || ""}
            alt="profile-image"
            className="w-30 h-30 md:w-50 md:h-50 rounded-full bg-neutral-400 mb-4 border-[6px] border-zinc-900"
          />
          {walletAddress && (
            <div className="flex items-center gap-1 ml-4">
              <FaEthereum size={20} className="" />
              <p className="md:text-lg font-medium">
                {ShortenWallet(walletAddress)}
              </p>{" "}
            </div>
          )}
        </div>
        <div className="mb-20">
          <div className="mb-4 md:mb-10 pb-1 md:pb-3 border-b-[1px] border-b-neutral-800">
            <h2 className="text-2xl md:text-3xl font-extrabold ">
              Your Collection
            </h2>
          </div>
          <div>
            <div className="p-2 md:py-2 md:px-3 bg-neutral-800 rounded-lg w-fit">
              <h4 className="text-sm md:text-md">
                {nfts?.length} Item{nfts?.length > 1 ? "s" : ""}
              </h4>
            </div>
          </div>
          <NFTGrid items={nfts} loading={loading} />
        </div>

        <div className="mb-20">
          <div className="mb-4 md:mb-10 pb-1 md:pb-3 border-b-[1px] border-b-neutral-800">
            <h2 className="text-2xl md:text-3xl font-extrabold">Listed NFTs</h2>
          </div>
          <div className="p-2 md:py-2 md:px-3 bg-neutral-800 rounded-lg w-fit">
            <h4 className="text-sm md:text-md">
              {listedNfts?.length} Item{listedNfts?.length > 1 ? "s" : ""}
            </h4>
          </div>
          <NFTGrid items={listedNfts} loading={loading} />
        </div>
      </div>
    </section>
  );
}
