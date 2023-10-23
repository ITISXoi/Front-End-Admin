export const __prod__ = process.env.NODE_ENV === 'production';
export const BASE_URL = process.env.REACT_APP_BASE_URL || 'https://localhost:3000';
export const API_URL = process.env.REACT_APP_API_URL!;
export const USE_TESTNET = process.env.REACT_APP_ENABLE_TESTNETS === 'true';
export const MEDIUM_URL = process.env.REACT_APP_MEDIUM_ENDPOINT!;

export const SMART_CONTRACT_ADDRESS = '0x24Ba199AecB186240d3639575d914f52D0A49213';

export const STORAGE_KEY = {
  token: 'token',
  refreshToken: 'refresh_token',
  user: 'auth_user',
  theme: 'themes',
  language: 'language',
  currency: 'currency',
};

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

export const IMPORT_COLLECTION_CHAIN: Record<string, number> = USE_TESTNET
  ? {
      ETH: 5,
      POLYGON: 80001,
      BSC: 97,
    }
  : {
      ETH: 5,
      POLYGON: 80001,
      BSC: 97,
    };

export const giphy404 = 'https://giphy.com/embed/xTiN0L7EW5trfOvEk0';
export const email = 'auther-email@gmail.com';
export const messages = {
  app: {
    crash: {
      title: 'Oooops... Sorry, I guess, something went wrong. You can:',
      options: {
        email: `contact with author by this email - ${email}`,
        reset: 'Press here to reset the application',
      },
    },
  },
  loader: {
    fail: 'Hmmmmm, there is something wrong with this component loading process... Maybe trying later would be the best idea',
  },
  images: {
    failed: 'something went wrong during image loading :(',
  },
  404: 'Hey bro? What are you looking for?',
};
