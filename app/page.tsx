"use client";
import NFTGrid from "@/components/NFTGrid";
import { MarketItem } from "@/types/types";
import { useEffect, useState } from "react";
import { fetchNFTs } from "@/actions/fetchNFTs";
import Navbar from "@/components/Navbar";
import { showErrorToast } from "@/utils/toast";
import PrimaryButton from "@/components/button";
import Footer from "@/components/Footer";
import HowItWorks from "./home/howItWorks";
import Header from "./home/header";
import OriginalCollection from "./home/original";

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
    <section className="min-h-dvh">
      <Navbar />
      <div className=" mt-20 px-2 md:px-0">
        <Header />
        <OriginalCollection />
        <HowItWorks />
      </div>
      <Footer />
    </section>
  );
}
