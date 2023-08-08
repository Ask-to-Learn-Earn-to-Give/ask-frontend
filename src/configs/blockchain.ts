export type Network = {
  name: string;
  chainId: bigint;
  rpcUrl: string;
  symbol: string;
};

export type Token = {
  name: string;
  color: string;
  symbol: string;
};

export const NETWORKS: Network[] = [
  {
    name: 'Ethereum',
    symbol: 'ETH',
    chainId: 11155111n,
    rpcUrl: 'https://sepolia.infura.io/v3/1482a3d2c4d74bc28e2192378e0274fb',
  },
  {
    name: 'Klaytn',
    symbol: 'KLAY',
    chainId: 1001n,
    rpcUrl: 'https://public-node-api.klaytnapi.com/v1/baobab',
  },
];

export const TOKENS: { [symbol: string]: Token } = {
  ETH: {
    name: 'Ethereum',
    color: '#627EEA',
    symbol: 'ETH',
  },
  KLAY: {
    name: 'Klaytn Token',
    color: '#FF0000',
    symbol: 'KLAY',
  },
  AKF: {
    name: 'Askify Token',
    color: '#00FF00',
    symbol: 'AKF',
  },
};
