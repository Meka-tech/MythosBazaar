import { fetchNFTs } from "@/actions/fetchNFTs";
import NFTCard from "@/components/NFTCard";
import { MarketItem } from "@/types/types";
import { showErrorToast } from "@/utils/toast";
import React, { useEffect, useState, useRef } from "react";

const OriginalCollection = () => {
  //   const [nfts, setNfts] = useState<MarketItem[]>([]);
  //   const [loading, setLoading] = useState(false);
  //   const [isHovered, setIsHovered] = useState(false);
  //   const containerRef = useRef<HTMLDivElement>(null);
  //   const contentRef = useRef<HTMLDivElement>(null);
  //   const animationRef = useRef<number>();
  //   const positionRef = useRef(0);

  //   // Animation settings
  //   const scrollSpeed = 0.5; // Pixels per frame (adjust for speed)
  //   const direction = -1; // -1 for left, 1 for right

  //   const FetchMarketItems = async () => {
  //     setLoading(true);
  //     try {
  //       const Items: MarketItem[] = await fetchNFTs();
  //       // Duplicate items for seamless looping
  //       setNfts([...Items, ...Items]);
  //     } catch (err) {
  //       showErrorToast(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   const startAnimation = () => {
  //     if (!contentRef.current) return;

  //     const animate = () => {
  //       if (!isHovered && contentRef.current) {
  //         positionRef.current += direction * scrollSpeed;

  //         // Reset position when we've scrolled one full width
  //         const contentWidth = contentRef.current.scrollWidth / 2;
  //         if (Math.abs(positionRef.current) >= contentWidth) {
  //           positionRef.current = 0;
  //         }

  //         contentRef.current.style.transform = `translateX(${positionRef.current}px)`;
  //       }

  //       animationRef.current = requestAnimationFrame(animate);
  //     };

  //     animationRef.current = requestAnimationFrame(animate);
  //   };

  //   useEffect(() => {
  //     FetchMarketItems();
  //     return () => {
  //       if (animationRef.current) {
  //         cancelAnimationFrame(animationRef.current);
  //       }
  //     };
  //   }, []);

  //   useEffect(() => {
  //     if (nfts.length > 0) {
  //       startAnimation();
  //     }
  //   }, [nfts, isHovered]); // Restart animation when hover state changes

  return (
    <div className="mb-20">
      <h3 className="mb-4 text-2xl font-bold">The Originals</h3>
      {/* <div
        className="w-full overflow-hidden relative min-h-[24rem]"
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          ref={contentRef}
          className="w-fit flex items-center gap-8 will-change-transform"
          style={{
            transition: isHovered ? "transform 0.3s ease-out" : "none"
          }}
        >
          {nfts.map((item, i) => (
            <div
              key={`${i}-${item.tokenId}`}
              className="w-[16rem] flex-shrink-0"
            >
              <NFTCard item={item} />
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default OriginalCollection;

// const OGItems = Items.filter((item) => item.seller === DEPLOY_ADDRESS);
// setNfts([...OGItems, ...OGItems]);
