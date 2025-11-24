"use client";
import { publicClient, createConfig } from "wagmi";
import { base, mainnet } from "wagmi/chains";
import { injected, metaMask } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [base, mainnet],
connectors: [
  new InjectedConnector({ chains: [base, mainnet] }),
  new MetaMaskConnector({ chains: [base, mainnet] }),
],
    injected(),
    metaMask(),
  ],
  transports: {
    [base.id]: publicClient(),
    [mainnet.id]: publicClient(),
  },
});
