import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Image from 'next/image';
import CustomPopover from '../popover/CustomPopover';
import Iconify from '../common/Iconify';
import { usePopover } from '../popover';
import { CHAIN_CONFIGS, CHAIN_LIST } from '@/configs/chains';
import ChainItem from './ChainItem';

export default function ChainPopover() {
  const popover = usePopover();

  return (
    <>
      <Button variant="outlined" size="small" onClick={popover.onOpen}>
        <Image
          src={'assets/icons/coins/eth.svg'}
          width={16}
          height={16}
          alt="Ethereum"
        />
        <Typography variant="subtitle2" sx={{ mx: 1, color: 'text.secondary' }}>
          Ethereum
        </Typography>
        <IconButton size="small">
          <Iconify icon="solar:alt-arrow-down-bold" />
        </IconButton>
      </Button>
      <CustomPopover
        arrow="top-center"
        open={popover.open}
        onClose={popover.onClose}
        sx={{ width: '250px' }}
      >
        <Box sx={{ p: 1, pb: 0.5 }}>
          <Typography
            variant="subtitle2"
            sx={{ m: 1, mb: 0.5, color: 'text.secondary' }}
          >
            Switch chain
          </Typography>
          {CHAIN_LIST.map((symbol) => (
            <ChainItem
              symbol={symbol}
              name={CHAIN_CONFIGS[symbol].name}
              selected={symbol == 'ETH'}
              key={symbol}
            />
          ))}
        </Box>
        <Divider sx={{ borderStyle: 'dashed' }} />
      </CustomPopover>
    </>
  );
}
