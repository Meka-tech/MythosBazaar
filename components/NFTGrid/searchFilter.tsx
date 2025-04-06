import React from "react";
import { IoCaretDown, IoCaretUpOutline, IoSearch } from "react-icons/io5";

interface IProps {
  search: string;
  setSearch: (text: string) => void;
  sortOrder: string;
  handlePriceFilter: () => void;
}
const SearchFilter = ({
  search,
  setSearch,
  sortOrder,
  handlePriceFilter
}: IProps) => {
  return (
    <div className="w-full flex items-center justify-center mb-6 gap-2">
      <div className="p-2  md:px-3 md:py-2 rounded-lg border-[1px] border-neutral-900 flex gap-1 md:gap-2 items-center">
        <IoSearch className="text-neutral-600" />
        <input
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-xs md:text-sm outline-none border-none w-[10rem] md:w-[18rem] placeholder:text-neutral-600 text-neutral-300"
        />
      </div>
      <div
        onClick={handlePriceFilter}
        className={`${
          sortOrder !== "off"
            ? "bg-neutral-800/50"
            : " border-[1px] border-neutral-900"
        } py-1.5 px-2 md:p-2   flex items-center gap-2 rounded-lg cursor-pointer`}
      >
        <p
          className={`${
            sortOrder !== "off" ? "text-neutral-200" : "text-neutral-500"
          } text-xs md:text-sm`}
        >
          Price
        </p>
        <div>
          <IoCaretUpOutline
            size={10}
            className={`${
              sortOrder === "up" ? "text-neutral-200" : "text-neutral-500"
            } `}
          />
          <IoCaretDown
            size={10}
            className={`${
              sortOrder === "down" ? "text-neutral-200" : "text-neutral-500"
            } `}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
