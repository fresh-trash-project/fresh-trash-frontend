import axios from 'axios';

// const API_URL = 'http://localhost:3000';
const API_URL = 'http://localhost:8080/api/v1';

export const fetchMyTrade = async () => {
  const accessToken = localStorage.getItem('access-token');
  try {
    const response = await axios.get(`${API_URL}/transactions`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    console.log(response);
    return response;
  } catch (error) {
    console.error('Error fetching: ', error);
  }
};
