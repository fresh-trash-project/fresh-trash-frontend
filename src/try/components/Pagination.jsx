import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { postsState } from '../../../recoil/RecoilWastes';
import { GrFormNext } from 'react-icons/gr';
import { GrFormPrevious } from 'react-icons/gr';
const MAX_PAGES_DISPLAY = 6;
const ITEMS_PER_PAGE = 6;
const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const getPageNumbers = () => {
    const startPage = Math.max(
      1,
      currentPage - Math.floor(MAX_PAGES_DISPLAY / 2),
    );
    const endPage = Math.min(totalPages, startPage + MAX_PAGES_DISPLAY - 1);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => index + startPage,
    );
  };
  return (
    <div className=" container flex justify-center mb-16">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="join-item btn mr-2"
      >
        <GrFormPrevious />
      </button>
      {getPageNumbers().map(pageNumber => (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className="join-item btn"
        >
          {pageNumber}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="join-item btn ml-2"
      >
        <GrFormNext />
      </button>
    </div>
  );
};

export default Pagination;
