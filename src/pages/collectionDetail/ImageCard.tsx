import { Box, Typography } from '@mui/material';
import { IImageLayer } from 'api/collection';
import { FC } from 'react';
import { BoxItem, StyledStack } from './styled';

interface Props {
  image: IImageLayer;
  tokenName: string;
}
const ImageCard: FC<Props> = ({ image, tokenName }) => {
  return (
    <>
      <BoxItem>
        <img
          alt=""
          src={`${image?.imageUrl}`}
          srcSet={`${image?.imageUrl}`}
          loading="lazy"
          width={'100%'}
          style={{ border: '1px solid' }}
        />
        {/* <ImageListItemBar title={item?.name} /> */}
        <StyledStack direction="row" justifyContent={'space-between'}>
          <Typography variant="h6">Name:</Typography>
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <Typography variant="subtitle2">{image?.name}</Typography>
          </Box>
        </StyledStack>
        <StyledStack direction="row" justifyContent={'space-between'}>
          <Typography variant="h6">Price:</Typography>
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <Typography variant="subtitle2">
              {Number(image?.price)} {tokenName}
            </Typography>
          </Box>
        </StyledStack>
        <StyledStack direction="row" justifyContent={'space-between'} alignItems="center">
          <Typography variant="h6">Quantity:</Typography>
          <Typography variant="subtitle2">{image?.quantity}</Typography>
          <Typography variant="h6">Rarity:</Typography>
          <Typography variant="subtitle2">{Number(image?.probability)} %</Typography>
        </StyledStack>
      </BoxItem>
    </>
  );
};

export default ImageCard;
