"use client";

import { fetchNft } from "@/actions/fetchNft";
import { relistNFT } from "@/actions/relistNft";
import PrimaryButton from "@/components/button";
import NavVariant from "@/components/Navbar/navVariant";
import { useWallet } from "@/context/WalletContext";
import { MarketItem } from "@/types/types";
import { showErrorToast } from "@/utils/toast";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEthereum } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";

export default function ListItem() {
  const params = useParams();
  const router = useRouter();
  const tokenId = params.id;
  const { signer } = useWallet();
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(false);
  const [NFTDetails, setNFTDetails] = useState<MarketItem>();
  const [price, setPrice] = useState("0.1");

  useEffect(() => {
    if (!signer) {
      return;
    }
    const loadData = async () => {
      setLoading(true);
      try {
        const data: MarketItem | null = await fetchNft(Number(tokenId), signer);

        if (!data?.sold) {
          router.back();
        }
        if (data) {
          setNFTDetails(data);
          setPrice(data.price.toString());
        }
      } catch (err) {
        showErrorToast(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [tokenId, signer]);

  const ListNft = async () => {
    setListing(true);
    if (!tokenId || !signer) {
      return;
    }
    try {
      await relistNFT(Number(tokenId), price, signer);
      toast.success(`${NFTDetails?.title} listed successfully`);
      router.push(`/nft/${tokenId}`);
    } catch (err) {
      showErrorToast(err);
    } finally {
      setListing(false);
    }
  };

  return (
    <section className="w-full min-h-dvh">
      <NavVariant />
      <div className="pt-5 md:pt-10 px-4 md:px-10 ">
        <div className="mb-10">
          <h1 className="font-extrabold text-2xl md:text-4xl mb-1 md:mb-2">
            List for sale
          </h1>
          <p className=" text-sm md:text-md">Put your NFT back on the market</p>
        </div>
        <div className="flex flex-col-reverse  md:grid grid-cols-2  w-full">
          <div className="w-full flex  md:justify-center items-end md:mb-10 ">
            <div className="w-full md:w-fit">
              <h3 className=" text-lg md:text-xl font-semibold mb-1">
                Set a Price
              </h3>
              <p className="text-neutral-700 text-xs md:text-sm mb-6 md:mb-4">
                You will not be able to change the price after listing
              </p>
              <div className="w-fit px-4 bg-neutral-900 rounded-lg flex items-center gap-1">
                <input
                  type="number"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  step="0.1"
                  min="0.1"
                  className="w-20  py-2 text-white outline-none"
                  required
                />
                <div className="pl-3 py-2  border-l-[1px] text-sm font-medium border-neutral-700">
                  ETH
                </div>
              </div>
              <PrimaryButton
                text="Complete Listing"
                className="mt-8 md:mt-10"
                disabled={loading || !NFTDetails}
                onClick={ListNft}
                loading={listing}
              />
            </div>
          </div>
          <div className="w-full flex md:justify-center mb-10 md:mb-0  ">
            {NFTDetails ? (
              <div className=" rounded-lg overflow-hidden shadow-black/50 shadow-lg hover:shadow-xl transition-shadow duration-300 relative h-[28rem] w-full md:h-[30rem] md:w-80 min-w-10 ">
                <Image
                  src={NFTDetails.image || ""}
                  alt={`NFT #${tokenId}`}
                  fill
                  className={` object-cover rounded-lg absolute w-full h-full transition-all duration-300 ease-in-out `}
                />

                <div className="absolute top-4 left-4 z-10 bg-blend-color backdrop-blur-sm p-2 rounded-lg border-[1px] border-white/10">
                  <p
                    className={`text-xs"
            font-semibold text-white transition-all ease-in-out duration-300`}
                  >
                    {price} ETH
                  </p>
                </div>

                <div
                  className={`absolute top-4 right-4 z-10 bg-blend-color backdrop-blur-sm p-2 rounded-lg border-[1px] border-white/10 transition-all duration-300 ease-in-out`}
                >
                  <FaEthereum size={20} />
                </div>

                <div
                  className={`absolute z-10 bottom-4 left-1/2 -translate-x-1/2 w-[90%] rounded-lg md:px-3 md:py-4 p-2 bg-blend-color bg-black/20 backdrop-blur-sm border-[1px] border-white/10  flex  duration-300 ease-in-out transition-all `}
                >
                  <div
                    className={
                      " md:flex-row md:items-center md:justify-between md:w-full md:pb-1 md:mb-1  "
                    }
                  >
                    <h3 className="text-lg text-white font-semibold">
                      {NFTDetails.title}
                    </h3>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-[28rem] w-full md:h-[30rem] md:w-80">
                <Skeleton
                  className="h-full w-full rounded-lg"
                  baseColor="#21242a"
                  highlightColor="#3f444b"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
