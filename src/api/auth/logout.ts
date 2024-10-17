/* eslint-disable @typescript-eslint/no-explicit-any */
import { request } from 'src/api/request';
import store, { AppDispatch } from 'src/redux/store';
import { LocalStorage } from 'src/local-storage/local-storage';
import { clearAuthenticated } from 'src/redux/slices/authenticated/authenticated';
import { clearSnackbar, setSnackbar } from 'src/redux/slices/snackbar/snackbar';
import { logMain } from 'src/modules/logger/logger';

export const logout = () => (_dispatch: AppDispatch) => {
  const config = {
    method: 'post',
    url: '/api/web/auth/logout',
  };

  return request(config, { noSessionRefresh: true });
};

const cleanReduxState = () => {
  const { dispatch } = store;

  logMain.debug('[LOGOUT]: Cleaning Redux state...');

  dispatch(clearAuthenticated());
  dispatch(clearSnackbar());

  logMain.debug('[LOGOUT]: Successfully cleaned Redux state...');
};

const cleanLocalStorage = () => {
  logMain.debug('[LOGOUT]: Cleaning local storage...');

  LocalStorage.clear();

  logMain.debug('[LOGOUT]: Successfully cleaned local storage...');
};

interface LogoutAndCleanSessionOptions {
  disableAPI?: boolean;
  showMessage?: boolean;
  enableRefresh?: boolean;
}

export const logoutAndCleanSession = async (options?: LogoutAndCleanSessionOptions) => {
  const { disableAPI = false, showMessage = false } = options || {};
  const { dispatch } = store;

  logMain.debug('[LOGOUT]: Logging out and cleaning session...');

  // Attempt to logout
  if (!disableAPI) {
    try {
      // Attempt to logout
      await dispatch(logout());

      logMain.debug('[LOGOUT]: Session found during logout.');
    } catch (e) {
      logMain.debug('[LOGOUT]: No session found during logout.', e);
    }
  }

  // Clean redux state
  cleanReduxState();
  // Clear necessary local storage
  cleanLocalStorage();
  // If showMessage is true, show the snackbar
  if (showMessage) dispatch(setSnackbar({ msg: "You've been logged out.", severity: 'success' }));

  logMain.debug('[LOGOUT]: Successfully logged out!');

  return true;
};
