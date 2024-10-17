/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { ErrorInfo, FC, ReactNode } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import Styled from 'src/components/error-boundary/ErrorBoundary.styles';
import { logMain } from 'src/modules/logger/logger';

interface FallbackRenderProps {
  error: Error;
  resetErrorBoundary: () => void;
}

// FALLBACK COMPONENT: To display when an error occurs
// Call resetErrorBoundary() to reset the error boundary and retry the render.
const Fallback: FC<FallbackRenderProps> = ({ error }) => {
  logMain.error('[ERROR_BOUNDARY]: Fallback rendering...', error);

  return (
    <Styled.Root>
      <Styled.ContentContainer>
        <Styled.Heading>Something Went Wrong</Styled.Heading>
        <Styled.Subheading>
          We sincerely apologize, something wen&apos;t wrong. Please hit the button below or refresh your browser to
          reset your session.
        </Styled.Subheading>
      </Styled.ContentContainer>
    </Styled.Root>
  );
};

interface CustomErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary: FC<CustomErrorBoundaryProps> = ({ children }) => {
  const onReset = (details: any) => {
    logMain.debug('%c[ERROR_BOUNDARY]: Resetting error boundary.', 'color: orange;', details);
  };

  const onError = (error: Error, info: ErrorInfo) => {
    logMain.error('[ERROR_BOUNDARY]: Error caught by error boundary.', error, info);
  };

  return (
    <ReactErrorBoundary FallbackComponent={Fallback} onReset={onReset} onError={onError}>
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
