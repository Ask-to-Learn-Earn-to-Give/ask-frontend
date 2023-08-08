import { IWallet } from '@/hooks/useWallet';
import { createContext, useContext } from 'react';

export type ClientContextProps = {
  wallet: IWallet;
  user: {
    userName: string | null;
    fullName: string | null;
    email: string | null;
    avatar: string | null;
  };
  updateUserField: (field: string, value: string) => void;
};

const ClientContext = createContext<ClientContextProps>(
  {} as ClientContextProps
);

export const useClient = () => useContext(ClientContext);

export default ClientContext;
