import Typography from '@mui/material/Typography';
import { ethers } from 'ethers';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { useMemo } from 'react';
import Image from 'next/image';

type Props = {
  value: bigint;
  symbol: 'KLAY' | 'ETH';
};

export default function Balance({ value, symbol }: Props) {
  const valueInFloat = useMemo(
    () => parseFloat(ethers.formatEther(value)),
    [value]
  );

  return (
    <Tooltip title={`${valueInFloat.toFixed(8)} ${symbol}`}>
      <Button>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="subtitle2">{valueInFloat.toFixed(2)}</Typography>

          <Image
            src={`/assets/icons/coins/${symbol.toLowerCase()}.svg`}
            alt={symbol}
            width={14}
            height={14}
          />
        </Stack>
      </Button>
    </Tooltip>
  );
}
