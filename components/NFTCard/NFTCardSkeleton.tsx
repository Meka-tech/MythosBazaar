import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NFTCardSkeleton = () => {
  return (
    <Skeleton
      className="h-72 md:h-100 rounded-lg"
      baseColor="#21242a"
      highlightColor="#3f444b"
    />
  );
};

export default NFTCardSkeleton;
