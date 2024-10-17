import { AppDispatch } from 'src/redux/store';
import { request } from 'src/api/request';
import { LocalStorage } from 'src/local-storage/local-storage';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const siweNonce = () => (_dispatch: AppDispatch) => {
  const deviceId = LocalStorage.get('device_id');

  const config = {
    method: 'post',
    url: '/api/web/auth/siwe/nonce',
    data: {
      deviceId,
    },
  };

  return request(config, { isPublic: true });
};
