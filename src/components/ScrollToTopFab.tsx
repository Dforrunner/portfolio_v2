'use client';

import Fab from '@mui/material/Fab';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import useScroll from '@/hooks/useScroll';

export default function ScrollToTopFab() {
  const show = useScroll(200);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Fab
      aria-label='scroll to top'
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        display: show ? 'block' : 'none',
        backgroundColor: 'gray',
        color: 'white',
      }}
    >
      <KeyboardDoubleArrowUpIcon />
    </Fab>
  );
};
