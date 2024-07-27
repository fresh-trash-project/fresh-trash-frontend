export const globalAPI = import.meta.env.VITE_API_URL + 'api/v1';
export const globalAuthAPI = `${globalAPI}/auth`;
export const globalOauthAPI =
  import.meta.env.VITE_API_URL + 'oauth2/authorization';
export const globalMailAPI = `${globalAPI}/mail`;
export const globalProductsAPI = `${globalAPI}/products`;
export const globalChatAPI = `${globalAPI}/chats`;
export const globalAuctionsAPI = `${globalAPI}/auctions`;
export const globalProductDealsAPI = `${globalAPI}/productDeals`;
export const globalMembersAPI = `${globalAPI}/members`;
export const globalNotisAPI = `${globalAPI}/notis`;
export const globalFileAPI = import.meta.env.VITE_FileURL;
export const globalProductDeals = `${globalAPI}/productDeals`;
