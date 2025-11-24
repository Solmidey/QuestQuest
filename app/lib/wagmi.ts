"use client";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { base, mainnet, goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [base, mainnet, goerli],
  [publicProvider()]
);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  publicClient,
  webSocketPublicClient
});
