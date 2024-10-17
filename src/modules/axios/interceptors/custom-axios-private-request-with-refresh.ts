import { InternalAxiosRequestConfig } from 'axios';
import { customAxiosPrivateRequest } from 'src/modules/axios/interceptors/custom-axios-private-request';
import { refreshSession } from 'src/modules/axios/refresh-session';
import isLocalSessionRefreshNeeded from 'src/tools/isLocalSessionRefreshNeeded';
import { logMain } from 'src/modules/logger/logger';

export const customAxiosPrivateRequestWithRefresh = (config: InternalAxiosRequestConfig) => {
  const modifiedConfig = customAxiosPrivateRequest(config);

  if (isLocalSessionRefreshNeeded()) {
    logMain.debug('[INTERCEPTOR_PRIVATE_REQUEST]: Refreshing session...');

    return refreshSession(modifiedConfig);
  }

  return modifiedConfig;
};
