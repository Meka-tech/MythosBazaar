"use client";

import ConnectButton from "../ConnectButton";
import { useWallet } from "../../context/WalletContext";
import WalletItem from "./WalletItem";
import { useState } from "react";
import PrimaryButton from "../button";
import { useRouter } from "next/navigation";
import HamburgerMenu from "./hamburgerMenu";
import Logo from "../Logo";

export default function Navbar() {
  const { walletAddress, signer } = useWallet();
  const [hamburgerOpen, setOpenHamburger] = useState(false);

  const router = useRouter();
  return (
    <nav className="py-4 sticky w-full  top-0 z-100  bg-neutral-950">
      <div className="flex justify-between items-center">
        <Logo />

        <div className="hidden md:flex items-center gap-2">
          {signer && (
            <PrimaryButton
              onClick={() => router.push("/create")}
              text="Create"
              className="bg-transparent hover:bg-transparent font-bold w-fit "
            />
          )}

          {!walletAddress && <ConnectButton />}
          {walletAddress && <WalletItem />}
        </div>
        <div className="flex md:hidden">
          {!walletAddress ? (
            <ConnectButton />
          ) : (
            <HamburgerMenu
              isOpen={hamburgerOpen}
              setIsOpen={setOpenHamburger}
            />
          )}
        </div>
      </div>
    </nav>
  );
}
