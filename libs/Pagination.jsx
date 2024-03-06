import React from "react";
// import classnames from "classnames";
import { usePagination, DOTS } from "./usePagination";
// import "./pagination.scss";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <div className="flex items-center justify-center text-sm">
      <button
        className={`bg-slate-200 px-2 py-1 rounded-md w-10 mx-1 ${
          currentPage === 1 && "hidden"
        }`}
        onClick={onPrevious}
      >
        «
      </button>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <div key={pageNumber}>&#8230;</div>;
        }

        return (
          <>
            <button
              className={`bg-slate-200 px-2 py-1 rounded-md w-10 mx-1 ${
                pageNumber === currentPage && "bg-slate-500 text-white"
              }`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </>
        );
      })}
      <button
        className={`bg-slate-200 px-2 py-1 rounded-md w-10 mx-1 ${
          currentPage === lastPage && "hidden"
        }`}
        onClick={onNext}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
