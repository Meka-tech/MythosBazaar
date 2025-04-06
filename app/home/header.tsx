import React from "react";
import { FaWpexplorer } from "react-icons/fa6";
import { TbBinocularsFilled } from "react-icons/tb";

const Header = () => {
  return (
    <div className="mb-30 grid grid-cols-2 gap-10">
      <div className="w-full">
        <h1 className="text-2xl md:text-5xl font-extrabold mb-4 text-neutral-300 leading-16 ">
          Mythic Beasts & <br /> where you'd find 'em
        </h1>
        <p className="text-neutral-400 text-lg leading-relaxed mb-10">
          Welcome to <strong className="text-yellow-500">MythosBazaar</strong> —
          your go-to spot for collecting epic NFT creatures from legends and
          lore. Whether you're here to explore, trade, or just vibe with some
          wild designs, I've got you covered. It's all on the testnet, so no
          pressure.
        </p>
        <div className=" w-fit  px-4 py-2 hover:bg-neutral-300 hover:text-black border-transparent border-b-[1px] border-b-neutral-300 cursor-pointer font-medium hover:rounded-lg ease-in-out transition-all duration-300 flex items-center gap-2 text-lg">
          Explore Marketplace <FaWpexplorer size={24} />
        </div>
      </div>
    </div>
  );
};

export default Header;
