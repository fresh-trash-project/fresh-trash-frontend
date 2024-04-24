import axios from 'axios';
const API_URL = 'http://localhost:8080'; // 백엔드 서버 주소

export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/wastes`);
    console.log('게시물 목록을 불러왔습니다:', response.data);
    return response.data; // 서버로부터 받은 데이터 반환
  } catch (error) {
    console.error('게시물 목록을 가져오는 중 에러 발생:', error);
    throw error; // 에러를 다시 throw하여 상위 컴포넌트에서 처리할 수 있도록 함
  }
};

// export const createPost = async postData => {
//   try {
//     const response = await axios.post(`${API_URL}/api/v1/wastes`, postData);
//     if (response.status === 201) {
//       console.log('게시물 생성완료', response.data);
//       return response.data;
//     } else {
//       console.log('게시물을 생성하는 중 에러 발생:', response.statusText);
//       throw new Error(
//         `게시물 생성 요청에 실패했습니다. 상태 코드: ${response.status}`,
//       );
//     }
//     //
//   } catch (error) {
//     console.error('게시물을 생성하는 중 에러 발생:', error);
//     throw error; // 에러를 다시 throw하여 상위 컴포넌트에서 처리할 수 있도록 함
//   }
// };
// export const createPost = async productData => {
//   try {
//     const { imgFile, ...otherData } = productData;
//     const formData = new FormData();
//     formData.append('imgFile', imgFile);

//     const jsonBlob = new Blob([JSON.stringify(otherData)], {
//       type: 'application/josn',
//     });
//     formData.append('jsonData', jsonBlob);

//     const response = await axios.post('${API_URL}/wastes', formData);
//     if (response.status === 201) {
//       console.log('게시물 생성완료', response.data);
//       return response.data;
//     }
//   } catch (error) {
//     console.error('게시물을 생성하는 중 오류가 발생했습니다:', error);
//     throw error;
//   }
// };
// export const createPost = async (
//   title,
//   content,
//   wasteCategory,
//   wasteStatus,
//   sellStatus,
//   wastePrice,
//   address,
//   imgFile,
//   navigate,
// ) => {
//   try {
//     const wasteRequest = {
//       title: title,
//       content: content,
//       wasteCategory: wasteCategory,
//       wasteStatus: wasteStatus,
//       sellStatus: sellStatus,
//       wastePrice: wastePrice,
//       address: {
//         zipcode: address.zonecode,
//         state: address.state,
//         city: address.city,
//         district: address.district,
//         detail: address.detail,
//       },
//     };
//     const json = JSON.stringify(wasteRequest);
//     const blob = new Blob([json], { type: 'application/json' });

//     const formData = new FormData();
//     formData.append('imgFile', imgFile);
//     formData.append('wasteRequest', blob);

//     const response = await axios.post(`${API_URL}/wastes`, formData);
//     if (response.status === 201) {
//       console.log('게시물 생성을 완료했습니다.', response.data);
//       navigate('/ProductsList');
//     }
//   } catch (error) {
//     console.log('게시물 생성을 실패하였습니다.', error);
//   }
// };
// let token = localStorage.getItem('access-token');
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

//develop에 있는 거
// export const createPost = async postData => {
//   try {
//     const response = await axios.post(`${API_URL}/wastes`, postData);
//     if (response.status === 201) {
//       console.log('게시물 생성완료', response.data);
//       return response.data;
//     }
//   } catch (error) {
//     console.error('게시물을 생성하는 중 에러 발생:', error);
//     throw error; // 에러를 다시 throw하여 상위 컴포넌트에서 처리할 수 있도록 함
//   }
// };
//상세페이지 api
export const detailWaste = async wasteId => {
  try {
    const response = await axios.get(`${API_URL}/wastes/${wasteId}`);
    console.log('상품 상세정보를 불러왔습니다:', response.data);
    return response.data; // 서버로부터 받은 데이터 반환
  } catch (error) {
    console.error('상품 상세정보를 가져오는 중 에러 발생:', error);
    throw error; // 에러를 다시 throw하여 상위 컴포넌트에서 처리할 수 있도록 함
  }
};
export const deletePost = async wasteId => {
  try {
    await axios.delete(`http://localhost:3000/wastes/${wasteId}`);
  } catch (error) {
    console.error('게시물을 삭제하는 중 오류가 발생했습니다:', error);
    throw error; // 오류를 다시 throw하여 컴포넌트에서 처리할 수 있도록 함
  }
};
export const updatePost = async (wasteId, updatedPost) => {
  const response = await axios.put(`${API_URL}/wastes/${wasteId}`, updatedPost);
  return response.data;
};
