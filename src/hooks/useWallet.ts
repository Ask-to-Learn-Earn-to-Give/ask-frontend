import { NETWORKS, Network } from '@/configs/blockchain';
import { useCallback, useEffect, useMemo, useState } from 'react';

import type { BrowserProvider, JsonRpcProvider } from 'ethers';

export interface IWallet {
  address: string | null;
  network: Network | null;
  provider: JsonRpcProvider | BrowserProvider | null;
  assets: {
    [symbol: string]: {
      balance: bigint;
    };
  };
  connect: () => Promise<void>;
  isConnecting: boolean;
  isConnected: boolean;
  isWrongNetwork: boolean;
  switchNetwork: (chainId: bigint) => Promise<void>;
}

export default function useWallet(): IWallet {
  const [address, setAddress] = useState<IWallet['address']>(null);
  const [network, setNetwork] = useState<IWallet['network']>(null);
  const [provider, setProvider] = useState<IWallet['provider']>(null);
  const [assets, setAssets] = useState<IWallet['assets']>({});
  const [isConnecting, setIsConnecting] = useState(false);
  const [isWrongNetwork, setIsWrongNetwork] = useState(false);

  const isConnected = !!address;

  const connect = useCallback(async () => {
    setIsConnecting(true);

    const { BrowserProvider } = await import('ethers/providers');

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    setAddress(address);
    setIsConnecting(false);
  }, []);

  const switchNetwork = useCallback(
    async (chainId: bigint) => {
      const network =
        NETWORKS.find((network) => network.chainId === chainId) || null;

      if (isConnected) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x' + chainId.toString(16) }],
          });
          setNetwork(network);
        } catch (error: any) {
          console.log('Cannot switch network');
        }
      } else {
        const { JsonRpcProvider } = await import('ethers/providers');
        const provider = new JsonRpcProvider(network?.rpcUrl);

        setProvider(provider);
        setNetwork(network);
      }
    },
    [isConnected]
  );

  useEffect(() => {
    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      if (accounts.length === 0) {
        // disconnect
      } else {
        setAddress(accounts[0]);
      }
    });

    window.ethereum.on('chainChanged', (networkId: string) => {
      switchNetwork(BigInt(networkId));
    });

    return () => {
      window.ethereum.removeAllListeners('accountsChanged');
      window.ethereum.removeAllListeners('chainChanged');
    };
  }, [switchNetwork]);

  // update assets every time address or network changed
  useEffect(() => {
    console.log('update assets');

    if (!provider || !address) return;

    const updateAssets = async () => {
      if (!network) {
        setAssets({});
      } else {
        setAssets({
          [network.symbol]: {
            balance: await provider.getBalance(address),
          },
        });
      }
    };
    updateAssets();
  }, [provider, address, network]);

  useEffect(() => {
    const initProvider = async () => {
      const { BrowserProvider, JsonRpcProvider } = await import(
        'ethers/providers'
      );
      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });

      let provider: IWallet['provider'];

      // use JSON-RPC provider if user is not connected otherwise use browser provider
      if (accounts.length === 0) {
        provider = new JsonRpcProvider(NETWORKS[0].rpcUrl);
        setNetwork(NETWORKS[0]);
      } else {
        provider = new BrowserProvider(window.ethereum, 'any');
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const network_ = await provider.getNetwork();
        const network = NETWORKS.find(
          (network) => network.chainId === network_.chainId
        );

        if (!network) {
          setNetwork(NETWORKS[0]);
          setIsWrongNetwork(true);
        } else {
          setNetwork(network);
          setIsWrongNetwork(false);
        }

        setAddress(address);
      }

      setProvider(provider);
    };
    initProvider();
  }, []);

  return {
    address,
    network,
    assets,
    provider,
    isConnecting,
    isConnected,
    isWrongNetwork,
    switchNetwork,
    connect,
  };
}
