/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import { IImageAttributes, INFT } from 'api/nft';
import { FC } from 'react';
import AttributesCard from './AttributesCard';

type Props = {
  item: INFT;
};

const Data: FC<Props> = ({ item }) => {
  const listImage = Array.isArray(JSON.parse(item.attributes)) ? JSON.parse(item.attributes) : [];
  console.log(listImage);
  return (
    <Card sx={{ padding: 4 }}>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" sx={{ mb: 1, ml: 3 }}>
          Data
        </Typography>
        <hr></hr>
        <Grid container columns={6} spacing={4}>
          <Grid item xs={6} md={2} sx={{ mt: 2, ml: 3 }}>
            <Stack spacing={2}>
              <Typography variant="h6">Address</Typography>
              <Typography variant="h6">Chain</Typography>
              <Typography variant="h6">Status</Typography>
              <Typography variant="h6">Token Id</Typography>
              <Typography variant="h6">Meta</Typography>
            </Stack>
          </Grid>
          <Grid item xs={6} md={2} spacing={3} sx={{ mt: 2 }}>
            <Stack spacing={2}>
              <Typography variant="h6" fontWeight={400}>
                {item?.contractAddress}
              </Typography>
              <Typography variant="h6" fontWeight={400}>
                {item?.chainId || 97}
              </Typography>
              <Typography variant="h6" fontWeight={400}>
                {item?.status || 'Confirm'}
              </Typography>
              <Typography variant="h6" fontWeight={400}>
                {item?.id || '-'}
              </Typography>
              <Typography sx={{ textDecoration: 'underline' }} variant="h6" fontWeight={400}>
                View On IPFS
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Typography variant="h5" sx={{ mb: 1, ml: 3 }}>
          Attributes
        </Typography>
        <hr></hr>
        <Grid container columns={20} sx={{ mt: 1 }} spacing={4}>
          {listImage.map(
            (item: IImageAttributes, index: number) => item && <AttributesCard item={item} key={index}></AttributesCard>
          )}
        </Grid>
      </Box>
    </Card>
  );
};

export default Data;
