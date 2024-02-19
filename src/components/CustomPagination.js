import React from "react";

const CustomPagination = ({ totalPages, currentPage, onChange }) => {
  const visiblePagesCount = 5;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const visiblePages =
    totalPages <= visiblePagesCount
      ? pages
      : (() => {
          const start =
            currentPage <= Math.floor(visiblePagesCount / 2)
              ? 0
              : Math.min(
                  currentPage - Math.floor(visiblePagesCount / 2),
                  totalPages - visiblePagesCount
                );
          return pages.slice(start, start + visiblePagesCount);
        })();

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="customPagination">
      <div className="customPag flex space-x-2">
        {!isFirstPage && (
          <button
            onClick={() => onChange(null, currentPage - 1)}
            className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-700"
          >
            Prev
          </button>
        )}
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => onChange(null, page)}
            className={`px-3 py-1 border border-gray-300 rounded ${
              page === currentPage
                ? "bg-blue-500 currentPage text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {page}
          </button>
        ))}
        {!isLastPage && (
          <button
            onClick={() => onChange(null, currentPage + 1)}
            className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-700"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomPagination;
