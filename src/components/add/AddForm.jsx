import React, { useState } from 'react';

import ProductForm from '../common/form/ProductForm';
import AuctionForm from '../common/form/AuctionForm';
import Label from '../common/label/Label';

const AddForm = () => {
  const [select, setSelect] = useState('거래');
  return (
    <div>
      <Label breadcrumbItems={['홈', '애물단지 등록']} />
      <div className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
        <select
          name=""
          id=""
          className="w-40 border-2 rounded-2xl border-green-brunswick"
          onChange={e => setSelect(e.target.value)}
          required
        >
          <option value="거래">애물단지 거래</option>
          <option value="경매">애물단지 경매</option>
        </select>
      </div>

      <div className="flex justify-center mt-20 ">
        {select === '거래' ? (
          <ProductForm initialData={{}} isEditMode={false} />
        ) : (
          <AuctionForm initialData={{}} isEditMode={false} />
        )}
      </div>

      {/* <div className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
          <select
            name=""
            id=""
            className="w-40 border-2 rounded-2xl border-green-brunswick"
            onChange={e => setSelect(e.target.value)}
            required
          >
            <option value="거래">애물단지 거래</option>
            <option value="경매">애물단지 경매</option>
          </select>

          <div className="flex justify-center mt-20 ">
            {select === '거래' ? (
              <ProductForm initialData={{}} isEditMode={false} />
            ) : (
              <AuctionForm initialData={{}} isEditMode={false} />
            )}
          </div>
        </div> */}
    </div>
  );
};

export default AddForm;
