import axios from 'axios';
// const API_URL =
//   'http://ec2-43-203-127-248.ap-northeast-2.compute.amazonaws.com:8080'; // 백엔드 서버 주소
const API_URL = import.meta.env.VITE_API_URL;
const axiosWithToken = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: {
    // 'Content-Type': 'application/json',
    Authorization: localStorage.getItem('access-token'),
  },
});

export const fetchProducts = async (currentPage, query) => {
  try {
    const response = await axiosWithToken.get('/wastes');
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
    throw error; // 에러를 다시 throw하여 상위 컴포넌트에서 처리할 수 있도록 함
  }
};

const fetchQuery = async query => {
  try {
    const response = await axiosWithToken.get(`/wastes${query}`);
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
    throw error; // 에러를 다시 throw하여 상위 컴포넌트에서 처리할 수 있도록 함
  }
};
export const fetchWastes = {
  getPage: async currentPage => await fetchQuery(`?page=${currentPage}`),
  likeCount: async sort => await fetchQuery(`?sort=${sort}`),
  viewCount: async sort => await fetchQuery(`?sort=${sort}`),
  titleSearch: async (keyword, currentPage) =>
    await fetchQuery(`?title=${keyword}&page=${currentPage}`),
  districtSearch: async (keyword, currentPage) =>
    await fetchQuery(`?district=${keyword}&page=${currentPage}`),
  category: async (search, currentPage) =>
    await fetchQuery(`?category=${search}&page=${currentPage}`),
};

export const createPost = async (
  title,
  content,
  wasteCategory,
  wasteStatus,
  sellStatus,
  wastePrice,
  address,
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
        zipcode: address.zipcode,
        state: address.state,
        city: address.city,
        district: address.district,
        detail: address.detail,
      },
    };
    const json = JSON.stringify(wasteRequest);
    const blob = new Blob([json], { type: 'application/json' });

    const formData = new FormData();
    formData.append('imgFile', imgFile);
    formData.append('wasteRequest', blob);

    const accessToken = localStorage.getItem('access-token');
    // if (!accessToken || accessToken.split('.').length !== 3) {
    //   throw new Error('올바른 형식의 액세스 토큰이 없습니다.');
    // }
    const response = await axios.post(`${API_URL}/api/v1/wastes`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 액세스 토큰을 헤더에 추가
        // 'Content-Type': 'multipart/form-data', // 요청의 컨텐츠 타입 지정
      },
    });
    if (response.status === 201) {
      console.log('게시물 생성을 완료했습니다.', response.data);
      navigate('/ProductsList');
    }
  } catch (error) {
    console.log('게시물 생성을 실패하였습니다.', error);
  }
};

//상세페이지 api
export const detailWaste = async wasteId => {
  try {
    const response = await axiosWithToken.get(`/wastes/${wasteId}`);
    if (response.status === 200) {
      console.log('상품 상세정보를 불러왔습니다:', response.data);
      return response.data; // 서버로부터 받은 데이터 반환
    }
  } catch (error) {
    console.error('상품 상세정보를 가져오는 중 에러 발생:', error);
    throw error; // 에러를 다시 throw하여 상위 컴포넌트에서 처리할 수 있도록 함
  }
};
//폐기물 삭제 api
export const deleteWaste = async wasteId => {
  try {
    const response = await axiosWithToken.delete(`/wastes/${wasteId}`);
    if (response.status === 204) {
      console.log('게시물 삭제 성공');
    }
  } catch (error) {
    console.error('게시물을 삭제하는 중 오류가 발생했습니다:', error);
  }
};
//폐기물 수정 api
// export const updatePost = async (wasteId, updatedPost) => {
//   try {
//     const response = await axiosWithToken.put(
//       `/wastes/${wasteId}`,
//       updatedPost,
//     );
//     if (response.status === 200) {
//       console.log('수정 완료', response.data);
//       return response.data;
//     }
//   } catch (error) {
//     console.log('수정 실패', error);
//   }
// };

export const updatePost = async (
  wasteId,
  title,
  content,
  wasteCategory,
  wasteStatus,
  sellStatus,
  wastePrice,
  address,
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
        zipcode: address.zipcode,
        state: address.state,
        city: address.city,
        district: address.district,
        detail: address.detail,
      },
    };
    const json = JSON.stringify(wasteRequest);
    const blob = new Blob([json], { type: 'application/json' });
    var formData = new FormData();
    console.log(imgFile);
    formData.append('imgFile', imgFile);
    formData.append('wasteRequest', blob);

    const accessToken = localStorage.getItem('access-token');
    const response = await axios.put(
      `${API_URL}/api/v1/wastes/${wasteId}`,
      formData,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    if (response.status === 200) {
      console.log('폐기물 수정 성공', response.data);
      navigate(`/ProductDetail/${wasteId}`);
    }
    return response;
  } catch (error) {
    console.log('폐기물 수정 실패', error);
  }
};
//관심 추가 api
export const likeWaste = async (wasteId, query) => {
  try {
    const response = await axiosWithToken.post(
      `/wastes/${wasteId}/likes?likeStatus=${query}`,
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
    throw error; // 오류를 다시 throw하여 컴포넌트에서 처리할 수 있도록 함
  }
};
