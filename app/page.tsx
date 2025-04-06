"use client";
import NFTGrid from "@/components/NFTGrid";
import { MarketItem } from "@/types/types";
import { useEffect, useState } from "react";
import { fetchNFTs } from "@/actions/fetchNFTs";
import Navbar from "@/components/Navbar";
import { showErrorToast } from "@/utils/toast";

export default function Home() {
  const [nfts, setNfts] = useState<MarketItem[]>();
  const [loading, setLoading] = useState(false);

  const FetchMarketItems = async () => {
    setLoading(true);
    try {
      const Items: MarketItem[] = await fetchNFTs();

      setNfts(Items);
    } catch (err) {
      showErrorToast(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchMarketItems();
  }, []);

  return (
    <div className="min-h-dvh">
      <Navbar />
      <div className=" px-2 md:px-0">
        <h1 className="text-lg md:text-xl font-extrabold mb-4 md:mb-6 text-center">
          Mythical Beasts (Where to find `em)
        </h1>

        <NFTGrid
          items={nfts?.filter((item) => !item.sold)}
          loading={loading}
          itemsPerPage={9}
        />
      </div>
    </div>
  );
}
