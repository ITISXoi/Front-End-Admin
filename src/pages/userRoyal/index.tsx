import { Box, Button, Card, Grid, Stack, Typography } from '@mui/material';
import { useRoyalInfo } from 'api/user/queries';
import { buyPremiumRequest } from 'api/user/request';
import ConnectWalletRequest from 'components/ConnectWalletRequest';
import FullPageLoader from 'components/FullScreenLoading';
import { H3, H5 } from 'components/Typography';
import dayjs from 'dayjs';
import { formatUnits } from 'ethers/lib/utils.js';
import useActiveToken from 'hooks/useActiveToken';
import { useCollectionContract } from 'hooks/useCollectionContract';
import useTitle from 'hooks/useTitle';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { prettyNumber } from 'utils/common';
import { SMART_CONTRACT_ADDRESS } from 'utils/constants';
import { useAccount } from 'wagmi';

const UserRoyal = () => {
  useTitle('Premium Set');
  const { data } = useRoyalInfo();
  console.log('data', data?.data);
  const { activeToken } = useActiveToken(97, '0x0000000000000000000000000000000000000000');
  const { address } = useAccount();

  const contract = useCollectionContract(SMART_CONTRACT_ADDRESS);
  const [royalFee, setRoyalFee] = useState<any>();
  const [premiumPrice, setPremiumPrice] = useState<any>();
  const [walletAddress, setWalletAddress] = useState<any>();
  const [isFullLoading, setFullLoading] = useState(false);
  const getData = async () => {
    const royalFeeTx = await contract?.royaltyFee();
    const basicPoint = await contract?.BASIS_POINT();
    const premiunPriceTx = await contract?.premiumPackPrice();
    const walletTx = await contract?.royaltyFeeTo();
    const royalTee = (Number(royalFeeTx?.toString()) / Number(basicPoint?.toString())) * 100;
    setRoyalFee(royalTee);
    setPremiumPrice(premiunPriceTx?.toString());
    setWalletAddress(walletTx);
    // console.log(parseUnits(String(data?.price), activeToken?.decimal).toString());
  };
  getData();

  const { mutate } = useMutation(buyPremiumRequest, {
    onSuccess: (data) => {
      // toast.success('Draft success!');
      setFullLoading(false);
    },
    onError: (error: any) => {
      // toast.error(error?.meta?.message || 'Error');
      // console.log('error 2', error);
      toast.error('Buy Failed!');
      setFullLoading(false);
    },
  });

  const handleBuyPremium = async () => {
    setFullLoading(true);
    try {
      // const premiunPriceTx = await contract?.premiumPackPrice();
      const buyTx = contract?.subscribePremiumPack({ value: '10000000000000000' });
      (await buyTx)?.wait(1);
      mutate({
        wallet: address,
      });
      toast.success('Buy Success!');
    } catch (error) {
      console.log(error);
      toast.error('Buy Failed!');
      setFullLoading(false);
    }
  };

  return (
    <>
      <ConnectWalletRequest />
      {isFullLoading ? <FullPageLoader /> : null}
      <Box pt={2} pb={4}>
        <Card sx={{ padding: 4, boxShadow: 1 }}>
          <H3>Royal Fee Information</H3>
          <Grid container sx={{ marginTop: 3 }}>
            <Grid item xs={12}>
              {data?.data.length !== 0 && data?.data[0]?.status === 'confirmed' ? (
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  <Typography>You are in Premium now.</Typography>
                  <Typography>
                    Your Premium expried in{' '}
                    {dayjs.unix(Number(data?.data[0]?.endTime) / 1000).format('DD/MM/YYYY HH:mm')}.
                  </Typography>
                </Stack>
              ) : (
                <Stack spacing={5}>
                  <Stack direction="row" spacing={2} flexWrap="wrap">
                    <H5>Royal Fee: </H5>
                    <Typography> {royalFee} %</Typography>
                  </Stack>
                  <Stack direction="row" spacing={2} flexWrap="wrap">
                    <H5>
                      {prettyNumber(formatUnits(premiumPrice ?? '0', 18)).toString()} {activeToken?.tokenName}/ Year for
                      reduce 50% Royal fee !
                    </H5>
                  </Stack>
                  <Stack direction="row" spacing={2} flexWrap="wrap">
                    {/* <BuyPremiumModal /> */}
                    <Button onClick={handleBuyPremium} variant="contained">
                      Buy 1 Year Now
                    </Button>
                  </Stack>
                </Stack>
              )}
            </Grid>
          </Grid>
        </Card>
      </Box>
    </>
  );
};

export default UserRoyal;
