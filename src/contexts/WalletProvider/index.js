import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { InjectedConnector } from "wagmi/connectors/injected";
import { publicProvider } from 'wagmi/providers/public';
import { mainnet } from "viem/chains";

const {chains, publicClient} = configureChains(
  [mainnet],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains: chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
})

function WalletProvider({children}) {
  return (
    <WagmiConfig config={config}>
      {children}
    </WagmiConfig>
  );
}

export default WalletProvider