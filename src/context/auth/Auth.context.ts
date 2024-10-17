import { createContext } from 'react';

export interface IAuthContext {
  processingAuth: boolean;
  setProcessingAuth: (processingAuth: boolean) => void;
}

export const initialContext: IAuthContext = {
  processingAuth: true,
  setProcessingAuth: () => undefined,
};

const AuthContext = createContext<IAuthContext>(initialContext);

AuthContext.displayName = 'AuthContext';

export default AuthContext;
