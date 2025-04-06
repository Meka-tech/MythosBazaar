"use client";
import { fetchNFTs } from "@/actions/fetchNFTs";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NFTGrid from "@/components/NFTGrid";
import { MarketItem } from "@/types/types";
import { showErrorToast } from "@/utils/toast";
import React, { useEffect, useState } from "react";

const MarketPlace = () => {
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
    <section className="w-full">
      <Navbar />
      <div className="mt-8">
        <h1 className="font-bold text-3xl mb-20">Market Place</h1>
        <div className="min-h-dvh mb-10 ">
          <NFTGrid
            items={nfts?.filter((item) => !item.sold)}
            loading={loading}
            itemsPerPage={20}
          />
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default MarketPlace;
