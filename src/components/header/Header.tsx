'use client';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Iconify from '../common/Iconify';

import { bgBlur } from '@/theme/css';
import { useTheme } from '@mui/material/styles';
import { useSettingsContext } from '@/components/settings/contexts/SettingsContext';
import useOffSetTop from '@/hooks/useOffSetTop';
import HeaderShadow from './HeaderShadow';
import NotificationPopover from './NotificationPopover';
import AccountPopover from './AccountPopover';
import WalletPopover from './WalletPopover';

const HEADER_DESKTOP_HEIGHT = 80;
const HEADER_DESKTOP_OFFSET_HEIGHT = 80 - 16;

export default function Header() {
  const theme = useTheme();
  const { onToggle: toggleSettingsDrawer } = useSettingsContext();

  const offsetTop = useOffSetTop(80);

  const renderContent = () => (
    <>
      <IconButton>
        <Iconify icon="eva:search-outline" />
      </IconButton>

      <Box sx={{ flexGrow: 1 }} />
      <Stack direction="row" spacing={2} alignItems="center">
        <WalletPopover />

        <Stack direction="row" spacing={1} alignItems="center">
          <NotificationPopover />

          <IconButton onClick={toggleSettingsDrawer}>
            <Iconify icon="solar:settings-bold-duotone" />
          </IconButton>
        </Stack>

        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        height: HEADER_DESKTOP_HEIGHT,
        ...(offsetTop && {
          height: HEADER_DESKTOP_OFFSET_HEIGHT,
        }),
        transition: theme.transitions.create(['height'], {
          easing: theme.transitions.easing.easeInOut,
          duration: theme.transitions.duration.shorter,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent()}
      </Toolbar>

      {offsetTop && <HeaderShadow />}
    </AppBar>
  );
}
