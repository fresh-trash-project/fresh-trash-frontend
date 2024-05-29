import React from 'react';
function PaginationButton({
  handlePreviousPage,
  handleNextPage,
  page,
  totalPages,
}) {
  const pagesPerGroup = 4;
  const currentGroup = Math.floor(page / pagesPerGroup);
  const getPageNumbers = () =>
    Array.from(
      {
        length: Math.min(
          pagesPerGroup,
          totalPages - currentGroup * pagesPerGroup,
        ),
      },
      (_, i) => i + 1 + currentGroup * pagesPerGroup,
    );
  return (
    <div>
      <button
        onClick={handlePreviousPage}
        disabled={page === 0}
        className="join-item btn mr-4"
      >
        이전
      </button>
      {getPageNumbers().map(pageNumber => (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber - 1)}
          className={`join-item btn mr-4 ${page === pageNumber - 1 ? 'btn-active' : ''}`}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={handleNextPage}
        disabled={page === totalPages - 1}
        className="join-item btn "
      >
        다음
      </button>
    </div>
  );
}

export default PaginationButton;
