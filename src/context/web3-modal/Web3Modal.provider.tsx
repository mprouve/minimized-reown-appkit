/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactNode, useMemo, useCallback, useEffect, useState } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { useAppKit, createAppKit } from '@reown/appkit/react';
import Web3ModalContext, { initialContext, IWeb3ModalContext } from 'src/context/web3-modal/Web3Modal.context';
import { web3ModalConfig } from 'src/modules/web3-modal/config';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { selectAuthenticated } from 'src/redux/slices/authenticated/authenticated';
import { logMain } from 'src/modules/logger/logger';
import { defaultNetwork } from 'src/modules/web3-modal/networks';

logMain.debug('[WEB3_MODAL]: Initializing Web3 Modal Instance:', { web3ModalConfig });

// Initialize Web3Modal instance
window.web3ModalInstance = createAppKit(web3ModalConfig);

// logMain.debug('[WEB3_MODAL]: Web3 Modal Instance created:', window.web3ModalInstance);

interface Web3ModalProviderProps {
  children: ReactNode;
}

const Web3ModalProvider: FC<Web3ModalProviderProps> = ({ children }) => {
  const { open } = useAppKit();
  const { connectors, connect } = useConnect();
  const { isConnected } = useAccount();
  const authenticated = useAppSelector(selectAuthenticated);
  const [coinbaseProcessing, setCoinbaseProcessing] = useState<IWeb3ModalContext['coinbaseProcessing']>(
    initialContext.coinbaseProcessing,
  );

  // FUNCTION: Open the Web3Modal
  const connectViaWeb3Modal = useCallback(() => {
    logMain.debug("[WEB3_MODAL]: 'Connect' button clicked!");
    logMain.debug('[WEB3_MODAL]: Opening Web3 Modal...');

    open({ view: 'Connect' });
  }, [open]);

  // FUNCTION: Create / Connect a Coinbase Wallet
  const createCoinbaseWallet = useCallback(async () => {
    const coinbaseWalletConnector = connectors.find(connector => connector.id === 'coinbaseWalletSDK');

    logMain.debug("[COINBASE]: 'Create Wallet' button clicked!");

    if (coinbaseWalletConnector) {
      setCoinbaseProcessing(true);

      connect(
        { chainId: Number(defaultNetwork.id), connector: coinbaseWalletConnector },
        {
          onSuccess: (...args: any[]) => {
            logMain.debug('[COINBASE]: Successfully connected wallet!', args);

            setCoinbaseProcessing(false);
          },
          onError: (...args: any[]) => {
            logMain.debug('[COINBASE]: Error while connecting to wallet:', args);

            setCoinbaseProcessing(false);
          },
        },
      );
    }
  }, [connect, connectors]);

  // FUNCTION: Handle disconnecting the wallet
  const handleDisconnect = useCallback(async () => {
    logMain.debug('[WEB3_MODAL]: Disconnecting wallet...');

    try {
      if (window.web3ModalInstance) {
        await window.web3ModalInstance?.adapter?.connectionControllerClient?.disconnect();
      } else {
        throw new Error('Web3Modal instance not found.');
      }

      logMain.debug('[WEB3_MODAL]: Successfully disconnected wallet.');
    } catch (e) {
      logMain.error('[WEB3_MODAL]: Failed to disconnect wallet.', e);
    }
  }, []);

  // Set the disconnect function to the global window object
  useEffect(() => {
    window.wagmiDisconnect = handleDisconnect;
  }, [handleDisconnect]);

  // Disable the reloadOnDisconnect property for the Coinbase Wallet Extension
  useEffect(() => {
    const coinbaseWalletExtension = window?.coinbaseWalletExtension;

    logMain.debug('[WEB3_MODAL]: Disabled Coinbase Wallet Extension <reloadOnDisconnect> property...');

    if (coinbaseWalletExtension) {
      logMain.debug('[WEB3_MODAL]: Coinbase Wallet Extension detected!', coinbaseWalletExtension);

      if (coinbaseWalletExtension.reloadOnDisconnect) {
        logMain.debug('[WEB3_MODAL]: Successfully disabled <reloadOnDisconnect> property.');

        coinbaseWalletExtension.reloadOnDisconnect = false;
      }
    }
  }, [authenticated]);

  // useEffect(() => {
  //   logMain.debug('%c[WEB3_MODAL]: WEB3 STATE:', 'color: #ff5555;', {
  //     data,
  //     error,
  //     failureCount,
  //     failureReason,
  //     isError,
  //     isIdle,
  //     isPending,
  //     isSuccess,
  //     isPaused,
  //   });
  // }, [data, error, failureCount, failureReason, isError, isIdle, isPaused, isPending, isSuccess, status]);

  // useEffect(() => {
  //   logMain.debug('%c[WEB3_MODAL]: STATUS:', 'color: #ff5555;', status);
  // }, [status]);

  // useEffect(() => {
  //   logMain.debug('%c[WEB3_MODAL]: CONNECTORS:', 'color: #dd7722;', disconnectConnectors);
  // }, [disconnectConnectors]);

  // Log the Web3 state
  useEffect(() => {
    if (isConnected) {
      logMain.debug('[WEB3_MODAL]: Wallet is connected.');
    } else {
      logMain.debug('[WEB3_MODAL]: No wallet connected.');
    }
  }, [isConnected]);

  const value = useMemo(
    () => ({
      connectViaWeb3Modal,
      createCoinbaseWallet,
      coinbaseProcessing,
      setCoinbaseProcessing,
    }),
    [connectViaWeb3Modal, createCoinbaseWallet, coinbaseProcessing, setCoinbaseProcessing],
  );

  return <Web3ModalContext.Provider value={value}>{children}</Web3ModalContext.Provider>;
};

export default Web3ModalProvider;
