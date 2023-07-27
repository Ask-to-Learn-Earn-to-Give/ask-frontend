'use client';

import { createContext, useContext } from 'react';
import { SettingsContextProps, SettingsValueProps } from './types';

export type SettingsProviderProps = {
  children: React.ReactNode;
  defaultSettings: SettingsValueProps;
};

const SettingsContext = createContext({} as SettingsContextProps);

export const useSettingsContext = () => useContext(SettingsContext);

export default SettingsContext;
