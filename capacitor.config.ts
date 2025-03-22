import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'pl.restrain.mobile',
  appName: 'FMP Mobile',
  webDir: 'dist/mobileapp/browser',
  includePlugins: [
    '@capacitor/geolocation',
    '@capacitor/browser',
    '@capacitor/push-notifications',
    '@capacitor/clipboard',
  ]
};

export default config;
