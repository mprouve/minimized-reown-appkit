/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactNode, useState, useMemo, useEffect } from 'react';
import AuthContext, { initialContext, IAuthContext } from 'src/context/auth/Auth.context';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
// import Loader from 'src/components/loader/Loader';
import { initialAuth } from 'src/api/auth/initial-auth';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [processingAuth, setProcessingAuth] = useState<IAuthContext['processingAuth']>(initialContext.processingAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (processingAuth) {
      initialAuth.then(() => setProcessingAuth(false));
    }
  }, [dispatch, processingAuth]);

  const value = useMemo(
    () => ({
      processingAuth,
      setProcessingAuth,
    }),
    [processingAuth, setProcessingAuth],
  );

  if (processingAuth) return <div>Loading Auth Status...</div>;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
