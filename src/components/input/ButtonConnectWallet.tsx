import { FC } from 'react';
import { useAppKitState } from '@reown/appkit/react';
import useWeb3ModalContext from 'src/hooks/useWeb3ModalContext';
import Styled from 'src/components/input/ButtonConnectWallet.styles';
// import { config } from 'src/config/config';

export interface ButtonConnectWalletProps {
  disableGrow?: boolean;
  solidBackground?: boolean;
  style?: React.CSSProperties;
}

const ButtonConnectWallet: FC<ButtonConnectWalletProps> = ({
  disableGrow = false,
  solidBackground = false,
  style = {},
}) => {
  const { connectViaWeb3Modal, coinbaseProcessing } = useWeb3ModalContext();
  const { open: web3ModalIsOpen } = useAppKitState();
  // const mobileView = useMediaQuery(theme.breakpoints.down(config.ui_variables.mobile_breakpoints.header));

  return (
    <Styled.Root
      type="button"
      disableGrow={disableGrow}
      solidBackground={solidBackground}
      processing={coinbaseProcessing || web3ModalIsOpen}
      disabled={coinbaseProcessing || web3ModalIsOpen}
      style={style}
      onClick={connectViaWeb3Modal}
    >
      Connect Wallet
    </Styled.Root>
  );
};

export default ButtonConnectWallet;
