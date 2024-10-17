/* eslint-disable @typescript-eslint/no-explicit-any */
import store from 'src/redux/store';
import { setAuthenticated } from 'src/redux/slices/authenticated/authenticated';
import { LocalStorage } from 'src/local-storage/local-storage';

interface ProcessNewLoginOptions {
  fromRefresh: boolean;
}

const processNewLogin = (data: any, options: ProcessNewLoginOptions) => {
  const { sessionToken, refreshToken, expiration } = data;
  const { fromRefresh } = options;
  const { dispatch } = store;
  const now = Date.now().toString();

  if (sessionToken && refreshToken && expiration) {
    LocalStorage.set('session_token', sessionToken);
    LocalStorage.set('refresh_token', refreshToken);
    LocalStorage.set('session_token_exp', expiration);
    fromRefresh && LocalStorage.set('session_token_last_refresh', now);
    !fromRefresh && LocalStorage.set('session_token_start', now);
  }

  // REDUX: Set Authenticated status
  dispatch(setAuthenticated(true));
};

export default processNewLogin;
