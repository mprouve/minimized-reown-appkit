import {
  type SIWESession,
  type SIWEVerifyMessageArgs,
  type SIWECreateMessageArgs,
  createSIWEConfig,
  formatMessage,
} from '@reown/appkit-siwe';
import store from 'src/redux/store';
import { siweNonce } from 'src/api/auth/siwe-nonce';
import { siweFinish } from 'src/api/auth/siwe-finish';
import { siweSession } from 'src/api/auth/siwe-session';
import { logoutAndCleanSession } from 'src/api/auth/logout';
import isLocalSessionHealthy from 'src/tools/isLocalSessionHealthy';
import processNewLogin from 'src/tools/processNewLogin';
import { networks } from 'src/modules/web3-modal/networks';
import { logMain } from 'src/modules/logger/logger';

// FUNCTION: Returns the user's session
const getSession = async () => {
  const { dispatch } = store;

  logMain.debug('[SIWE]: Retrieving session...');

  if (isLocalSessionHealthy()) {
    try {
      const session = await dispatch(siweSession());

      if (!session?.walletAddress || !session?.chainId) return null;

      const sessionData: SIWESession = {
        address: session?.walletAddress,
        chainId: session?.chainId,
      };

      logMain.debug('[SIWE]: Successfully retrieved session!', sessionData);

      return sessionData;
    } catch (e) {
      logMain.error('[SIWE]: Failed to retrieve session.', e);

      return null;
    }
  }

  logMain.debug('[SIWE]: No session / invalid session found.');

  return null;
};

// FUNCTION: Get the nonce
const getNonce = async () => {
  const { dispatch } = store;

  logMain.debug('[SIWE]: Retrieving nonce...');

  try {
    const { nonce } = await dispatch(siweNonce());

    logMain.debug('[SIWE]: Successfully retrieved nonce!', nonce);

    return nonce || '';
  } catch (e) {
    logMain.error('[SIWE]: Failed to retrieve nonce.', e);

    return '';
  }
};

// FUNCTION: Get message params
const getMessageParams = async () => {
  logMain.debug('[SIWE]: Retrieving message params...');

  const messageParams = {
    domain: window.location.host.indexOf(':') !== -1 ? window.location.host.split(':')[0] : window.location.host,
    uri: window.location.origin,
    chains: networks.map(network => Number(network.id)),
    statement:
      "Click to sign in and agree to N3TWORK Studios Inc's Terms of Service (https://static.n3twork.com/docs/terms.html) and Privacy Policy (https://static.n3twork.com/docs/privacy-policy.html).",
  };

  logMain.debug('[SIWE]: Successfully retrieved message params!', messageParams);

  return messageParams;
};

// FUNCTION: Create the message using the previously retrieved Nonce and available args
const createMessage = ({ address, ...args }: SIWECreateMessageArgs) => {
  logMain.debug('[SIWE]: Formatting message...');

  const formattedMessage = formatMessage(args, address);

  logMain.debug('[SIWE]: Successfully formatted message!', formattedMessage);

  return formattedMessage;
};

// FUNCTION: Verify if message and signature are valid
const verifyMessage = async ({ message, signature }: SIWEVerifyMessageArgs) => {
  const { dispatch } = store;

  logMain.debug('[SIWE]: Verifying message...');

  try {
    if (!message || !signature) throw new Error('Invalid message or signature');

    const data = await dispatch(siweFinish({ data: { siweMessage: message, signature } }));

    logMain.debug('[SIWE]: Successfully verified message!');

    processNewLogin(data, { fromRefresh: false });

    return true;
  } catch (e) {
    logMain.error('[SIWE]: Failed to verify message.', e);

    return false;
  }
};

// FUNCTION: Sign out
const signOut = async () => {
  logMain.debug('[SIWE]: SIWE Sign out initiated!');

  if (!isLocalSessionHealthy()) {
    logMain.debug('[SIWE]: No session to logout');

    return true;
  }

  return logoutAndCleanSession({ showMessage: true });
};

// FUNCTION: On sign in
const onSignIn = (session?: SIWESession) => {
  logMain.debug('[SIWE]: Successfully signed in!', session);
};

// FUNCTION: On sign out
const onSignOut = () => {
  logMain.debug('[SIWE]: Successfully signed out!');
};

export const siweConfig = createSIWEConfig({
  getSession,
  getNonce,
  getMessageParams,
  createMessage,
  verifyMessage,
  signOut,
  onSignIn,
  onSignOut,
  nonceRefetchIntervalMs: 30000,
  sessionRefetchIntervalMs: 30000,
  signOutOnDisconnect: true,
  signOutOnNetworkChange: true,
  signOutOnAccountChange: true,
});
