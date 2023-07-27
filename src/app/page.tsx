'use client';

import { useSettingsContext } from '@/components/settings/contexts/SettingsContext';
import { Box, Button, Typography } from '@mui/material';

export default function Home() {
  const { onToggle } = useSettingsContext();
  return (
    <Box>
      <Button variant="contained" color="primary" onClick={onToggle}>
        Click me
      </Button>
      <Typography variant="h1">Hello world</Typography>
    </Box>
  );
}
