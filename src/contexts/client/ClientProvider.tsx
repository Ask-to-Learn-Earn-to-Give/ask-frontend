import { useState } from 'react';
import ClientContext, { ClientContextProps } from './ClientContext';

type Props = {
  children: React.ReactNode;
};

export default function ClientProvider({ children }: Props) {
  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [assets, setAssets] =
    useState<ClientContextProps['wallet']['assets']>(null);
  const [user, setUser] = useState<ClientContextProps['user']>({
    userName: null,
    fullName: null,
    email: null,
    avatar: null,
  });

  return (
    <ClientContext.Provider
      value={{
        wallet: {},
        user: {},
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}
