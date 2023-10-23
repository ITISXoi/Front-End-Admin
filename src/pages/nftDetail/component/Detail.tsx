/* eslint-disable @typescript-eslint/no-unused-vars */
import { Container, Card, Grid, Stack, Typography, Box } from '@mui/material';
import { INFT } from 'api/nft';
import { H5 } from 'components/Typography';
import { FC } from 'react';

type Props = {
  item: INFT;
};

const Detail: FC<Props> = ({ item }) => {
  return (
    <Card sx={{ padding: 4, mb: 3 }}>
      <Grid container columns={5} spacing={4}>
        <Grid item xs={5} md={3}>
          <Container>
            <Stack spacing={2}>
              <Stack direction={'row'} spacing={2} flexWrap={'wrap'}>
                <Typography variant="h6">Name:</Typography>
                <Typography variant="h6" fontWeight={400}>
                  {item.name}{' '}
                </Typography>
              </Stack>
              <Stack direction={'row'} spacing={2} flexWrap={'wrap'}>
                <Typography variant="h6">Collection name:</Typography>
                <Typography variant="h6" fontWeight={400}>
                  {item.collectionName}{' '}
                </Typography>
              </Stack>
              <Stack direction={'row'} spacing={2} flexWrap={'wrap'}>
                <Typography variant="h6">Description:</Typography>
                <Typography variant="h6" fontWeight={400}>
                  {item.description}{' '}
                </Typography>
              </Stack>
              <Stack direction={'row'} spacing={2} flexWrap={'wrap'}>
                <Typography variant="h6">Owner:</Typography>
                <Typography variant="h6" fontWeight={400} color={'green'}>
                  {item.owner}{' '}
                </Typography>
              </Stack>
              <Stack direction={'row'} spacing={2} flexWrap={'wrap'}>
                <Typography variant="h6">Price:</Typography>
                <Box display="flex" alignItems="end">
                  <Typography variant="h6" fontWeight={400} sx={{ mr: 2 }}>
                    {Number(item.price) || '0'} MATIC
                  </Typography>
                  {/* <Typography>${Number(item.price) * 24832}</Typography> */}
                </Box>
              </Stack>
            </Stack>
          </Container>
        </Grid>
        <Grid item xs={5} md={2}>
          <Container>
            <Stack spacing={2}>
              <img alt={item.name} src={item.imageUrl || ''} style={{ width: 200, height: 200, marginLeft: 30 }} />
            </Stack>
          </Container>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Detail;
