import React from 'react';

const CategoryDropDown = ({ handleCategoryChange }) => {
  return (
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
  );
};

export default CategoryDropDown;
