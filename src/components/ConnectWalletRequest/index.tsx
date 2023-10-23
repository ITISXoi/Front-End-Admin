import { LoadingButton } from '@mui/lab';
import { Stack, Typography } from '@mui/material';
import { useAccountModal, useChainModal, useConnectModal } from '@rainbow-me/rainbowkit';

const ConnectWalletRequest = () => {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();

  if (!openConnectModal) return null;
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={3}
      sx={{
        position: 'fixed',
        borderRadius: 1,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: 'rgba(0,0,0,0.6)',
        zIndex: 999,
        backdropFilter: 'blur(10px)',
        // ...sx,
      }}
    >
      <Typography lineHeight="24px" variant="h5" align="center" color={'white'} sx={{ maxWidth: 585 }}>
        This action required wallet connect.
      </Typography>
      <LoadingButton size={'large'} variant="contained" color="primary" onClick={openConnectModal}>
        Connect wallet
      </LoadingButton>
    </Stack>
  );
};

export default ConnectWalletRequest;
