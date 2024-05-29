import React from 'react';

import ProductForm from '../common/form/ProductForm';

const AddForm = () => {
  return (
    <div className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
      <div className="mr-8  text-sm float-end breadcrumbs">
        <ul>
          <li>홈</li>
          <li>애물단지등록</li>
        </ul>
      </div>
      <div className=" flex justify-center mt-20  ">
        <ProductForm initialData={{}} isEditMode={false} />
      </div>
    </div>
  );
};

export default AddForm;
