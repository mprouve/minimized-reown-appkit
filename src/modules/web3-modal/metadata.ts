import { config } from 'src/config/config';

// Metadata
const getMetadata = () => {
  return {
    name: 'Minmized Reown Appkit',
    description: 'A minimized example of Reown AppKit for reproducing bugs / issues.',
    url: config.app_url, // origin must match your domain & subdomain
    icons: [config.app_icon_url],
  };
};

export const metadata = getMetadata();
