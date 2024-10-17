import { AxiosInstance, RawAxiosRequestConfig } from 'axios';
import { axios, CustomAxiosPrivate, CustomAxiosPublic } from 'src/modules/axios/config';
import { CustomAxiosPrivate as CustomAxiosPrivateWithoutRefresh } from 'src/modules/axios/custom-axios-private';
import { logoutAndCleanSession } from 'src/api/auth/logout';
import { logMain } from 'src/modules/logger/logger';

// Set global variables (mostly for logger colors)
const COLOR_DEBUG = 'cyan';
const COLOR_SUCCESS = 'lightgreen';
// const COLOR_FAIL = 'yellow';
const COLOR_ERROR = 'pink';

export class ServerError extends Error {}

export const request = (
  requestConfig: RawAxiosRequestConfig,
  options?: { isPublic?: boolean; noSessionRefresh?: boolean },
) => {
  // Select correct axios instance for request type (public / private / private without session refresh)
  let CustomAxios: AxiosInstance;

  if (options?.isPublic) {
    CustomAxios = CustomAxiosPublic;
  } else if (options?.noSessionRefresh) {
    CustomAxios = CustomAxiosPrivateWithoutRefresh;
  } else {
    CustomAxios = CustomAxiosPrivate;
  }

  const { method, url } = requestConfig;

  logMain.debug(`%c[REQUEST] ${method?.toUpperCase()} ${url}`, `color: ${COLOR_DEBUG};`);

  // Send HTTP Request using respective Axios instance (Public / Private Request)
  return CustomAxios({ ...requestConfig })
    .then(response => {
      const { status, data } = response;

      if (status < 200 || status >= 300) {
        throw new Error(data.message || `Request failed with status ${status}`);
      }

      logMain.debug(`%c[REQUEST] ${method?.toUpperCase()} ${url} ${status}`, `color: ${COLOR_SUCCESS};`, { data });

      return Promise.resolve(data);
    })
    .catch(e => {
      logMain.debug(
        `%c[REQUEST] ${method?.toUpperCase()} ${url} ${e?.response?.status || null}`,
        `color: ${COLOR_ERROR};`,
      );

      if (e?.response?.status === 401 && !options?.isPublic) {
        logMain.error('[REQUEST]: 401 Unauthorized - Preparing to clean local state...');

        if (window.wagmiDisconnect) {
          window.wagmiDisconnect();
        } else {
          logoutAndCleanSession({ showMessage: true });
        }
      }

      if (e?.response?.data?.message) {
        return Promise.reject(new ServerError(e.response.data.message));
      }

      if (axios.isAxiosError(e)) {
        logMain.debug(`%c[REQUEST] (ERROR) Axios Error --> ${e.message}`, `color: ${COLOR_ERROR};`);

        return Promise.reject(new Error(e.message));
      }

      logMain.debug('%c[REQUEST] (ERROR) Unexpected Error -->', `color: ${COLOR_ERROR};`, e);

      return Promise.reject(new Error('An unexpected error occurred.'));
    });
};
