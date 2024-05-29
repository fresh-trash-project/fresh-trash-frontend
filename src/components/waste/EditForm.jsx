import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductForm from '../common/form/ProductForm';
import { detailWaste } from '../../api/WastesApi';

const EditForm = () => {
  const { wasteId } = useParams();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await detailWaste(wasteId);
        setInitialData(result);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchData();
  }, [wasteId]);

  if (!initialData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
      <div className="mr-8 float-end text-sm breadcrumbs">
        <ul>
          <li>홈</li>
          <li>수정</li>
        </ul>
      </div>
      <div className=" flex justify-center mt-20  ">
        <ProductForm initialData={initialData} isEditMode={true} />
      </div>
    </div>
  );
};

export default EditForm;
