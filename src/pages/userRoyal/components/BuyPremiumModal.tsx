import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogContent, DialogTitle, InputAdornment, Stack, Typography } from '@mui/material';
import LightTextField from 'components/LightTextField';
import { useFormik } from 'formik';
import { useCollectionContract } from 'hooks/useCollectionContract';
import { useToggle } from 'hooks/useToggle';

import React, { FC } from 'react';
import { SMART_CONTRACT_ADDRESS } from 'utils/constants';
import { useAccount } from 'wagmi';

interface Props {
  premiumPrice: number;
  royalFee?: number;
}

const BuyPremiumModal: FC<Props> = ({ premiumPrice, royalFee }) => {
  const [open, toggleOpen] = useToggle(false);
  const [loading, setLoading] = React.useState(false);
  const { address } = useAccount();
  const contract = useCollectionContract(SMART_CONTRACT_ADDRESS);

  const handleClose = () => {
    if (loading) return;
    toggleOpen();
  };

  const initValues = {
    pack: 0,
  };

  const { values, handleSubmit, handleChange, touched, errors } = useFormik({
    initialValues: initValues,
    // validationSchema: schema,
    onSubmit: (values) => {
      // if (!address) return;
      // const txRun = async () => {
      //   setLoading(true);
      //   try {
      //     const tx = await contract?.subscribePremiumPack({parseUnits(Number(values.pack)* ));
      //     await tx?.wait(1);
      //     toast.success('Change Royal Fee Success!');
      //     setLoading(false);
      //     handleClose();
      //   } catch (error) {
      //     console.log(error);
      //     toast.error('Change Royal Fee Failed!');
      //     setLoading(false);
      //   }
      // };
      // txRun();
    },
  });
  return (
    <>
      <Button onClick={toggleOpen} variant="contained">
        Buy Now
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth={'sm'} fullWidth>
        <DialogTitle>Buy Premium</DialogTitle>
        <DialogContent>
          <Typography color="black" sx={{ marginBottom: 2 }}>
            Set your royal fee:{' '}
          </Typography>
          <form style={{ width: '100%' }} onSubmit={handleSubmit}>
            <Stack spacing={3} mb={2.5}>
              <LightTextField
                fullWidth
                name="fee"
                type="number"
                label="Royal FEE"
                //   onBlur={handleBlur}
                onChange={handleChange}
                value={values.pack || ''}
                error={Boolean(touched.pack && errors.pack)}
                helperText={touched.pack && errors.pack}
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                inputProps={{
                  maxLength: 13,
                  step: '1',
                }}
              />
            </Stack>
            <Typography>{Number(values.pack) * Number(premiumPrice)} BNB</Typography>

            <LoadingButton variant="contained" type="submit" fullWidth size="medium" loading={loading}>
              Confirm
            </LoadingButton>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BuyPremiumModal;
