import { Network } from '@/configs/blockchain';
import { createContext, useContext } from 'react';

export type ClientContextProps = {
  wallet: {
    address: string | null;
    network: Network | null;
    assets: {
      [symbol: string]: {
        balance: bigint;
      };
    } | null;
  };
  user: {
    userName: string | null;
    fullName: string | null;
    email: string | null;
    avatar: string | null;
  };
  isConnected: () => boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  switchNetwork: (chainId: string) => Promise<void>;
  updateUserField: (field: string, value: string) => void;
};

const ClientContext = createContext<ClientContextProps>(
  {} as ClientContextProps
);

export const useClientContext = () => useContext(ClientContext);

export default ClientContext;
