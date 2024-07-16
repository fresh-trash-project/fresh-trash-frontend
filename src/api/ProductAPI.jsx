import { globalProductsAPI } from '../../variable';
import createAxiosWithToken from './Axios';
import { toast } from 'react-toastify';
import { MESSAGES, CONSOLE } from '../../Constants';
const axiosWithTokenProducts = createAxiosWithToken(globalProductsAPI);
//목록페이지
const fetchQuery = async (query, navigate) => {
  try {
    const response = await axiosWithTokenProducts.get(`${query}`);
    const responseData = response.data;
    if (response.status === 200) {
      console.log(CONSOLE.FETCH_POSTS_SUCCESS, response.data);
      return {
        content: responseData.content,
        totalPages: responseData.totalPages,
        totalElements: responseData.totalElements,
        pageable: responseData.pageable,
      };
    }
  } catch (error) {
    console.error(CONSOLE.FETCH_POSTS_ERROR, error.message);
    if (error.response.status === 401) {
      console.log(CONSOLE.RESOURCE_NOT_FOUND_ERROR);
      localStorage.removeItem('accessToken');
      navigate('/signupsignin');
    }
    throw error; // 에러를 다시 throw하여 상위 컴포넌트에서 처리할 수 있도록 함
  }
};
export const fetchProducts = {
  getPage: async (currentPage, sort) =>
    await fetchQuery(`?page=${currentPage}&sort=${sort}`),

  titleSearch: async (keyword, currentPage, sort) =>
    await fetchQuery(`?title=${keyword}&page=${currentPage}&sort=${sort}`),
  districtSearch: async (keyword, currentPage, sort) =>
    await fetchQuery(`?district=${keyword}&page=${currentPage}&sort=${sort}`),
  category: async (search, currentPage, sort) =>
    await fetchQuery(`?category=${search}&page=${currentPage}&sort=${sort}`),
};
//상품 등록
export const createPost = async (
  title,
  content,
  productCategory,
  productStatus,
  sellStatus,
  productPrice,
  address = {},
  imgFile,
  navigate,
) => {
  try {
    const productRequest = {
      title: title,
      content: content,
      productCategory: productCategory,
      productStatus: productStatus,
      sellStatus: sellStatus,
      productPrice: productPrice,
      address: {
        zipcode: address.zipcode || '', // default value
        state: address.state || '', // default value
        city: address.city || '', // default value
        district: address.district || '', // default value
        detail: address.detail || '', // default value
      },
    };
    const json = JSON.stringify(productRequest);
    const blob = new Blob([json], { type: 'application/json' });

    const formData = new FormData();
    console.log('imgFile', imgFile);
    formData.append('imgFile', imgFile);
    formData.append('productRequest', blob);
    console.log('formData:', formData);
    const response = await axiosWithTokenProducts.post(``, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status === 201) {
      if (!toast.isActive('post-success')) {
        toast.success(MESSAGES.POST_SUCCESS, {
          toastId: 'post-success',
        });
      }
      navigate('/ProductsList');
    }
  } catch (error) {
    console.error(error.message);
    if (error.response.status === 401) {
      console.log(CONSOLE.RESOURCE_NOT_FOUND_ERROR);
      localStorage.removeItem('accessToken');
      navigate('/signupsignin');
    }
    throw error;
  }
};

//상세페이지 api
export const detailProduct = async (productId, navigate) => {
  try {
    const response = await axiosWithTokenProducts.get(`/${productId}`);
    if (response.status === 200) {
      console.log(CONSOLE.FETCH_DETAIL_KUST_SUCCESS, response.data);
      return response.data; // 서버로부터 받은 데이터 반환
    }
  } catch (error) {
    console.error(error.message);
    if (error.response.status === 401) {
      console.log(CONSOLE.RESOURCE_NOT_FOUND_ERROR);
      localStorage.removeItem('accessToken');
      navigate('/signupsignin');
    }
    throw error; // 에러를 다시 throw하여 상위 컴포넌트에서 처리할 수 있도록 함
  }
};
//폐기물 삭제 api
export const deleteProduct = async (productId, navigate) => {
  try {
    const response = await axiosWithTokenProducts.delete(`/${productId}`);
    if (response.status === 204) {
      if (!toast.isActive('delete_product')) {
        toast.success(MESSAGES.DELETE_SUCCESS, {
          toastId: 'delete_product',
        });
      }
    }
  } catch (error) {
    console.error(error.message);
    if (error.response.status === 401) {
      console.log(CONSOLE.RESOURCE_NOT_FOUND_ERROR);
      localStorage.removeItem('accessToken');
      navigate('/signupsignin');
    }
    throw error;
  }
};
async function base64ToFile(base64String, fileName) {
  const response = await fetch(base64String);
  const blob = await response.blob();
  return new File([blob], fileName, { type: blob.type });
}
//폐기물 수정
export const updatePost = async (
  productId,
  title,
  content,
  productCategory,
  productStatus,
  sellStatus,
  productPrice,
  address = {},
  imgFile,
  navigate,
) => {
  try {
    const productRequest = {
      title: title,
      content: content,
      productCategory: productCategory,
      productStatus: productStatus,
      sellStatus: sellStatus,
      productPrice: productPrice,
      address: {
        zipcode: address.zipcode || '', // default value
        state: address.state || '', // default value
        city: address.city || '', // default value
        district: address.district || '', // default value
        detail: address.detail || '', // default value
      },
    };
    const json = JSON.stringify(productRequest);
    const blob = new Blob([json], { type: 'application/json' });
    var formData = new FormData();
    if (imgFile) {
      // 이미지 파일이 base64 문자열일 경우 File 객체로 변환
      const file = await base64ToFile(imgFile, 'image.png');
      formData.append('imgFile', file);
      console.log('imgFile type:', typeof file);
    }
    console.log(imgFile);
    // formData.append('imgFile', imgFile);
    formData.append('productRequest', blob);
    console.log('formData_img:', formData.get('imgFile'));
    console.log('type확인', typeof formData.get('imgFile'));
    const response = await axiosWithTokenProducts.put(
      `/${productId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // 이 줄은 생략해도 됩니다
        },
      },
    );
    if (response.status === 200) {
      if (!toast.isActive('edit-success')) {
        toast.success(MESSAGES.EDIT_SUCCESS, {
          toastId: 'edit-success',
        });
      }
      navigate(`/ProductDetail/${productId}`);
    }
    return response;
  } catch (error) {
    console.error(CONSOLE.EDIT_SUCCESS, error.message);
    if (error.response.status === 401) {
      console.log(CONSOLE.RESOURCE_NOT_FOUND_ERROR);
      localStorage.removeItem('accessToken');
      navigate('/signupsignin');
    }
    throw error;
  }
};
//관심 추가 api
export const likeProduct = async (productId, query, navigate) => {
  try {
    const response = await axiosWithTokenProducts.post(
      `/${productId}/likes?likeStatus=${query}`,
    );

    if (response.status === 200) {
      if (query === 'UNLIKE') {
        if (!toast.isActive('delete_like')) {
          toast.error(MESSAGES.DELETE_LIKES, {
            toastId: 'delete_like',
          });
        }
        console.log(response);
      } else if (query === 'LIKE') {
        if (!toast.isActive('add_like')) {
          toast.success(MESSAGES.ADD_LIKES, {
            toastId: 'add_like',
          });
        }
        console.log(response);
      }

      return response.data;
    }
  } catch (error) {
    if (error.response.status === 401) {
      console.log(CONSOLE.RESOURCE_NOT_FOUND_ERROR);
      localStorage.removeItem('accessToken');
      navigate('/signupsignin');
    }
    throw error; // 오류를 다시 throw하여 컴포넌트에서 처리할 수 있도록 함
  }
};
