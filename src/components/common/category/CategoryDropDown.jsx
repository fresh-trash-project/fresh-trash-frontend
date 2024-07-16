import React from 'react';
import { useTranslation } from 'react-i18next';

const CategoryDropDown = ({ handleCategoryChange }) => {
  const { t } = useTranslation();
  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn m-1">
        {t('CATEGORY')}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li onClick={() => handleCategoryChange('전체')}>
          <p>{t('ALL')}</p>
        </li>
        <li onClick={() => handleCategoryChange('ELECTRONICS')}>
          <p>{t('ELECTRONICS')}</p>
        </li>
        <li onClick={() => handleCategoryChange('CLOTHING')}>
          <p>{t('CLOTHING')}</p>
        </li>
        <li onClick={() => handleCategoryChange('HOME_KITCHEN')}>
          <p>{t('HOME_KITCHEN')}</p>
        </li>
        <li onClick={() => handleCategoryChange('BEAUTY')}>
          <p>{t('BEAUTY')}</p>
        </li>
        <li onClick={() => handleCategoryChange('HEALTH')}>
          <p>{t('HEALTH')}</p>
        </li>
        <li onClick={() => handleCategoryChange('SPORTS')}>
          <p>{t('SPORTS')}</p>
        </li>
        <li onClick={() => handleCategoryChange('BOOKS')}>
          <p>{t('BOOKS')}</p>
        </li>
        <li onClick={() => handleCategoryChange('TOYS_GAMES')}>
          <p>{t('TOYS_GAMES')}</p>
        </li>
        <li onClick={() => handleCategoryChange('FURNITURE_DECOR')}>
          <p>{t('FURNITURE_DECOR')}</p>
        </li>
        <li onClick={() => handleCategoryChange('PET_SUPPLIES')}>
          <p>{t('PET_SUPPLIES')}</p>
        </li>
        <li onClick={() => handleCategoryChange('PLANT_SUPPLIES')}>
          <p>{t('PLANT_SUPPLIES')}</p>
        </li>
      </ul>
    </div>
  );
};

export default CategoryDropDown;
