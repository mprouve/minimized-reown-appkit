import isLocalSessionHealthy from 'src/tools/isLocalSessionHealthy';
import { logMain } from 'src/modules/logger/logger';
import store from 'src/redux/store';
import processNewLogin from 'src/tools/processNewLogin';
import { refreshSessionOnLoad } from 'src/api/auth/refresh-session-on-load';
import { logoutAndCleanSession } from 'src/api/auth/logout';

let autoAuthResolve: () => void;

export const initialAuth = new Promise<void>(resolve => {
  autoAuthResolve = resolve;
});

const validSession = isLocalSessionHealthy();

const handleClearSession = () => {
  if (window.wagmiDisconnect) {
    window.wagmiDisconnect();
  } else {
    logoutAndCleanSession({ disableAPI: true });
  }

  autoAuthResolve();
};

// Attempts to load profile data for user
const handleRefreshSession = async () => {
  try {
    logMain.debug('[AUTO_AUTH]: Automatically authenticating user...');

    const { dispatch } = store;
    const data = await dispatch(refreshSessionOnLoad());

    logMain.debug('[AUTO_AUTH]: Successfully authenticated user!');

    processNewLogin(data, { fromRefresh: true });
  } catch (e) {
    logMain.error('[AUTO_AUTH]: Failed to authenticate user.', e);

    logoutAndCleanSession();
  } finally {
    autoAuthResolve();
  }
};

// If user's existing session is valid, set user authenticated status to true and load necessary profile data
// Else, attempt to authenticate user
if (validSession) {
  logMain.debug('[AUTO_AUTH]: Valid session found!');
  handleRefreshSession();
} else {
  logMain.debug('[AUTO_AUTH]: No valid session found.');
  handleClearSession();
}
