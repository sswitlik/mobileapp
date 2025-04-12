import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'pl.rtn.mobile',
  appName: 'FMP Mobile',
  webDir: 'dist/mobileapp/browser',
  includePlugins: [
    '@capacitor/geolocation',
    '@capacitor/browser',
    '@capacitor/push-notifications',
    '@capacitor/clipboard',
    '@capacitor/background-runner',
  ],
  plugins: {
    BackgroundRunner: {
      label: 'pl.rtn.mobile.task',
      src: 'background.js',
      event: 'myCustomEvent',
      repeat: true,
      interval: 15,
      autoStart: true
    }
  }
};

export default config;
