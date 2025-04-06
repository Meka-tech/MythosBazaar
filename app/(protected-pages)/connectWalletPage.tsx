import ConnectButton from "@/components/ConnectButton";
import Navbar from "@/components/Navbar";
import React from "react";

const ConnectWalletPage = () => {
  return (
    <div>
      <div className="min-h-dvh flex items-center justify-center flex-col">
        <p className="text-xl mb-2">Connect wallet to continue</p>
        <ConnectButton />
      </div>
    </div>
  );
};

export default ConnectWalletPage;
