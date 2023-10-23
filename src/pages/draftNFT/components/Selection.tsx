import { Box, Grid, Stack, Typography } from '@mui/material';
import { FC } from 'react';

import { BoxItem } from './styled';

type Props = {
  src?: string;
  list: any[];
  handeClickItem: any;
};

const Selection: FC<Props> = ({ list, handeClickItem }) => {
  return (
    <Grid container columns={12} spacing={1}>
      {list.map((item, index) => {
        return (
          <Grid item xs={3} key={index}>
            <BoxItem onClick={() => handeClickItem(item)}>
              <img
                className="image-hover"
                src={`${item.imageUrl.slice(0, -4)}` + `_thumbnail` + `${item.imageUrl.slice(-4)}`}
              />
              <Stack sx={{ p: 1 }}>
                <Typography variant="h6">
                  {item.name.slice(0, 10)}: {Number(item?.probability)}%
                </Typography>
                <Typography variant="h6">Price: {Number(item.price)} MATIC</Typography>
                <Box
                  color="#FFFFFF"
                  sx={{
                    position: 'absolute',
                    right: '5px',
                    top: '5px',
                    width: '36px',
                    height: '36px',
                    backgroundColor: '#0E76FD',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                  }}
                >
                  <Typography variant="h6" fontSize="12px">{`${item.remainingQuantity}/${item.quantity}`}</Typography>
                </Box>
              </Stack>
            </BoxItem>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Selection;
