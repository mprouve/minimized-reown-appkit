import { InternalAxiosRequestConfig } from 'axios';
import { LocalStorage } from 'src/local-storage/local-storage';
import isLocalSessionHealthy from 'src/tools/isLocalSessionHealthy';

export const customAxiosPrivateRequest = (config: InternalAxiosRequestConfig) => {
  // If important variables not found in local state, throw an error to cancel the request
  if (!isLocalSessionHealthy()) {
    throw new Error('[INTERCEPTOR_PRIVATE_REQUEST]: Invalid session variables. Logging out.');
  }

  const sessionToken = LocalStorage.get('session_token');
  const modifiedConfig = config;

  // If config headers object not found, create it
  modifiedConfig.headers = config.headers ?? {};

  // Set Bearer token in request Authorization header
  modifiedConfig.headers.Authorization = `Bearer ${sessionToken}`;

  return modifiedConfig;
};
