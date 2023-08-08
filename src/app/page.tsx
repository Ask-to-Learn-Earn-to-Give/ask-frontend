'use client';

import { useClient } from '@/contexts/client/ClientContext';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  const { wallet } = useClient();

  return (
    <Box>
      {wallet.isConnected ? (
        <Button
          variant="outlined"
          size="small"
          color="primary"
          component={Link}
          href="/dapp"
        >
          Go to dapp
        </Button>
      ) : (
        <Button
          variant="outlined"
          size="small"
          color="primary"
          onClick={() => wallet.connect()}
        >
          Connect wallet
        </Button>
      )}
    </Box>
  );
}
