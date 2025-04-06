import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonComponent = () => {
  return (
    <div className="px-2 md:px-0">
      <div className="mt-5 mb-6 md:mb-0 md:mt-0 flex flex-col md:grid grid-cols-2 gap-1 md:gap-10">
        <div className="md:hidden block">
          <Skeleton
            width={"200px"}
            className=" h-8 rounded-lg mb-2"
            baseColor="#21242a"
            highlightColor="#3f444b"
          />
          <Skeleton
            width={"100px"}
            className=" h-4 rounded-lg mb-10"
            baseColor="#21242a"
            highlightColor="#3f444b"
          />
        </div>
        <Skeleton
          className="mb-10 md:mb-0 w-150 h-96 md:h-150 rounded-lg"
          baseColor="#21242a"
          highlightColor="#3f444b"
        />
        <div className="flex flex-col">
          <div className="hidden md:block">
            <Skeleton
              width={"200px"}
              className=" h-8 rounded-lg mb-2"
              baseColor="#21242a"
              highlightColor="#3f444b"
            />
            <Skeleton
              width={"100px"}
              className=" h-4 rounded-lg mb-10"
              baseColor="#21242a"
              highlightColor="#3f444b"
            />
          </div>
          <Skeleton
            className=" h-40 md:h-96 rounded-lg mb-12"
            baseColor="#21242a"
            highlightColor="#3f444b"
          />
          <Skeleton
            className="h-15 rounded-lg mt-auto"
            baseColor="#21242a"
            highlightColor="#3f444b"
          />
        </div>
      </div>
    </div>
  );
};

export default SkeletonComponent;
