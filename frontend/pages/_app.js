import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [chain.goerli],
  [
    alchemyProvider({ apiKey:'ywjstIh80liS6S1wNaEZXN_QRdopL1oY' }),
    // publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})


function MyApp({ Component, pageProps }) {
  return(
    <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
    <Component {...pageProps} />
    </RainbowKitProvider>
    </WagmiConfig>
    )
}

export default MyApp
