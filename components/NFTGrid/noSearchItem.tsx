import React from "react";
import { LuSearchX } from "react-icons/lu";

const NoSearchItem = () => {
  return (
    <div className=" w-full flex items-center justify-center flex-col mt-8 md:mt-10">
      <LuSearchX size={40} className="text-neutral-700 mb-4" />
      <p className="text-neutral-700 md:text-lg font-medium">
        No NFTs match your search
      </p>
    </div>
  );
};

export default NoSearchItem;
