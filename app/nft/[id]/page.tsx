"use client";
import { fetchNft } from "@/actions/fetchNft";
import PrimaryButton from "@/components/button";
import Navbar from "@/components/Navbar";
import { useWallet } from "@/context/WalletContext";
import { MarketItem } from "@/types/types";
import { ShortenWallet } from "@/utils/shortenWallet";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import React, { useEffect, useMemo, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import SkeletonComponent from "./skeleton";
import { buyNFT } from "@/actions/buyNFT";
import { showErrorToast } from "@/utils/toast";
import { toast } from "react-toastify";

const NFTItem = () => {
  const params = useParams();
  const router = useRouter();
  const tokenId = params.id;
  const { signer, walletAddress } = useWallet();
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);
  const [NFTDetails, setNFTDetails] = useState<MarketItem>();

  useEffect(() => {
    if (!signer) {
      return;
    }
    const loadData = async () => {
      setLoading(true);
      try {
        const data: MarketItem | null = await fetchNft(Number(tokenId), signer);
        if (data) {
          setNFTDetails(data);
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [tokenId, signer]);

  const isSeller = useMemo(() => {
    if (NFTDetails?.seller === walletAddress) {
      return true;
    }
    return false;
  }, [walletAddress, NFTDetails?.seller]);

  const OnBuyNft = async () => {
    if (!signer) {
      alert("Connect your wallet");
      return;
    }
    if (!NFTDetails) {
      return;
    }
    setBuying(true);
    try {
      await buyNFT(NFTDetails.tokenId, NFTDetails.price.toString(), signer);
      toast.success(`You now own ${NFTDetails.title}`);
      router.push("/profile");
    } catch (err) {
      showErrorToast(err);
    } finally {
      setBuying(false);
    }
  };

  return (
    <section className="w-full min-h-dvh">
      <Navbar />
      <div
        className=" mb-4 w-10 h-10 rounded-full bg-neutral-900  cursor-pointer flex items-center justify-center"
        onClick={() => router.back()}
      >
        <FaArrowLeft />
      </div>
      {NFTDetails ? (
        <div className=" pt-5 pb-10 md:pt-0 md:pb-0 px-4 md:px-0 flex flex-col md:grid grid-cols-2 justify-between gap-10 md:gap-20">
          <div className="block md:hidden">
            <h2 className="text-3xl font-bold mb-2">{NFTDetails.title}</h2>
            <p className="text-sm">
              Owned by
              <span className="text-sky-500">
                {isSeller ? "you" : ShortenWallet(NFTDetails.seller)}
              </span>
            </p>
          </div>
          <Image
            src={NFTDetails?.image || ""}
            alt={NFTDetails?.title || "null"}
            width={1000}
            height={1000}
            className="rounded-2xl w-full h-auto  md:w-150 md:h-150 object-cover md:object-contain"
          />
          <div className="flex flex-col">
            <div className="hidden md:block">
              <h2 className="text-3xl font-bold mb-2">{NFTDetails.title}</h2>
              <p className="  mb-8 text-sm">
                Seller:{" "}
                <span className="text-sky-500">
                  {isSeller ? "You" : ShortenWallet(NFTDetails.seller)}
                </span>
              </p>
            </div>
            <div className="mb-20 md:mb-0 md:max-h-96  overflow-scroll">
              <p className="leading-loose">{NFTDetails.description}</p>
            </div>
            <div className="mt-auto w-full px-3 py-4 md:p-4 bg-neutral-900 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-xs  md:text-sm text-neutral-400">Price:</p>
                <p className=" text-lg md:text-2xl font-bold">
                  {NFTDetails.price} ETH
                </p>
              </div>
              {!isSeller ? (
                <PrimaryButton
                  text="Buy"
                  className="w-fit"
                  onClick={OnBuyNft}
                  loading={buying}
                />
              ) : isSeller && NFTDetails.owner === walletAddress ? (
                <PrimaryButton
                  className="w-fit"
                  text="List for sale"
                  onClick={() => {
                    router.push(`/list/${tokenId}`);
                  }}
                />
              ) : (
                <PrimaryButton
                  text="On Sale"
                  disabled
                  className="w-fit bg-black hover:bg-black cursor-not-allowed "
                />
              )}
            </div>
          </div>
        </div>
      ) : !NFTDetails && loading ? (
        <SkeletonComponent />
      ) : (
        <></>
      )}
    </section>
  );
};

export default NFTItem;
