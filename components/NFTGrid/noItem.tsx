import React from "react";
import { BsBox } from "react-icons/bs";

const NoItems = () => {
  return (
    <div className=" w-full flex items-center justify-center flex-col mt-8 md:mt-10">
      <BsBox size={40} className="text-neutral-700 mb-4" />
      <p className="text-neutral-700 md:text-lg font-medium">
        No NFTs in this Collection
      </p>
    </div>
  );
};

export default NoItems;
