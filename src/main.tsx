import { v4 as uuidv4 } from 'uuid';
import { createRoot } from 'react-dom/client';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
import { logMain } from 'src/modules/logger/logger';
import { queryClient, wagmiAdapter } from 'src/modules/web3-modal/config';
import { LocalStorage } from 'src/local-storage/local-storage';
import { config } from 'src/config/config';
import store from 'src/redux/store';
import ErrorBoundary from 'src/components/error-boundary/ErrorBoundary';
import ThemeProvider from 'src/styles/theme/ThemeProvider';
import ReduxProvider from 'src/redux/provider';
import Web3ModalProvider from 'src/context/web3-modal/Web3Modal.provider';
import AuthProvider from 'src/context/auth/Auth.provider';
import App from 'src/App';
import 'src/styles/global/App.sanitize.scss';
import packageJson from '../package.json';

const publicUrl = config.env === 'local' ? `http://localhost:${window.location.port}` : import.meta.env.VITE_PUBLIC_URL;
const container = document.getElementById('root') as Element;
const root = createRoot(container);
const basename = document.querySelector('base')?.getAttribute('href') ?? '/';
const logColors = { info: 'orange', debug: 'cyan', notice: 'magenta' };

logMain.info(`%c===${packageJson.name} v${packageJson.version}===`, `color: ${logColors.info};`);
logMain.debug(`%c[PUBLIC_URL]: ${publicUrl}`, `color: ${logColors.debug};`);
logMain.debug(`%c[VITE_MODE]: ${import.meta.env.MODE}`, `color: ${logColors.debug};`);
logMain.debug(`%c[ENVIRONMENT]: ${config.env}`, `color: ${logColors.debug};`);
logMain.debug('%c[REDUX_STATE]: ', 'color: cyan;', store.getState());
logMain.debug(`%c[UUID]: ${config.uuid}`, `color: ${logColors.debug};`);
logMain.debug(`%c[BASENAME]: ${basename}`, `color: ${logColors.debug};`);

// Set Device ID if not already set
if (!LocalStorage.get('device_id')) {
  LocalStorage.set('device_id', uuidv4());
}

root.render(
  <ErrorBoundary>
    {/* <BrowserRouter basename={basename}> */}
    <ThemeProvider>
      <ReduxProvider>
        <WagmiProvider config={wagmiAdapter.wagmiConfig} reconnectOnMount>
          <QueryClientProvider client={queryClient}>
            <Web3ModalProvider>
              <AuthProvider>
                <App />
              </AuthProvider>
            </Web3ModalProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </ReduxProvider>
    </ThemeProvider>
    {/* </BrowserRouter> */}
  </ErrorBoundary>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister();
