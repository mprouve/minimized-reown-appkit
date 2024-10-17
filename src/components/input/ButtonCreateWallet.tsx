import { FC } from 'react';
import { useAppKitState } from '@reown/appkit/react';
import useWeb3ModalContext from 'src/hooks/useWeb3ModalContext';
import CoinbaseIcon from 'src/components/icons/CoinbaseIcon';
import Styled from 'src/components/input/ButtonCreateWallet.styles';

export interface ButtonCreateWalletProps {
  disableGrow?: boolean;
  solidBackground?: boolean;
  style?: React.CSSProperties;
}

const ButtonCreateWallet: FC<ButtonCreateWalletProps> = ({
  disableGrow = false,
  solidBackground = false,
  style = {},
}) => {
  const { createCoinbaseWallet, coinbaseProcessing } = useWeb3ModalContext();
  const { open: web3ModalIsOpen } = useAppKitState();

  return (
    <Styled.Root
      type="button"
      disableGrow={disableGrow}
      solidBackground={solidBackground}
      processing={coinbaseProcessing || web3ModalIsOpen}
      disabled={coinbaseProcessing || web3ModalIsOpen}
      style={style}
      onClick={createCoinbaseWallet}
    >
      <CoinbaseIcon />
      <span>Create Wallet (Coinbase)</span>
    </Styled.Root>
  );
};

export default ButtonCreateWallet;
