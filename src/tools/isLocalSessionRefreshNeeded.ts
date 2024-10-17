import { LocalStorage } from 'src/local-storage/local-storage';

export const isLocalSessionRefreshNeeded = (): boolean => {
  const sessionTokenStart = LocalStorage.get('session_token_start'); // Date in milli
  const sessionTokenExp = LocalStorage.get('session_token_exp'); // Date in milli
  const sessionTokenLastRefresh = LocalStorage.get('session_token_last_refresh'); // Date in milli
  // const refreshInterval = 3600000; // 3600000 = 1 hour in milliseconds
  const refreshInterval = 1800000; // 1800000 = 30 min in milliseconds

  // Parse dates in Milli for later comparison
  const parsedTokenStart = parseInt(sessionTokenStart as string, 10);
  const parsedTokenExp = parseInt(sessionTokenExp as string, 10);

  // If a refresh interval's worth of time left before expiration, refresh
  if (parsedTokenExp - Date.now() <= refreshInterval) return true;

  // If sessionTokenLastRefresh is TRUTHY, than a refresh has occured, so check current date in milli
  // versus last refresh date and see if interval has gone by
  if (sessionTokenLastRefresh) {
    const parsedTokenLastRefresh = parseInt(sessionTokenLastRefresh as string, 10);
    const elapsedTime = Date.now() - parsedTokenLastRefresh;

    if (elapsedTime >= refreshInterval) return true;
  }

  // If sessionTokenLastRefresh is FALSY, than a refresh has NOT occured, so check current date in milli
  // versus start date and see if interval has gone by
  if (!sessionTokenLastRefresh) {
    const elapsedTime = Date.now() - parsedTokenStart;

    if (elapsedTime >= refreshInterval + 60000) return true; // Add 60000 milli as buffer between login and next refresh
  }

  // If no matches above, then no refresh necessary
  return false;
};

export default isLocalSessionRefreshNeeded;
