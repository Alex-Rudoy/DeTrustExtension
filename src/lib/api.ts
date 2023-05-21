import axios from 'axios';

import { BASE_URL } from './constants';

import { FetchDegensResponse, FetchTokensResponse } from './typings';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const api = {
  getTokens(): Promise<FetchTokensResponse> {
    return axiosInstance.get('/general/getCoinProjectList');
  },

  getDegens(): Promise<FetchDegensResponse> {
    return axiosInstance.get(`/general/degen_list`);
  },
};

export default api;
