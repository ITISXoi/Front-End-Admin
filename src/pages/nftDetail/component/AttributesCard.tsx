/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, Grid, Stack, Typography } from '@mui/material';
import { IImageAttributes } from 'api/nft';
import { FC } from 'react';

type Props = {
  item: IImageAttributes;
};

const AttributesCard: FC<Props> = ({ item }) => {
  return (
    <Grid item sm={10} xs={20} lg={6} xl={5}>
      <Card sx={{ height: '140px', borderRadius: 3, border: '1px solid blue', backgroundColor: 'lavender' }}>
        <Stack display="flex" direction="column" sx={{ mt: 1 }}>
          <Typography variant="overline" color="#3366FF" textAlign={'center'}>
            {item?.layerName || 'Layer Name'}
          </Typography>
          <Typography variant="button" sx={{ ml: '1px' }} textAlign={'center'}>
            {item?.imageName || 'Image Name'}
          </Typography>
          <Typography variant="overline" color="#a7a7a7" sx={{ ml: '1px' }} textAlign={'center'}>
            {Number(item?.imagePercent).toFixed(2) || 'Percent'}% have this trait
          </Typography>
          <Typography variant="overline" sx={{ ml: '1px' }} textAlign={'center'}>
            PRICE {Number(item?.imagePrice) || '0'} tBNB
          </Typography>
        </Stack>
      </Card>
    </Grid>
  );
};

export default AttributesCard;
