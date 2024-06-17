import { globalAuctionsAPI } from '../../variable';
import createAxiosWithToken from './Axios';

const axiosWithTokenAuctions = createAxiosWithToken(globalAuctionsAPI);
