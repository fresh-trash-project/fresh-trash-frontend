import axios from 'axios';

// const API_URL = 'http://localhost:3000';
// const API = 'http://localhost:8080/api/v1';
const API_URL =
  'http://ec2-43-203-18-244.ap-northeast-2.compute.amazonaws.com:8080/api/v1';

//나의 판매내역 > 판매중 리스트
export const fetchMySellOngoing = async page => {
  const accessToken = localStorage.getItem('access-token');
  // console.log(accessToken);
  try {
    const response = await axios.get(
      `${API_URL}/transactions?memberType=SELLER_ONGOING`,
      { params: { page }, headers: { Authorization: `Bearer ${accessToken}` } },
    );

    console.log(response);
    console.log(response.data.content);
    return response.data;
  } catch (error) {
    console.error('Error fetching: ', error);
    if (error.response.status === 404) {
      console.log('404에러: 토큰삭제 로그아웃');
      localStorage.removeItem('access-token');
    }
  }
};

//나의 판매내역 > 판매완료 리스트
export const fetchMySellClose = async page => {
  const accessToken = localStorage.getItem('access-token');
  // console.log(accessToken);
  try {
    const response = await axios.get(
      `${API_URL}/transactions?memberType=SELLER_CLOSE`,
      { params: { page }, headers: { Authorization: `Bearer ${accessToken}` } },
    );

    console.log(response);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching: ', error);
    if (error.response.status === 404) {
      console.log('404에러: 토큰삭제 로그아웃');
      localStorage.removeItem('access-token');
    }
  }
};

//나의 구매내역 > 거래완료 리스트
export const fetchMyBuyList = async page => {
  const accessToken = localStorage.getItem('access-token');

  try {
    const response = await axios.get(
      `${API_URL}/transactions?memberType=BUYER`,
      { params: { page }, headers: { Authorization: `Bearer ${accessToken}` } },
    );

    console.log(response);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching: ', error);
    if (error.response.status === 404) {
      console.log('404에러: 토큰삭제 로그아웃');
      localStorage.removeItem('access-token');
    }
  }
};

//나의 관심목록 > 판매완료 리스트
export const fetchMyLikes = async page => {
  const accessToken = localStorage.getItem('access-token');

  try {
    const response = await axios.get(`${API_URL}/wastes/likes`, {
      params: { page },
      // params: { page, wasteCategory: selectedCategory },
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    console.log(response);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching: ', error);
    if (error.response.status === 404) {
      console.log('404에러: 토큰삭제 로그아웃');
      localStorage.removeItem('access-token');
    }
  }
};
