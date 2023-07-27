'use client';

import { Header } from '@/components/header';
import Container from '@mui/material/Container';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <Container
        component="main"
        sx={{
          mt: 10,
        }}
      >
        {children}
      </Container>
    </>
  );
}
