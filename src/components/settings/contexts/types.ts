export type SettingsValueProps = {
  themeMode: 'light' | 'dark';
  themeContrast: 'default' | 'bold';
  themeColorPresets: 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red';
};

export type SettingsContextProps = SettingsValueProps & {
  onUpdate: (name: string, value: string | boolean) => void;
  canReset: boolean;
  open: boolean;
  onReset: VoidFunction;
  onToggle: VoidFunction;
  onClose: VoidFunction;
};
