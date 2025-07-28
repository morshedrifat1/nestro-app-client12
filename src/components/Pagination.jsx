import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({setCurrentPage,totalPages,currentPage}) => {

  const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <nav className="flex items-center justify-center space-x-2 text-sm font-medium">
      {/* Previous */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 sm:px-3.5 rounded-md border flex items-center gap-2 text-sm mr-3 cursor-pointer ${
          currentPage === 1
            ? "text-base-300 bg-boxbg border-mainborder hover:bg-base-100"
              : "bg-base-300 text-accent border-mainborder" 
        }`}
      >
       <ChevronLeft size={17}></ChevronLeft> <span className="hidden sm:inline">Previous</span> 
      </button>

      {/* pages */}
      {pagesArray.map((page) => (
        <button
        onClick={() => handlePageChange(page)}
          className={`px-3 py-2 sm:px-3.5 rounded-md border cursor-pointer ${
            currentPage === page
              ? "bg-base-300 text-accent border-mainborder"
              : "text-base-300 bg-boxbg border-mainborder hover:bg-base-100"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Ellipsis */}
      {totalPages>3 && <span className="px-3 py-1 text-gray-500 select-none">...</span>}

      {/* Next */}
      <button
        onClick={() => handlePageChange(currentPage < pagesArray.length ? currentPage + 1 : 1)}
        disabled={currentPage === pagesArray}
        className={`px-3 py-2 sm:px-3.5 rounded-md border ml-2 flex items-center gap-2 text-sm cursor-pointer ${
          currentPage <= pagesArray.length
            ? "bg-base-300 text-accent border-mainborder"
              : "text-base-300 bg-boxbg border-mainborder hover:bg-base-100"
        }`}
      >
        <span className="hidden sm:inline">Next</span> <ChevronRight size={17}></ChevronRight>
      </button>
    </nav>
  );
};
export default Pagination;
