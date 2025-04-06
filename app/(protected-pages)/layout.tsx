"use client";

import { useEffect } from "react";
import { useWallet } from "@/context/WalletContext";
import { useRouter } from "next/navigation";
import ConnectWalletPage from "./connectWalletPage";
import Footer from "@/components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { signer, walletAddress, switchToSepolia } = useWallet();

  if (!walletAddress) {
    return <ConnectWalletPage />;
  }

  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
}
