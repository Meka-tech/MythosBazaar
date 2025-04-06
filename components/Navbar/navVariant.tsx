import React, { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import ConnectButton from "../ConnectButton";
import WalletItem from "./WalletItem";
import { useRouter } from "next/navigation";
import { useWallet } from "@/context/WalletContext";

const NavVariant = () => {
  const { walletAddress, switchToSepolia } = useWallet();
  const router = useRouter();

  useEffect(() => {
    switchToSepolia();
  }, []);
  return (
    <nav className="w-full h-20 left-0   py-4  flex items-center justify-between sticky">
      <div
        className="w-10 h-10 rounded-full bg-neutral-900  cursor-pointer flex items-center justify-center"
        onClick={() => router.back()}
      >
        <FaArrowLeft />
      </div>
      <div className="flex items-center gap-2">
        {!walletAddress && <ConnectButton />}
        {walletAddress && <WalletItem />}
      </div>
    </nav>
  );
};

export default NavVariant;
