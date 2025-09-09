import axios from "./axios.customize";

export const createUserApi = (name, email, password) => {
  const URL_API = "/v1/api/register";
  const data = { name, email, password };
  return axios.post(URL_API, data);
};

export const loginApi = (email, password) => {
  const URL_API = "/v1/api/login";
  const data = { email, password };
  return axios.post(URL_API, data);
};

export const getUserApi = (page = 1, limit = 10) => {
  const URL_API = "/v1/api/user";
  return axios.get(URL_API, {
    params: {
      page,
      limit,
    },
  });
};

export const getProductApi = (page = 1, limit = 10, filters = {}) => {
  const URL_API = "/v1/api/product";

  // Gộp page, limit với filters vào params
  return axios.get(URL_API, {
    params: {
      page,
      limit,
      ...filters, // { category, promotion, minPrice, maxPrice, minViews, maxViews, rating }
    },
  });
};
