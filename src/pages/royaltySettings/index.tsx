import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import { useGetRoyalList } from 'api/admin/queries';
import ConnectWalletRequest from 'components/ConnectWalletRequest';
import { H3, H5 } from 'components/Typography';
import { formatUnits } from 'ethers/lib/utils.js';
import useActiveToken from 'hooks/useActiveToken';
import { useCollectionContract } from 'hooks/useCollectionContract';
import useTitle from 'hooks/useTitle';
import { useState } from 'react';
import { prettyNumber } from 'utils/common';
import { SMART_CONTRACT_ADDRESS } from 'utils/constants';
import ChangeFeeForm from './components/ChangeFeeForm';
import ChangePriceForm from './components/ChangePriceForm';
import ChangeWalletForm from './components/ChangeWalletForm';
import RoyalList from './components/ListRoyal';

const RoyalSettings = () => {
  useTitle('Royal Fee Settings');
  const contract = useCollectionContract(SMART_CONTRACT_ADDRESS);
  const [royalFee, setRoyalFee] = useState<any>();
  const [premiumPrice, setPremiumPrice] = useState<any>();
  const [walletAddress, setWalletAddress] = useState<any>();
  const getData = async () => {
    const royalFeeTx = await contract?.royaltyFee();
    const basicPoint = await contract?.BASIS_POINT();
    const premiunPriceTx = await contract?.premiumPackPrice();
    const walletTx = await contract?.royaltyFeeTo();
    const royalTee = (Number(royalFeeTx?.toString()) / Number(basicPoint?.toString())) * 100;
    setRoyalFee(royalTee);
    setPremiumPrice(premiunPriceTx?.toString());
    setWalletAddress(walletTx);
  };
  getData();
  const { activeToken } = useActiveToken(97, '0x0000000000000000000000000000000000000000');
  const { data } = useGetRoyalList({ page: 1, limit: 10 });
  console.log(data);
  return (
    <>
      <ConnectWalletRequest />
      <Box pt={2} pb={4}>
        <Card sx={{ padding: 4, boxShadow: 1 }}>
          <H3>Royal Fee Information</H3>
          <Grid container sx={{ marginTop: 3 }}>
            <Grid item xs={8}>
              <Stack spacing={5}>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  <H5>Royal Fee: </H5>
                  <Typography> {royalFee}%</Typography>
                </Stack>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  <H5>Premium Price: </H5>
                  <Typography>
                    {prettyNumber(formatUnits(premiumPrice ?? '0', 18)).toString()} {activeToken?.tokenName}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  <H5>Wallet Address: </H5>
                  <Typography> {walletAddress}</Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack spacing={5}>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  <ChangeFeeForm />
                </Stack>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  <ChangePriceForm />
                </Stack>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  <ChangeWalletForm />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Card>
      </Box>
      <RoyalList />
    </>
  );
};

export default RoyalSettings;
