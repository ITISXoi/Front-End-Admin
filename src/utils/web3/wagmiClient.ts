import { connectorsForWallets, getDefaultWallets, wallet } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { bscTestnet } from './custom-chain';

const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.polygon, bscTestnet, chain.polygonMumbai],
  [
    publicProvider({
      priority: 100,
      weight: 100,
    }),
    publicProvider({}),
  ]
);

const { wallets } = getDefaultWallets({
  appName: 'Test app',
  chains,
});

const wagmiAppInfo = {
  appName: 'Test app',
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [wallet.argent({ chains }), wallet.trust({ chains }), wallet.ledger({ chains })],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export { wagmiClient, chains, wagmiAppInfo };
