import { CircularProgress, styled } from '@mui/material';

const FullPageSurface = styled('div')(({ theme }) => ({
  position: 'fixed',
  zIndex: 999999999999999999,
  top: 0,
  left: 0,
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'black',
  opacity: '0.5',
  // [theme.breakpoints.up('md')]: {
  //   display: 'none',
  // },
}));

const FullPageLoader = () => {
  return (
    <FullPageSurface>
      <CircularProgress size={50} />
    </FullPageSurface>
  );
};

export default FullPageLoader;
