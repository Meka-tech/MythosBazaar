"use client";

import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useWallet } from "@/context/WalletContext";
import { AiOutlineDisconnect } from "react-icons/ai";
import { IoPerson } from "react-icons/io5";
import { useClickOutside } from "@/hooks/UseClickOutside";

import { useRouter } from "next/navigation";

import Hamburger from "hamburger-react";
import { MdCreate } from "react-icons/md";

const HamburgerMenu = ({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { disconnectWallet } = useWallet();
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setIsOpen(false));

  return (
    <div className="relative">
      <div className=" text-white   cursor-pointer flex  items-center relative z-10">
        <Hamburger toggled={isOpen} toggle={setIsOpen} size={20} />
      </div>
      <div
        className={`${
          isOpen
            ? "translate-y-0 opacity-100 z-20"
            : "-translate-y-[100%] opacity-0 z-0"
        } w-fit absolute top-full mt-2 transform  -translate-x-[80%] bg-neutral-900 py-2 px-1 rounded-lg shadow-lg cursor-pointer transition-all flex flex-col gap-1 items-center justify-between ease-in-out duration-100 `}
        ref={ref}
      >
        <div
          className=" w-full  text-white text-center px-4  py-1.5 rounded-lg  cursor-pointer transition-all flex  items-center gap-2 hover:bg-neutral-800"
          onClick={() => {
            router.push("/profile");
          }}
        >
          <IoPerson />
          Profile
        </div>
        <div
          className=" w-full  text-white text-center px-4  py-1.5 rounded-lg  cursor-pointer transition-all flex  items-center gap-2 hover:bg-neutral-800"
          onClick={() => {
            router.push("/create");
          }}
        >
          <MdCreate />
          Create
        </div>
        <div
          className={
            " w-full  text-white text-center  py-1.5 rounded-lg  px-4 cursor-pointer transition-all flex  items-center gap-2 hover:bg-neutral-800 "
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

export default HamburgerMenu;
