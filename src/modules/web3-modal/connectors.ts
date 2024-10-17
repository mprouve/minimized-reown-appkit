import { CreateConnectorFn } from 'wagmi';
// import { authConnector } from '@reown/appkit-adapter-wagmi';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';
import { metadata } from 'src/modules/web3-modal/metadata';
import { config } from 'src/config/config';

const getConnectors = (): CreateConnectorFn[] => {
  const connectors: CreateConnectorFn[] = [
    walletConnect({ projectId: config.web3_modal.projectId, metadata, showQrModal: false }),
    injected({ shimDisconnect: true }),
    coinbaseWallet({
      appName: config.name,
      appLogoUrl: config.app_icon_url,
      preference: 'all',
      version: '4',
    }),
  ];

  return connectors;
};

export const connectors = getConnectors();
