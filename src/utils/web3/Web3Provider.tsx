import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { FC } from 'react';
import { WagmiConfig } from 'wagmi';
import { getRainbowTheme } from './rainbowTheme';
import { chains, wagmiAppInfo, wagmiClient } from './wagmiClient';

const Web3Provider: FC = ({ children }) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider theme={getRainbowTheme('light')} appInfo={wagmiAppInfo} chains={chains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Web3Provider;
