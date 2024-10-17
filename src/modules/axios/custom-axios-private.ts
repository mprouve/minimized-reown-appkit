import { customAxiosPrivateRequest } from './interceptors/custom-axios-private-request';
import { createCustomAxios } from './custom-axios';

// Custom axios instance that does not automatically refresh the session.
// Useful for auth-related requests like "refresh-session" itself, and "logout," which we
// should not retry if they fail.
export const CustomAxiosPrivate = createCustomAxios();

CustomAxiosPrivate.interceptors.request.use(customAxiosPrivateRequest, e => Promise.reject(e));
