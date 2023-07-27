'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Stack } from '@mui/material';

export default function Page() {
  return (
    <>
      <Button variant="text" color="primary">
        Click me
      </Button>
      <Typography variant="h1" color="primary">
        Hello World
      </Typography>
      {Array(100)
        .fill(1)
        .map((_, i) => (
          <Typography key={i}>Lmao</Typography>
        ))}
    </>
  );
}
