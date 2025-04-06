"use client";

import { useWallet } from "../context/WalletContext";
import PrimaryButton from "./button";

export default function ConnectButton() {
  const { connectWallet } = useWallet();

  const handleConnect = async () => {
    await connectWallet();
  };

  return (
    <PrimaryButton
      text="Connect Wallet"
      className="bg-neutral-800 hover:bg-neutral-700 w-fit px-4"
      onClick={handleConnect}
    />
  );
}
