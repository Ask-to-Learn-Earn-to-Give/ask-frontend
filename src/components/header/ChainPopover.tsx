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
import { NETWORKS } from '@/configs/blockchain';
import ChainItem from './ChainItem';
import { useClient } from '@/contexts/client/ClientContext';

export default function ChainPopover() {
  const popover = usePopover();
  const { wallet } = useClient();

  return (
    <>
      <Button variant="outlined" size="small" onClick={popover.onOpen}>
        <Image
          src={`assets/icons/coins/${wallet.network?.symbol.toLowerCase()}.svg`}
          width={16}
          height={16}
          alt={wallet.network?.name || ''}
        />
        <Typography variant="subtitle2" sx={{ mx: 1, color: 'text.secondary' }}>
          {wallet.network?.name}
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
          {NETWORKS.map(({ name, symbol, chainId }) => (
            <ChainItem
              symbol={symbol}
              name={name}
              selected={symbol == wallet.network?.symbol}
              key={symbol}
              onClick={() => wallet.switchNetwork(chainId)}
            />
          ))}
        </Box>
        <Divider sx={{ borderStyle: 'dashed' }} />
      </CustomPopover>
    </>
  );
}
