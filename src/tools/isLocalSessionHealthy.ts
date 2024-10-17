import { LocalStorage } from 'src/local-storage/local-storage';

export const isLocalSessionHealthy = (): boolean => {
  const sessionToken = LocalStorage.get('session_token');
  const refreshToken = LocalStorage.get('refresh_token');
  const sessionTokenStart = LocalStorage.get('session_token_start'); // Date in milli
  const sessionTokenExp = LocalStorage.get('session_token_exp'); // Date in milli

  // If important variables not found in local state, return false
  if (!sessionToken || !refreshToken || !sessionTokenStart || !sessionTokenExp) {
    return false;
  }

  return true;
};

export default isLocalSessionHealthy;
