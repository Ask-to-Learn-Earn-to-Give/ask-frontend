export type Network = {
  name: string;
  chainId: string;
  rpcUrl: string;
};

export type Token = {
  name: string;
  color: string;
  symbol: string;
};

export const NETWORKS: Network[] = [
  {
    name: 'Ethereum',
    chainId: '1',
    rpcUrl: 'https://mainnet.infura.io/v3/[key]',
  },
  {
    name: 'Klaytn',
    chainId: '8217',
    rpcUrl: 'https://node-api.klaytnapi.com/v1/klaytn',
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
