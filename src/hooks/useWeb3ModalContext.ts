import { useContext } from 'react';
import Web3ModalContext from 'src/context/web3-modal/Web3Modal.context';

const useWeb3ModalContext = () => {
  const web3ModalContext = useContext(Web3ModalContext);

  return web3ModalContext;
};

export default useWeb3ModalContext;
