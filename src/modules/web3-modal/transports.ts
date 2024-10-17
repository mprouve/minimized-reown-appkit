import { base, baseSepolia } from '@reown/appkit/networks';
import { http, Transport } from 'viem';
import { config } from 'src/config/config';

type EnvironmentTransport = Record<8453 | 84532, Transport>;

const getTransports = () => {
  const { env } = config;
  const baseMainnet = { [base.id]: http() } as EnvironmentTransport;
  const baseSepoliaTestnet = { [baseSepolia.id]: http() } as EnvironmentTransport;

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

export const transports = getTransports();
