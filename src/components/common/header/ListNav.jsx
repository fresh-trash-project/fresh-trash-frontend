import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CategoryDropDown from '../category/CategoryDropDown';
const ListNav = ({
  handleCategoryChange,
  isSearchVisible,
  setIsSearchVisible,
  searchInput,
  setSearchInput,
  handleSearch,
  setSearchType,
  auction,
  product,
}) => {
  return (
    <div className="navbar flex-row justify-between bg-base-100 shadow-md">
      <div className="flex">
        <CategoryDropDown handleCategoryChange={handleCategoryChange} />
      </div>
      <div className="flex">
        <div
          className="btn ml-3 bg-yellow-saffron hover:bg-yellow-saffron sm:hidden relative"
          onClick={() => setIsSearchVisible(!isSearchVisible)}
        >
          <FaSearch />
        </div>
        {isSearchVisible && (
          <div className="flex absolute top-32 right-0 bg-white shadow p-2 sm:hidden">
            <select
              className="select select-bordered rounded-r-none "
              onChange={e => setSearchType(e.target.value)}
            >
              <option>선택</option>
              <option value="district">지역</option>
              <option value="title">제목</option>
            </select>
            <div>
              <div>
                <input
                  className="input input-bordered rounded-l-none "
                  placeholder="Search"
                  type="text"
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                />
              </div>
            </div>
            <div className="indicator">
              <button
                className="btn join-item bg-green-900 text-white sm:flex hidden"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        )}
        <div className="join sm:flex hidden">
          {product ? (
            <select
              className="select select-bordered join-item "
              onChange={e => setSearchType(e.target.value)}
            >
              <option>선택</option>
              <option value="district">지역</option>
              <option value="title">제목</option>
            </select>
          ) : (
            <select
              className="select select-bordered join-item "
              onChange={e => setSearchType(e.target.value)}
            >
              <option>선택</option>
              <option value="title">제목</option>
            </select>
          )}

          <div>
            <div>
              <input
                className="input input-bordered rounded-none "
                placeholder="Search"
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
              />
            </div>
          </div>
          <div className="indicator">
            <button
              className="btn join-item bg-green-900 text-white "
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
        <div className="flex">
          <div className="flex-none">
            <Link to="/ProductAdd">
              <button className="btn btn-square btn-ghost">
                <FaPlus size="25" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListNav;
