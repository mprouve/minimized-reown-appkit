import { InternalAxiosRequestConfig } from 'axios';
import { LocalStorage } from 'src/local-storage/local-storage';
import { CustomAxiosPublic } from 'src/modules/axios/config';
import processNewLogin from 'src/tools/processNewLogin';
import { logoutAndCleanSession } from 'src/api/auth/logout';
import { logMain } from 'src/modules/logger/logger';

// Keep a single refresh promise to ensure that any requests coming in
// during a refresh are tacked onto the end of the current refresh attempt.
// Also ensures that there can only be one refresh attempt at a time.
/* eslint-disable @typescript-eslint/no-explicit-any */
let refreshPromise: Promise<any> | undefined;

export const refreshSession = (config: InternalAxiosRequestConfig) => {
  const deviceId = LocalStorage.get('device_id');
  const refreshToken = LocalStorage.get('refresh_token');

  if (refreshPromise) return refreshPromise;
  if (!refreshToken) throw new Error('No refresh token');

  // The refresh-session request is a public request that does not take a
  // bearer token.
  refreshPromise = CustomAxiosPublic({
    method: 'post',
    url: '/api/web/auth/refresh-session',
    data: {
      deviceId,
      refreshToken,
    },
  })
    .then(response => {
      logMain.debug('[REFRESH_SESSION]: Successfully refreshed session!');
      const { data } = response;
      const modifiedConfig = config;
      modifiedConfig.headers.Authorization = `Bearer ${data.sessionToken}`;

      processNewLogin(data, { fromRefresh: true });

      return modifiedConfig;
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .catch(() => {
      logMain.debug('[REFRESH_SESSION]: Failed to refresh session!');

      // Clear users local state variables if refresh fails
      if (window.wagmiDisconnect) {
        window.wagmiDisconnect();
      } else {
        logoutAndCleanSession({ showMessage: true });
      }

      throw new Error('[REFRESH_SESSION]: Failed to refresh session.');
    })
    .finally(() => {
      refreshPromise = undefined;
    });

  return refreshPromise;
};
