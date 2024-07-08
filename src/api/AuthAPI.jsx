import createAxiosWithToken from './Axios';
import { globalAuthAPI } from '../../variable';

const axiosWithTokenAuth = createAxiosWithToken(globalAuthAPI);

export const fetchAuthUserInfo = async (navigate, setSignIn, location) => {
  const query = new URLSearchParams(location.search);
  const token = query.get('token');

  if (token) {
    localStorage.setItem('accessToken', token);
    try {
      const response = await axiosWithTokenAuth.get('/userinfo');
      if (response.status === 200) {
        setSignIn(true);
        navigate('/');
        return response.data;
      }
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
};
