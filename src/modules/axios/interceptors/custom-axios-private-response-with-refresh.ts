import { LocalStorage } from 'src/local-storage/local-storage';
import { CustomAxiosPrivate as CustomAxiosPrivateWithoutRefresh } from 'src/modules/axios/custom-axios-private';
import { refreshSession } from 'src/modules/axios/refresh-session';

export const customAxiosPrivateResponseWithRefresh =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (e: any) => {
    // If we receive an unauthorized response, refresh the session and try again
    if (e?.response?.status === 401) {
      const refreshToken = LocalStorage.get('refresh_token');

      if (refreshToken) {
        // Refresh the session
        return refreshSession(e.config).then(() => {
          // Try again using axios without automatic session refreshing
          // Otherwise, we could get into an infinite loop of attempting to refresh
          return CustomAxiosPrivateWithoutRefresh(e.config);
        });
      }
    }

    return Promise.reject(e);
  };
