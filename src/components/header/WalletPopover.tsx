import { toEtherString, truncateWalletAddress } from '@/utils';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Iconify from '../common/Iconify';
import CustomPopover from '../popover/CustomPopover';
import { usePopover } from '../popover';
import Image from 'next/image';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ChainPopover from './ChainPopover';
import { useMemo, useState } from 'react';
import { TabContext } from '@mui/lab';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import { useClient } from '@/contexts/client/ClientContext';
import { TOKENS } from '@/configs/blockchain';

export default function WalletPopover() {
  const popover = usePopover();
  const [tab, setTab] = useState('assets');

  const { wallet } = useClient();

  const address = useMemo(() => {
    if (!wallet.address) return '';
    return truncateWalletAddress(wallet.address);
  }, [wallet.address]);

  const assets = useMemo(() => {
    return Object.keys(wallet.assets).map((symbol) => ({
      ...TOKENS[symbol],
      balance: toEtherString(wallet.assets[symbol].balance),
    }));
  }, [wallet.assets]);

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        color={wallet.isWrongNetwork ? 'error' : 'primary'}
        onClick={popover.onOpen}
      >
        <Iconify icon="solar:wallet-bold-duotone" sx={{ mr: { sm: 1 } }} />

        <Typography
          variant="body2"
          sx={{
            color: wallet.isWrongNetwork ? 'error.dark' : 'primary,dark',
            letterSpacing: '0.5px',
            display: { xs: 'none', sm: 'block' },
          }}
          noWrap
        >
          {wallet.isWrongNetwork ? 'Wrong Network' : address}
        </Typography>
      </Button>
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        sx={{ width: '450px', p: 2 }}
      >
        <Stack sx={{ pb: 2 }} direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center">
            <Tooltip title="Connected to MetaMask">
              <Image
                src="assets/icons/metamask.svg"
                alt="metamask"
                width={24}
                height={24}
              />
            </Tooltip>
            <Tooltip title="Copy">
              <Button size="small">
                <Typography
                  variant="subtitle2"
                  noWrap
                  sx={{ letterSpacing: '0.5px', color: 'text.secondary' }}
                >
                  {address}
                </Typography>
              </Button>
            </Tooltip>
            <IconButton size="small">
              <Iconify icon="solar:alt-arrow-down-bold" />
            </IconButton>
          </Stack>
          <ChainPopover />
        </Stack>
        <Box
          sx={{
            width: '100%',
            borderColor: 'divider',
            borderRadius: 2,
            py: 1,
            px: 3,
            bgcolor: 'background.default',
          }}
        >
          <TabContext value={tab}>
            <Tabs
              value={tab}
              onChange={(e, v) => setTab(v)}
              aria-label="lab API tabs example"
              sx={{
                '& .MuiTabs-indicator': {
                  bgcolor: 'primary.main',
                },
                '& .Mui-selected': {
                  color: 'primary.main',
                },
              }}
            >
              <Tab
                label="Assets"
                value="assets"
                icon={<Iconify icon="iconoir:coin" />}
              />
              <Tab
                label="Something"
                value="something"
                icon={<Iconify icon="iconoir:help-circle" />}
              />
            </Tabs>
            <TabPanel value="assets" sx={{ px: 0 }}>
              <Stack>
                {assets.map(({ symbol, color, name, balance }) => (
                  <Button key={symbol} sx={{ px: 2, py: 1 }}>
                    <Stack direction="row" sx={{ width: '100%' }}>
                      <Box
                        sx={{
                          p: '8px',
                          mr: 2,
                          height: 40,
                          width: 40,
                          borderRadius: '50%',
                          bgcolor: color,
                        }}
                      >
                        <Image
                          src={`assets/icons/coins/${symbol.toLowerCase()}.svg`}
                          width={24}
                          height={24}
                          alt="eth"
                        />
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle2"
                          align="left"
                          sx={{ letterSpacing: '0.5px' }}
                          noWrap
                        >
                          {name}
                        </Typography>
                        <Typography
                          variant="body2"
                          align="left"
                          sx={{ color: 'text.secondary' }}
                          noWrap
                        >
                          {balance} {symbol}
                        </Typography>
                      </Box>
                      <Box sx={{ flexGrow: 1 }} />
                      <Box>
                        <Typography variant="body1" align="right">
                          $1,234.56
                        </Typography>
                      </Box>
                    </Stack>
                  </Button>
                ))}
              </Stack>
            </TabPanel>
            <TabPanel value="something">Item Two</TabPanel>
          </TabContext>
        </Box>
      </CustomPopover>
    </>
  );
}
