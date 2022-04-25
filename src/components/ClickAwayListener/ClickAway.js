import * as React from 'react';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import SelectMultiple from '../SelectMultiple/SelectMultiple';
import IconActions from '../MeetingScreen/IconActions';
import People from '../../assets/images/people.svg'

export default function ClickAway() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => true);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const styles = {
    width: '246px',
    height: '309px',
    background: '#fff',
    borderRadius: '8px',
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: 1,
    p: 1,
    padding: '16px',
    maxHeight: '309px',
    overflowY: 'scroll'
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: 'relative' }} onClick={handleClick}>
        <IconActions src={People} alt="people" marginProps='0' />
        {open ? (
          <Box sx={styles}><SelectMultiple title={'ASSIGNED TO'} /></Box>
        ) : null}
      </Box>
    </ClickAwayListener>
  );
}
