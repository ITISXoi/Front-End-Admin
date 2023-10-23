import { LoadingButton } from '@mui/lab';
import { Box, Dialog, DialogContent, DialogTitle, InputAdornment, Stack, Typography } from '@mui/material';
import LightTextField from 'components/LightTextField';
import { useFormik } from 'formik';
import useActiveToken from 'hooks/useActiveToken';
import { useCollectionContract } from 'hooks/useCollectionContract';
import { useToggle } from 'hooks/useToggle';

import React from 'react';
import toast from 'react-hot-toast';
import { SMART_CONTRACT_ADDRESS } from 'utils/constants';
import { useAccount } from 'wagmi';

const ChangePriceForm = () => {
  const [open, toggleOpen] = useToggle(false);
  const [loading, setLoading] = React.useState(false);
  const { address } = useAccount();
  const contract = useCollectionContract(SMART_CONTRACT_ADDRESS);
  const { activeToken } = useActiveToken(97, '0x0000000000000000000000000000000000000000');

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
    price: 0,
  };

  const { values, handleSubmit, handleChange, touched, errors } = useFormik({
    initialValues: initValues,
    // validationSchema: schema,
    onSubmit: (values) => {
      if (!address) return;
      const txRun = async () => {
        setLoading(true);
        try {
          const tx = await contract?.setPremiumPackPrice(Number(values.price));
          await tx?.wait(1);
          toast.success('Change Price Success!');
          setLoading(false);
          handleClose();
        } catch (error) {
          console.log(error);
          toast.error('Change Price Failed!');
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
          Change Premium price
        </Typography>
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth={'sm'} fullWidth>
        <DialogTitle>Change Premium price</DialogTitle>
        <DialogContent>
          <Typography color="black" sx={{ marginBottom: 2 }}>
            Set your Premium price per year:{' '}
          </Typography>
          <form style={{ width: '100%' }} onSubmit={handleSubmit}>
            <Stack spacing={3} mb={2.5}>
              <LightTextField
                fullWidth
                name="price"
                type="text"
                label="Premium price"
                //   onBlur={handleBlur}
                onChange={handleChange}
                value={values.price || ''}
                error={Boolean(touched.price && errors.price)}
                helperText={touched.price && errors.price}
                InputProps={{
                  endAdornment: <InputAdornment position="end">{activeToken?.tokenName}</InputAdornment>,
                }}
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

export default ChangePriceForm;
