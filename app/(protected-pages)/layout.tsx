"use client";

import { useEffect } from "react";
import { useWallet } from "@/context/WalletContext";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { signer, walletAddress } = useWallet();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!walletAddress) {
        router.back();
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [walletAddress, router]);

  return (
    <>
      <main>{children}</main>
    </>
  );
}
