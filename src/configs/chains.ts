import { alpha, Theme } from '@mui/material/styles';

export const CHAIN_LIST = ['ETH', 'KLAY'];

export const CHAIN_CONFIGS: { [symbol: string]: any } = {
  KLAY: {
    name: 'Klaytn',
    color: (theme: Theme) => alpha(theme.palette.error.main, 0.1),
  },
  ETH: {
    name: 'Ethereum',
    color: (theme: Theme) => alpha(theme.palette.secondary.main, 0.1),
  },
};
