export const globalAPI = import.meta.env.VITE_API_URL + 'api/v1';
export const globalAuthAPI = `${globalAPI}/auth`;
export const globalOauthAPI =
  import.meta.env.VITE_API_URL + 'oauth2/authorization';
export const globalMailAPI = `${globalAPI}/mail`;
export const globalWastesAPI = `${globalAPI}/wastes`;
export const globalAuctionsAPI = `${globalAPI}/auctions`;
export const globalTransactionsAPI = `${globalAPI}/transactions`;
export const globalMembersAPI = `${globalAPI}/members`;
export const globalNotisAPI = `${globalAPI}/notis`;
