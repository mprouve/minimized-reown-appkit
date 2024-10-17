import { AppDispatch } from 'src/redux/store';
import { request } from 'src/api/request';
import { initialAuth } from 'src/api/auth/initial-auth';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const siweSession = () => (_dispatch: AppDispatch) => {
  const config = {
    method: 'get',
    url: '/api/web/auth/siwe/session',
  };

  return initialAuth.then(() => request(config));
};
