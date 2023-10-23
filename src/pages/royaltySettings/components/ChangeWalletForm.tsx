import { LoadingButton } from '@mui/lab';
import { Box, Dialog, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import LightTextField from 'components/LightTextField';
import { useFormik } from 'formik';
import { useCollectionContract } from 'hooks/useCollectionContract';
import { useToggle } from 'hooks/useToggle';

import React from 'react';
import toast from 'react-hot-toast';
import { SMART_CONTRACT_ADDRESS } from 'utils/constants';
import { useAccount } from 'wagmi';

const ChangeWalletForm = () => {
  const [open, toggleOpen] = useToggle(false);
  const [loading, setLoading] = React.useState(false);
  const { address } = useAccount();
  const contract = useCollectionContract(SMART_CONTRACT_ADDRESS);

  //   const handleSubmit = async () => {
  //     try {
  //       if (!address) return;
  //       setLoading(true);
  //       const tx = await contract?.setRoyaltyFee()
  //       await tx?.wait(1);
  //       await delay(5000);
  //       setLoading(false);

  //       handleClose();
  //     } catch (error) {
  //       setLoading(false);
  //       toast.error(getErrorWeb3(error));
  //     }
  //   };

  const handleClose = () => {
    if (loading) return;
    toggleOpen();
  };

  const initValues = {
    address: '',
  };

  const { values, handleSubmit, handleChange, touched, errors } = useFormik({
    initialValues: initValues,
    // validationSchema: schema,
    onSubmit: (values) => {
      if (!address) return;
      const txRun = async () => {
        setLoading(true);
        try {
          const tx = await contract?.setRoyaltyFeeTo(values.address);
          await tx?.wait(1);
          toast.success('Change Wallet address Success!');
          setLoading(false);
          handleClose();
        } catch (error) {
          console.log(error);
          toast.error('Change Wallet address Failed!');
          setLoading(false);
        }
      };
      txRun();
    },
  });
  return (
    <>
      <Box onClick={toggleOpen}>
        <Typography variant="h6" sx={{ cursor: 'pointer', textDecoration: 'underline' }}>
          Change Wallet Address
        </Typography>
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth={'sm'} fullWidth>
        <DialogTitle>Change Wallet Address</DialogTitle>
        <DialogContent>
          <Typography color="black" sx={{ marginBottom: 2 }}>
            Set your wallet address:{' '}
          </Typography>
          <form style={{ width: '100%' }} onSubmit={handleSubmit}>
            <Stack spacing={3} mb={2.5}>
              <LightTextField
                fullWidth
                name="address"
                type="text"
                label="Wallet Address"
                //   onBlur={handleBlur}
                onChange={handleChange}
                value={values.address || ''}
                error={Boolean(touched.address && errors.address)}
                helperText={touched.address && errors.address}
              />
            </Stack>

            <LoadingButton variant="contained" type="submit" fullWidth size="medium" loading={loading}>
              Confirm
            </LoadingButton>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChangeWalletForm;
