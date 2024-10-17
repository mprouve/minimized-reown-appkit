import { v4 as uuidv4 } from 'uuid';
import metadata from 'src/metadata/metadata.json';
import packageJson from '../../package.json';

const getConfig = (): Config => {
  const env: Environment = (import.meta.env.VITE_ENV as Environment) || 'local';
  const uuid = uuidv4();
  const isProd: boolean = env === 'prod';
  const baseUrl = import.meta.env.VITE_BASE_URL || 'https://dev6.game.sandbox.legendaryheroesunchained.com';

  /**
   * Set global config settings
   */
  const config: Config = {
    name: 'Minimized Reown Appkit',
    app_url:
      import.meta.env.VITE_PUBLIC_URL === '/' || !import.meta.env.VITE_PUBLIC_URL
        ? `http://localhost:${window.location.port || 3000}`
        : `${import.meta.env.VITE_PUBLIC_URL}`,
    app_icon_url:
      import.meta.env.VITE_PUBLIC_URL === '/' || !import.meta.env.VITE_PUBLIC_URL
        ? `http://localhost:${window.location.port || 3000}/apple-touch-icon-192.png`
        : `${import.meta.env.VITE_PUBLIC_URL}/apple-touch-icon-192.png`,
    env,
    is_prod: isProd,
    version: `${packageJson.version}-${metadata.build}`,
    uuid,
    logger_levels: {
      main: isProd ? 'INFO' : 'DEBUG',
    },
    base_url: {
      lhu: baseUrl,
    },
    web3_modal: {
      projectId: import.meta.env.VITE_APPKIT_PROJECT_ID || 'c6ff8ac22ac51e4bfa5f07a9d374db5c',
    },
  };

  return config;
};

export const config: Config = getConfig();
