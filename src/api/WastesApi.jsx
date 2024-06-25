import { globalProductsAPI } from '../../variable';
import createAxiosWithToken from './Axios';

const axiosWithTokenWastes = createAxiosWithToken(globalProductsAPI);

export const fetchProducts = async (currentPage, query) => {
  try {
    const response = await axiosWithTokenWastes.get('');
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
    throw error; // 에러를 다시 throw하여 상위 컴포넌트에서 처리할 수 있도록 함
  }
};

const fetchQuery = async query => {
  try {
    const response = await axiosWithTokenWastes.get(`${query}`);
    // const response = await axiosWithToken.get('/wastes?page');
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
export const fetchWastes = {
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
  wasteCategory,
  wasteStatus,
  sellStatus,
  wastePrice,
  address = {},
  imgFile,
  navigate,
) => {
  try {
    const wasteRequest = {
      title: title,
      content: content,
      wasteCategory: wasteCategory,
      wasteStatus: wasteStatus,
      sellStatus: sellStatus,
      wastePrice: wastePrice,
      address: {
        zipcode: address.zipcode || '', // default value
        state: address.state || '', // default value
        city: address.city || '', // default value
        district: address.district || '', // default value
        detail: address.detail || '', // default value
      },
    };
    const json = JSON.stringify(wasteRequest);
    const blob = new Blob([json], { type: 'application/json' });

    const formData = new FormData();
    console.log(imgFile);
    formData.append('imgFile', imgFile);
    formData.append('wasteRequest', blob);

    const response = await axiosWithTokenWastes.post(``, formData, {
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
export const detailWaste = async wasteId => {
  try {
    const response = await axiosWithTokenWastes.get(`/${wasteId}`);
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
export const deleteWaste = async wasteId => {
  try {
    const response = await axiosWithTokenWastes.delete(`/${wasteId}`);
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

export const updatePost = async (
  wasteId,
  title,
  content,
  wasteCategory,
  wasteStatus,
  sellStatus,
  wastePrice,
  address = {},
  imgFile,
  navigate,
) => {
  try {
    const wasteRequest = {
      title: title,
      content: content,
      wasteCategory: wasteCategory,
      wasteStatus: wasteStatus,
      sellStatus: sellStatus,
      wastePrice: wastePrice,
      address: {
        zipcode: address.zipcode || '', // default value
        state: address.state || '', // default value
        city: address.city || '', // default value
        district: address.district || '', // default value
        detail: address.detail || '', // default value
      },
    };
    const json = JSON.stringify(wasteRequest);
    const blob = new Blob([json], { type: 'application/json' });
    var formData = new FormData();
    console.log(imgFile);
    formData.append('imgFile', imgFile);
    formData.append('wasteRequest', blob);

    const response = await axiosWithTokenWastes.put(`/${wasteId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // 이 줄은 생략해도 됩니다
      },
    });
    if (response.status === 200) {
      console.log('폐기물 수정 성공', response.data);
      navigate(`/ProductDetail/${wasteId}`);
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
export const likeWaste = async (wasteId, query) => {
  try {
    const response = await axiosWithTokenWastes.post(
      `/${wasteId}/likes?likeStatus=${query}`,
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
