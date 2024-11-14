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
    name: "Superposition",
    id: 55244,
    nativeCurrency: { name: "Superposition", symbol: "ETH", decimals: 18 },
    contracts: {
      multicall3: {
        address: "0xcA11bde05977b3631167028862bE2a173976CA11" as const,
      },
    },
    rpcUrls: {
      default: { http: ["https://rpc.superposition.so"] },
      public: { http: ["https://rpc.superposition.so"] },
    },
    blockExplorers: {
      default: {
        name: "CatScan",
        url: "https://explorer.superposition.so",
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
