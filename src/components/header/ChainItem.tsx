import { Button, Stack, Typography, IconButton } from '@mui/material';
import Image from 'next/image';
import Iconify from '../common/Iconify';

type Props = {
  name: string;
  symbol: string;
  selected: boolean;
};

export default function ChainItem({ name, symbol, selected }: Props) {
  return (
    <Button sx={{ width: '100%' }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ width: '100%' }}
      >
        <Stack direction="row" alignItems="center">
          <Image
            src={`assets/icons/coins/${symbol.toLowerCase()}.svg`}
            width={16}
            height={16}
            alt={name}
          />
          <Typography variant="subtitle1" sx={{ mx: 1 }}>
            {name}
          </Typography>
        </Stack>
        {selected && (
          <IconButton size="small" color="primary">
            <Iconify icon="solar:check-circle-linear" />
          </IconButton>
        )}
      </Stack>
    </Button>
  );
}
