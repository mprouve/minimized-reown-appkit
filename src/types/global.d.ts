/* eslint-disable @typescript-eslint/no-explicit-any */
interface Window {
  ethereum?: any;
  web3ModalInstance?: any;
  wagmiDisconnect?: () => Promise<void>;
}
