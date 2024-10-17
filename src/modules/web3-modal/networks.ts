import { base, baseSepolia } from '@reown/appkit/networks';
import { config } from 'src/config/config';

export const getNetworks = () => {
  const { env } = config;
  const baseMainnet = { networks: [base], defaultNetwork: base };
  const baseSepoliaTestnet = { networks: [baseSepolia], defaultNetwork: baseSepolia };

  switch (env) {
    case 'local':
      return baseSepoliaTestnet;
    case 'dev1':
      return baseSepoliaTestnet;
    case 'dev2':
      return baseSepoliaTestnet;
    case 'dev3':
      return baseSepoliaTestnet;
    case 'dev4':
      return baseSepoliaTestnet;
    case 'dev5':
      return baseSepoliaTestnet;
    case 'dev6':
      return baseSepoliaTestnet;
    case 'staging1':
      return baseSepoliaTestnet;
    case 'staging2':
      return baseMainnet; // Mainnnet testing environment
    case 'staging3':
      return baseSepoliaTestnet;
    case 'staging4':
      return baseSepoliaTestnet;
    case 'staging5':
      return baseSepoliaTestnet;
    case 'qa':
      return baseSepoliaTestnet;
    case 'prod':
      return baseMainnet;
    default:
      return baseSepoliaTestnet;
  }
};

const networkConfig = getNetworks();

export const { networks } = networkConfig;
export const { defaultNetwork } = networkConfig;
