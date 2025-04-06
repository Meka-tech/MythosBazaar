import { useState, useMemo, useEffect } from "react";
import NFTCard from "../NFTCard";
import { MarketItem } from "@/types/types";
import NoItems from "./noItem";
import GridSkeleton from "./gridSkeleton";
import Pagination from "./pagination";
import NoSearchItem from "./noSearchItem";
import SearchFilter from "./searchFilter";

interface NFTGridProps {
  items?: MarketItem[];
  loading?: boolean;
  itemsPerPage?: number;
}

export default function NFTGrid({
  items,
  loading,
  itemsPerPage = 6
}: NFTGridProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("off");

  const filteredItems = useMemo(() => {
    if (!items) return [];

    const filtered = items.filter((item) =>
      item.title?.toLowerCase().includes(search.toLowerCase())
    );

    if (sortOrder === "off") {
      return filtered;
    }

    return [...filtered].sort((a, b) => {
      if (sortOrder === "up") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }, [items, search, sortOrder]);

  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredItems.slice(offset, offset + itemsPerPage);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const handlePriceFilter = () => {
    if (sortOrder === "off") {
      setSortOrder("down");
    } else if (sortOrder === "down") {
      setSortOrder("up");
    } else {
      setSortOrder("off");
    }
  };

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(0);
  }, [search]);

  if (items?.length === 0 && !loading) {
    return <NoItems />;
  }

  if (loading) {
    return <GridSkeleton items={itemsPerPage} />;
  }

  return (
    <div className="flex flex-col mb-10">
      <SearchFilter
        search={search}
        setSearch={(value) => setSearch(value)}
        sortOrder={sortOrder}
        handlePriceFilter={handlePriceFilter}
      />

      {filteredItems.length === 0 ? (
        <NoSearchItem />
      ) : (
        <>
          <div className="py-4">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6">
              {currentItems.map((item) => (
                <NFTCard key={item.tokenId} item={item} />
              ))}
            </div>
          </div>

          {pageCount > 1 && (
            <Pagination
              pageCount={pageCount}
              handlePageChange={(selected) => handlePageChange(selected)}
              currentPage={currentPage}
            />
          )}
        </>
      )}
    </div>
  );
}
