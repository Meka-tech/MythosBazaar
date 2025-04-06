"use client";
import { useRef, useState } from "react";
import { useWallet } from "@/context/WalletContext";
import { AiOutlineDisconnect } from "react-icons/ai";
import { IoPerson } from "react-icons/io5";
import { useClickOutside } from "@/hooks/UseClickOutside";
import { ShortenWallet } from "@/utils/shortenWallet";
import { IoIosWallet } from "react-icons/io";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { GetProfileImage } from "@/utils/getPfp";

const WalletItem = () => {
  const { walletAddress, disconnectWallet } = useWallet();
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  useClickOutside(ref, () => setIsOpen(false));

  if (!walletAddress) return null;

  return (
    <div className="relative">
      <div
        className="bg-neutral-900 hover:bg-neutral-800 text-white px-3 py-2 rounded-lg cursor-pointer flex gap-2 items-center relative z-10"
        onClick={() => setIsOpen(!isOpen)}
      >
        <IoIosWallet />
        {ShortenWallet(walletAddress)}
        <Image
          src={GetProfileImage(walletAddress)}
          alt="profile-image"
          width={1000}
          height={1000}
          className="w-6 h-6 object-cover rounded-full"
        />
      </div>
      <div
        className={`${
          isOpen
            ? "translate-y-0 opacity-100 z-20"
            : "-translate-y-[100%] opacity-0 z-0"
        } w-full absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-neutral-900 py-2 px-1 rounded-lg shadow-lg cursor-pointer transition-all flex flex-col gap-1 items-center justify-between ease-in-out duration-100`}
        ref={ref}
      >
        <div
          className=" w-full  text-white text-center px-2  py-1.5 rounded-lg  cursor-pointer transition-all flex  items-center gap-2 hover:bg-neutral-800"
          onClick={() => {
            router.push("/profile");
          }}
        >
          <IoPerson />
          Profile
        </div>
        <div
          className={
            " w-full  text-white text-center  py-1.5 rounded-lg  px-2 cursor-pointer transition-all flex  items-center gap-2 hover:bg-neutral-800 "
          }
          onClick={() => {
            disconnectWallet();
            setIsOpen(false);
          }}
        >
          <AiOutlineDisconnect />
          Disconnect
        </div>
      </div>
    </div>
  );
};

export default WalletItem;
