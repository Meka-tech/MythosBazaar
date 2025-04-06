import React from "react";
import NFTCardSkeleton from "../NFTCard/NFTCardSkeleton";

const GridSkeleton = ({ items }: { items: number }) => {
  const Skeletons = new Array(items).fill(0);
  return (
    <div className="py-4">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6">
        {Skeletons.map((_, i) => (
          <NFTCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default GridSkeleton;
