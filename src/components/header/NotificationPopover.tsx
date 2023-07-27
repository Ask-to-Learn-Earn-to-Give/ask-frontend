import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Iconify from '../common/Iconify';

export default function NotificationPopover() {
  return (
    <>
      <IconButton>
        <Badge badgeContent={1} color="primary">
          <Iconify icon="solar:bell-bing-bold-duotone" />
        </Badge>
      </IconButton>
    </>
  );
}
