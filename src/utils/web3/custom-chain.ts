import { Chain } from '@rainbow-me/rainbowkit';

export const bscMainnet: Chain = {
  id: 56, //56 //0x38
  name: 'Binance Smart Chain',
  iconUrl: '/images/wallet/bsc-logo.svg',
  iconBackground: '#fff',
  rpcUrls: {
    default: 'https://bsc-dataseed.binance.org/',
    public: 'https://bsc-dataseed1.binance.org/',
  },
  nativeCurrency: {
    name: 'Binance Coin',
    symbol: 'BNB',
    decimals: 18,
  },
  blockExplorers: {
    default: { name: 'bscscan.com', url: 'https://bscscan.com' },
    etherscan: { name: 'bscscan.com', url: 'https://bscscan.com' },
  },
  network: 'Binance Smart Chain',
};

export const bscTestnet: Chain = {
  id: 97,
  name: 'Binance Smart Chain Testnet',
  iconUrl: '/images/wallet/bsc-logo.svg',
  iconBackground: '#fff',
  rpcUrls: {
    default: 'https://bsctestapi.terminet.io/rpc/',
    public: 'https://data-seed-prebsc-1-s2.binance.org:8545/',
  },
  testnet: true,
  nativeCurrency: {
    name: 'Binance Coin Testnet',
    symbol: 'tBNB',
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: 'bscscan.com',
      url: 'https://testnet.bscscan.com',
    },
    etherscan: {
      name: 'bscscan.com',
      url: 'https://testnet.bscscan.com',
    },
  },
  network: 'Binance Smart Chain Testnet',
};
