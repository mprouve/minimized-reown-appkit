import { AppDispatch } from 'src/redux/store';
import { LocalStorage } from 'src/local-storage/local-storage';
import { request } from 'src/api/request';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const refreshSessionOnLoad = () => (_dispatch: AppDispatch) => {
  // Check for refresh token
  const refreshToken = LocalStorage.get('refresh_token');
  const deviceId = LocalStorage.get('device_id');

  if (!refreshToken) {
    throw new Error('No refresh token');
  }

  const config = {
    method: 'post',
    url: '/api/web/auth/refresh-session',
    data: {
      deviceId,
      refreshToken,
    },
  };

  return request(config, { isPublic: true });
};
