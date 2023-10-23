import { Grid, Stack, Typography } from '@mui/material';
import { IListImageLayer } from 'api/collection';
import { FC } from 'react';
import { BoxItem } from './styled';

export interface Props {
  listImages?: IListImageLayer;
}
const ImageListLayer: FC<Props> = ({ listImages }) => {
  const totalQuantity = listImages?.data?.reduce((pre, next) => {
    return pre + Number(next.quantity ?? 0);
  }, 0);
  return (
    <>
      <Grid container columns={12} spacing={1} sx={{ mb: 3 }}>
        {listImages?.data[0] ? (
          <>
            {listImages?.data.map((item, index) => {
              return (
                <Grid item xs={3} key={index}>
                  <BoxItem>
                    <img src={`${item.imageUrl}`} width={100} alt="" />
                    <Stack direction={'row'} justifyContent={'space-between'} sx={{ px: 1 }}>
                      <Typography fontWeight={700}>{item?.name}</Typography>
                      <Typography fontWeight={700}>
                        {Number((Number(item?.quantity) / Number(totalQuantity)) * 100).toFixed(2)}%
                      </Typography>
                    </Stack>
                  </BoxItem>
                </Grid>
              );
            })}
          </>
        ) : (
          <Grid item xs={12} sx={{ minHeight: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h5">You haven't add any image.</Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default ImageListLayer;
