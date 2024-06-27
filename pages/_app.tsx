import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';

const config = getDefaultConfig({
  appName: 'SPN Wrapper',
  projectId: `${process.env.NEXT_PUBLIC_WSPN_WALLETCONNECT_PROJECT_ID}`,
  chains: [{
    name: "Superposition Testnet",
    id: 98985,
    nativeCurrency: { name: "Superposition", symbol: "SPN", decimals: 18 },
    contracts: {
      multicall3: {
        address: "0x37Bc0f77FCf51318B2ceb9447002913f7CFb599d" as const,
      },
    },
    rpcUrls: {
      default: { http: ["https://testnet-rpc.superposition.so"] },
      public: { http: ["https://testnet-rpc.superposition.so"] },
    },
    blockExplorers: {
      default: {
        name: "CatScan",
        url: "https://testnet-explorer.superposition.so",
      },
    },
  }],
  ssr: true,
});

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
