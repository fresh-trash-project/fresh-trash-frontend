import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';

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
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1">
            카테고리
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li onClick={() => handleCategoryChange('전체')}>
              <p>전체</p>
            </li>
            <li onClick={() => handleCategoryChange('ELECTRONICS')}>
              <p>전자기기</p>
            </li>
            <li onClick={() => handleCategoryChange('CLOTHING')}>
              <p>의류</p>
            </li>
            <li onClick={() => handleCategoryChange('HOME_KITCHEN')}>
              <p>생활/주방</p>
            </li>
            <li onClick={() => handleCategoryChange('BEAUTY')}>
              <p>뷰티</p>
            </li>
            <li onClick={() => handleCategoryChange('HEALTH')}>
              <p>건강</p>
            </li>
            <li onClick={() => handleCategoryChange('SPORTS')}>
              <p>스포츠</p>
            </li>
            <li onClick={() => handleCategoryChange('BOOKS')}>
              <p>도서</p>
            </li>
            <li onClick={() => handleCategoryChange('TOYS_GAMES')}>
              <p>장난감/게임</p>
            </li>
            <li onClick={() => handleCategoryChange('FURNITURE_DECOR')}>
              <p>가구/인테리어</p>
            </li>
            <li onClick={() => handleCategoryChange('PET_SUPPLIES')}>
              <p>반려동물용품</p>
            </li>
            <li onClick={() => handleCategoryChange('PLANT_SUPPLIES')}>
              <p>식물</p>
            </li>
          </ul>
        </div>
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
            <button className="btn btn-square btn-ghost">
              <FaPlus size="25" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListNav;
