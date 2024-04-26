import axios from 'axios';

// const API_URL = 'http://localhost:3000';
const API_URL = 'http://localhost:8080/api/v1';

//나의 판매내역 > 판매중 리스트
export const fetchMySellOngoing = async () => {
  const accessToken = localStorage.getItem('access-token');
  console.log(accessToken);
  try {
    const response = await axios.get(
      `${API_URL}/transactions?memberType=SELLER_ONGOING`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    console.log(response);
    console.log(response.data.content);
    return response.data.content;
  } catch (error) {
    console.error('Error fetching: ', error);
  }
};

//나의 판매내역 > 판매완료 리스트
export const fetchMySellClose = async () => {
  const accessToken = localStorage.getItem('access-token');
  // console.log(accessToken);
  try {
    const response = await axios.get(
      `${API_URL}/transactions?memberType=SELLER_CLOSE`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    console.log(response);
    console.log(response.data.content);
    return response.data.content;
  } catch (error) {
    console.error('Error fetching: ', error);
  }
};

//나의 구매내역 > 거래완료 리스트
export const fetchMyBuyList = async () => {
  const accessToken = localStorage.getItem('access-token');

  try {
    const response = await axios.get(
      `${API_URL}/transactions?memberType=BUYER`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    console.log(response);
    console.log(response.data.content);
    return response.data.content;
  } catch (error) {
    console.error('Error fetching: ', error);
  }
};

//나의 관심목록 > 판매완료 리스트
export const fetchMyLikes = async page => {
  const accessToken = localStorage.getItem('access-token');
  console.log(page);
  try {
    const response = await axios.get(`${API_URL}/wastes/likes`, {
      params: { page },
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    console.log(response);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching: ', error);
  }
};
