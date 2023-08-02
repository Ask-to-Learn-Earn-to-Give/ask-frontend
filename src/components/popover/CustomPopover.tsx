import { menuItemClasses } from '@mui/material/MenuItem';
import Popover, { PopoverOrigin } from '@mui/material/Popover';
import { getPosition } from './utils';
import { MenuPopoverProps } from './types';

export default function CustomPopover({
  open,
  children,
  arrow = 'top-right',
  sx,
  ...other
}: MenuPopoverProps) {
  const { style, anchorOrigin, transformOrigin } = getPosition(arrow);

  return (
    <Popover
      open={Boolean(open)}
      anchorEl={open}
      anchorOrigin={anchorOrigin as PopoverOrigin}
      transformOrigin={transformOrigin as PopoverOrigin}
      PaperProps={{
        sx: {
          width: 'auto',
          overflow: 'inherit',
          ...style,
          [`& .${menuItemClasses.root}`]: {
            '& svg': {
              mr: 2,
              flexShrink: 0,
            },
          },
          ...sx,
        },
      }}
      {...other}
    >
      {children}
    </Popover>
  );
}