import { FC } from 'react';
import Styled from 'src/components/web3-modal/Web3ModalAccountButton.styles';
// import { config } from 'src/config/config';

interface IWeb3ModalAccountButtonProps {
  balance?: 'show' | 'hide';
  fullWidth?: boolean;
  style?: React.CSSProperties;
}

const Web3ModalAccountButton: FC<IWeb3ModalAccountButtonProps> = ({
  balance = 'show',
  fullWidth = false,
  style = {},
}) => {
  return (
    <Styled.Root fullWidth={fullWidth} style={style}>
      <w3m-account-button balance={balance} />
    </Styled.Root>
  );
};

export default Web3ModalAccountButton;
