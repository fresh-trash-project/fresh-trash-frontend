import React, { useState } from 'react';
import ProductForm from './ProductForm';
import AuctionForm from './AuctionForm';
import Label from '../common/label/Label';
import { useTranslation } from 'react-i18next';
const AddForm = () => {
  const { t } = useTranslation();
  const [select, setSelect] = useState('거래');
  return (
    <div>
      <Label breadcrumbItems={[t('HOME_UPPER_ENG'), t('ADD_PRODUCT')]}>
        <div className=" xl:container mx-auto">
          <select
            name=""
            id=""
            className="w-40 border-2 rounded-2xl border-green-brunswick"
            onChange={e => setSelect(e.target.value)}
            required
          >
            <option value="거래">{t('TRADE_ITEM')}</option>
            <option value="경매">{t('AUCTION_ITEM')}</option>
          </select>
        </div>
      </Label>
      {/* <Label breadcrumbItems={[t('HOME_UPPER_ENG'), t('ADD_PRODUCT')]}/>
        <div className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
          <select
            name=""
            id=""
            className="w-40 border-2 rounded-2xl border-green-brunswick"
            onChange={e => setSelect(e.target.value)}
            required
          >
            <option value="거래">{t('TRADE_ITEM')}</option>
            <option value="경매">{t('AUCTION_ITEM')}</option>
          </select>
        </div>
       */}
      <div className="flex justify-center mt-20 ">
        {select === '거래' ? (
          <ProductForm initialData={{}} isEditMode={false} />
        ) : (
          <AuctionForm initialData={{}} isEditMode={false} />
        )}
      </div>
    </div>
  );
};

export default AddForm;
