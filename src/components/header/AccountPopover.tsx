import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import CustomPopover, { usePopover } from '../popover';
import Balance from '../Balance';

export default function AccountPopover() {
  const popover = usePopover();

  return (
    <>
      <IconButton onClick={popover.onOpen} sx={{ width: 40, height: 40 }}>
        <Avatar
          sx={{
            width: 32,
            height: 32,
          }}
        />
      </IconButton>
      <CustomPopover open={popover.open} onClose={popover.onClose}>
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            Nguyen Quang Ninh
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            qndt123@gmail.com
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="column">
          <Balance value={2150000000000000000n} symbol="ETH" />
          <Balance value={1000000000000000000n} symbol="KLAY" />
        </Stack>
      </CustomPopover>
    </>
  );
}
