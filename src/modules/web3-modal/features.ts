import { config } from 'src/config/config';

export const getFeatures = () => {
  const { env } = config;
  const baseSepoliaTestnet = {
    email: true,
    socials: ['google', 'facebook'],
    emailShowWallets: true, // default to true
    analytics: true,
    swaps: true,
    onramp: true,
  };
  const baseMainnet = { ...baseSepoliaTestnet, email: true, socials: ['google', 'facebook'] };

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

export const features = getFeatures();
