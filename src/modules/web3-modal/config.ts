/* eslint-disable @typescript-eslint/no-explicit-any */
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { siweConfig } from 'src/modules/web3-modal/siwe-config';
import { networks, defaultNetwork } from 'src/modules/web3-modal/networks';
import { metadata } from 'src/modules/web3-modal/metadata';
import { transports } from 'src/modules/web3-modal/transports';
import { connectors } from 'src/modules/web3-modal/connectors';
import { features } from 'src/modules/web3-modal/features';
import customThemeOptions from 'src/styles/theme/customThemeOptions';
import { config } from 'src/config/config';
import { QueryClient } from '@tanstack/react-query';
import { AppKitOptions } from '@reown/appkit';
import { AppKitNetwork } from '@reown/appkit/networks';

// Query Client
export const queryClient = new QueryClient();

// Project ID
const { projectId } = config.web3_modal;

// Wagmi Config
export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks,
  transports,
  connectors,
  multiInjectedProviderDiscovery: true,
  ssr: false,
  // storage: createStorage({
  //   storage: typeof window !== 'undefined' && window.localStorage ? window.localStorage : noopStorage,
  // }),
  syncConnectedChain: true,
  batch: {
    multicall: true,
  },
  cacheTime: 4_000,
  pollingInterval: 4_000,
});

// Web3 Modal Config
export const web3ModalConfig = {
  adapters: [wagmiAdapter],
  networks: networks as unknown as [AppKitNetwork, ...AppKitNetwork[]],
  projectId,
  metadata,
  features,
  siweConfig,
  defaultNetwork,
  coinbasePreference: 'all',
  featuredWalletIds: [
    'e7c4d26541a7fd84dbdfa9922d3ad21e936e13a7a0e44385d44f006139e44d3b', // WalletConnect
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // Metamask
    'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa', // Coinbase Wallet
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0', // Trust Wallet
    'a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393', // Phantom
  ],
  termsConditionsUrl: 'https://static.n3twork.com/docs/terms.html',
  privacyPolicyUrl: 'https://static.n3twork.com/docs/privacy-policy.html',
  allWallets: 'HIDE' as 'HIDE' | 'SHOW' | 'ONLY_MOBILE' | undefined,
  themeVariables: {
    // '--w3m-font-family': 'Barlow',
    '--w3m-accent': customThemeOptions.custom.colors.Yellow,
    // '--w3m-z-index': 10000,
  },
  debug: config.env === 'local', // Optional - defaults to false
} as AppKitOptions;
