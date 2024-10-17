import { createContext } from 'react';

export interface IWeb3ModalContext {
  connectViaWeb3Modal: () => void;
  createCoinbaseWallet?: () => void;
  coinbaseProcessing?: boolean;
  setCoinbaseProcessing?: (coinbaseProcessing: boolean) => void;
}

export const initialContext: IWeb3ModalContext = {
  connectViaWeb3Modal: () => undefined,
  createCoinbaseWallet: () => undefined,
  coinbaseProcessing: false,
  setCoinbaseProcessing: () => undefined,
};

const Web3ModalContext = createContext<IWeb3ModalContext>(initialContext);

Web3ModalContext.displayName = 'Web3ModalContext';

export default Web3ModalContext;
