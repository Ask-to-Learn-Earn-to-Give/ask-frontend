'use client';

import { useCallback, useState } from 'react';
import ClientContext, { ClientContextProps } from './ClientContext';
import useWallet from '@/hooks/useWallet';

type Props = {
  children: React.ReactNode;
};

export default function ClientProvider({ children }: Props) {
  const wallet = useWallet();
  const [user, setUser] = useState<ClientContextProps['user']>({
    userName: null,
    fullName: null,
    email: null,
    avatar: null,
  });

  const updateUserField = useCallback(async (field: string, value: string) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  }, []);

  return (
    <ClientContext.Provider
      value={{
        wallet,
        user,
        updateUserField,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}
