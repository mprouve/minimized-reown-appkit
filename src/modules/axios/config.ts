import axios from 'axios';
import { customAxiosResponse } from 'src/modules/axios/interceptors/custom-axios-response';
import { customAxiosPrivateRequestWithRefresh } from './interceptors/custom-axios-private-request-with-refresh';
import { customAxiosPrivateResponseWithRefresh } from './interceptors/custom-axios-private-response-with-refresh';
import { createCustomAxios } from './custom-axios';

// Custom Axios Instances
const CustomAxiosPublic = createCustomAxios();
const CustomAxiosPrivateWithRefresh = createCustomAxios();

// Interceptors
const INTERCEPTORS = {
  customAxiosResponse,
  customAxiosPrivateRequestWithRefresh,
  customAxiosPrivateResponseWithRefresh,
};

CustomAxiosPublic.interceptors.response.use(INTERCEPTORS.customAxiosResponse, e => Promise.reject(e));

CustomAxiosPrivateWithRefresh.interceptors.request.use(INTERCEPTORS.customAxiosPrivateRequestWithRefresh, e =>
  Promise.reject(e),
);
CustomAxiosPrivateWithRefresh.interceptors.response.use(
  INTERCEPTORS.customAxiosResponse,
  INTERCEPTORS.customAxiosPrivateResponseWithRefresh,
);

export { axios, CustomAxiosPublic, CustomAxiosPrivateWithRefresh as CustomAxiosPrivate };
