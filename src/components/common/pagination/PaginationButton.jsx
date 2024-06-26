import React from 'react';
function PaginationButton({ setPage, page, totalPages }) {
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
  const handlePreviousPage = async () => {
    setPage(page => Math.max(page - 1, 0)); // 이전 페이지로 이동
  };

  // const handleNextPage = async () => {
  //   setPage(page => Math.min(page + 1, posts.totalPages - 1)); // 다음 페이지로 이동
  // };
  const handleNextPage = async () => {
    // 현재 페이지가 마지막 페이지보다 작은 경우에만 페이지를 증가시킵니다.
    if (page < totalPages - 1) {
      // 현재 페이지를 업데이트합니다.
      setPage(page => page + 1);
    }
  };
  const handlePageChange = pageNumber => {
    setPage(pageNumber);
  };
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
