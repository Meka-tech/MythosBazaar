import React from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import ReactPaginate from "react-paginate";

interface IProps {
  pageCount: number;
  handlePageChange: ({ selected }: { selected: number }) => void;
  currentPage: number;
}
const Pagination = ({ pageCount, handlePageChange, currentPage }: IProps) => {
  return (
    <ReactPaginate
      previousLabel={<GrPrevious />}
      nextLabel={<GrNext />}
      pageCount={pageCount}
      onPageChange={(selected) => handlePageChange(selected)}
      forcePage={currentPage}
      containerClassName={"flex justify-center items-center gap-2 my-8"}
      pageClassName={"flex items-center justify-center cursor-pointer"}
      pageLinkClassName={
        "px-3 py-1 rounded-md text-neutral-800 hover:bg-neutral-700 hover:text-neutral-200 transition-colors"
      }
      activeClassName={"bg-transparent text-white"}
      activeLinkClassName={"bg-neutral-800 text-white hover:bg-neutral-700"}
      previousClassName={"flex items-center"}
      previousLinkClassName={
        "px-3 py-1 text-neutral-800 hover:text-neutral-500 cursor-pointer transition-colors"
      }
      nextClassName={"flex items-center"}
      nextLinkClassName={
        "px-3 py-1 text-neutral-800 hover:text-neutral-500 cursor-pointer transition-colors"
      }
      disabledClassName={"opacity-50 cursor-not-allowed"}
      disabledLinkClassName={
        "opacity-50 cursor-not-allowed hover:bg-transparent"
      }
      breakLabel={"..."}
      breakClassName={"flex items-center"}
      breakLinkClassName={"px-3 py-1 text-neutral-800"}
    />
  );
};

export default Pagination;
