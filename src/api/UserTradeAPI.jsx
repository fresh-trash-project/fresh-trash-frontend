import axios from 'axios';

// const API_URL = 'http://localhost:3000';
const API_URL = 'http://localhost:8080/api/v1';

export const fetchMySellList = async () => {
  const accessToken = localStorage.getItem('access-token');
  // console.log(accessToken);
  try {
    const response = await axios.get(
      `${API_URL}/transactions?memberType=SELLER`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    console.log(response);
    return response.data.content;
    // console.log(response.data.content);
  } catch (error) {
    console.error('Error fetching: ', error);
  }
};
