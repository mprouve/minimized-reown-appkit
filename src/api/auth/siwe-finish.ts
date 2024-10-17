import { AppDispatch } from 'src/redux/store';
import { request } from 'src/api/request';
import { LocalStorage } from 'src/local-storage/local-storage';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const siweFinish = (options: RequestOptions) => (_dispatch: AppDispatch) => {
  const { data } = options;
  const deviceId = LocalStorage.get('device_id');

  const config = {
    method: 'post',
    url: '/api/web/auth/siwe/finish',
    data: {
      siweMessage: data?.siweMessage,
      signature: data?.signature,
      deviceId,
    },
  };

  return request(config, { isPublic: true });
};
