import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../form/ProductForm';
import { detailProduct } from '../../api/ProductAPI';
import Label from '../common/label/Label';
import { useTranslation } from 'react-i18next';

const Edit = () => {
  const { t } = useTranslation();
  const { productId } = useParams();
  const [initialData, setInitialData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await detailProduct(productId, navigate);
        setInitialData(result);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchData();
  }, [productId]);

  if (!initialData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="xl:container ">
      <Label
        breadcrumbItems={[t('HOME'), t('PRODUCT_DETAIL_PAGE'), t('EDIT')]}
      />
      <div className=" flex justify-center mt-20  ">
        <ProductForm initialData={initialData} isEditMode={true} />
      </div>
    </div>
    // <div className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
    //   <div className="mr-8 float-end text-sm breadcrumbs">
    //     <ul>
    //       <li>홈</li>
    //       <li>수정</li>
    //     </ul>
    //   </div>
    //   <div className=" flex justify-center mt-20  ">
    //     <ProductForm initialData={initialData} isEditMode={true} />
    //   </div>
    // </div>
  );
};

export default Edit;
