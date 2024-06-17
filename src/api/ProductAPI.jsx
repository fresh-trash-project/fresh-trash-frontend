import { globalProductsAPI } from '../../variable';
import createAxiosWithToken from './Axios';

const axiosWithTokenProducts = createAxiosWithToken(globalProductsAPI);
//목록페이지
const fetchQuery = async query => {
  try {
    const response = await axiosWithTokenProducts.get(`${query}`);
    const responseData = response.data;
    if (response.status === 200) {
      console.log('게시물 목록을 가져오기 성공', response.data);
      return {
        content: responseData.content,
        totalPages: responseData.totalPages,
        totalElements: responseData.totalElements,
        pageable: responseData.pageable,
      };
    }

    // 서버로부터 받은 데이터 반환
  } catch (error) {
    console.error('게시물 목록을 가져오는 중 에러 발생:', error);
    if (error.response.status === 404) {
      console.log(
        '404 Error: 요청한 리소스를 찾을 수 없습니다. 토큰삭제 로그아웃',
      );
      localStorage.removeItem('accessToken');
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
    console.log(imgFile);
    formData.append('imgFile', imgFile);
    formData.append('productRequest', blob);

    const response = await axiosWithTokenProducts.post(``, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // 이 줄은 생략해도 됩니다
      },
    });
    if (response.status === 201) {
      console.log('게시물 생성을 완료했습니다.', response.data);
      navigate('/ProductsList');
    }
  } catch (error) {
    console.error('게시물 생성을 실패하였습니다.', error);
    if (error.response.status === 404) {
      console.log(
        '404 Error: 요청한 리소스를 찾을 수 없습니다. 토큰삭제 로그아웃',
      );
      localStorage.removeItem('accessToken');
    }
    throw error;
  }
};

//상세페이지 api
export const detailProduct = async productId => {
  try {
    const response = await axiosWithTokenProducts.get(`/${productId}`);
    if (response.status === 200) {
      console.log('상품 상세정보를 불러왔습니다:', response.data);
      return response.data; // 서버로부터 받은 데이터 반환
    }
  } catch (error) {
    console.error('상품 상세정보를 가져오는 중 에러 발생:', error);
    if (error.response.status === 404) {
      console.log(
        '404 Error: 요청한 리소스를 찾을 수 없습니다. 토큰삭제 로그아웃',
      );
      localStorage.removeItem('accessToken');
    }
    throw error; // 에러를 다시 throw하여 상위 컴포넌트에서 처리할 수 있도록 함
  }
};
//폐기물 삭제 api
export const deleteProduct = async productId => {
  try {
    const response = await axiosWithTokenProducts.delete(`/${productId}`);
    if (response.status === 204) {
      console.log('게시물 삭제 성공');
    }
  } catch (error) {
    console.error('게시물을 삭제하는 중 오류가 발생했습니다:', error);
    if (error.response.status === 404) {
      console.log(
        '404 Error: 요청한 리소스를 찾을 수 없습니다. 토큰삭제 로그아웃',
      );
      localStorage.removeItem('accessToken');
    }
    throw error;
  }
};
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
    console.log(imgFile);
    formData.append('imgFile', imgFile);
    formData.append('productRequest', blob);

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
      console.log('폐기물 수정 성공', response.data);
      navigate(`/ProductDetail/${productId}`);
    }
    return response;
  } catch (error) {
    console.error('폐기물 수정 실패', error);
    // if (error.response.status === 404) {
    //   console.log(
    //     '404 Error: 요청한 리소스를 찾을 수 없습니다. 토큰삭제 로그아웃',
    //   );
    //   localStorage.removeItem('accessToken');
    // }
    // throw error;
  }
};
//관심 추가 api
export const likeProduct = async (productId, query) => {
  try {
    const response = await axiosWithTokenProducts.post(
      `/${productId}/likes?likeStatus=${query}`,
    );

    if (response.status === 200) {
      if (query === 'UNLIKE') {
        console.log('관심목록 해제 성공');
        console.log(response);
      } else if (query === 'LIKE') {
        console.log('관심목록 추가 성공');
        console.log(response);
      }

      return response.data;
    }
  } catch (error) {
    console.error('관심목록 추가 실패:', error);
    if (error.response.status === 404) {
      console.log(
        '404 Error: 요청한 리소스를 찾을 수 없습니다. 토큰삭제 로그아웃',
      );
      localStorage.removeItem('accessToken');
    }
    throw error; // 오류를 다시 throw하여 컴포넌트에서 처리할 수 있도록 함
  }
};
