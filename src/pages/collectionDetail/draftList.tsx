import { Box, Button, Grid, Typography } from '@mui/material';
import { useListAllDraftNFT } from 'api/collection';
import FlexBox from 'components/FlexBox';
import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BoxItem, StyledStack } from './styled';

interface Props {
  collectionId: number;
  isAutoMint: boolean;
}

const DraftList: FC<Props> = ({ collectionId, isAutoMint }) => {
  const { data } = useListAllDraftNFT({
    // address: '0xB397a778c16AAEc8A30c16f8de30f2533fF892Be',
    // address: '0x18f459fa6086657Fee39552BdD6Abb6f8f7dE105',
    // chain: 'mumbai',
    // chain: chainName[0]?.name || '',
    // type: 'draft',
    collectionKeyId: collectionId,
    page: 1,
    limit: 100,
  });
  const navigate = useNavigate();

  const handleOnCLick = (id: string) => {
    navigate(`/collection/draft/${collectionId}?id=${id}`);
  };
  return (
    <>
      {!isAutoMint && (
        <FlexBox justifyContent={'flex-end'}>
          <Link to={`/collection/draft/${collectionId}`}>
            <Button size="large" variant="contained">
              <Typography sx={{ color: 'white' }} variant="h6">
                Create Draft
              </Typography>
            </Button>
          </Link>
        </FlexBox>
      )}
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mt: 2, pb: 5 }}>
        {data?.items?.map((item, index) => {
          return (
            <Grid item xs={3} key={index}>
              <BoxItem onClick={() => handleOnCLick(item?.id)}>
                <img
                  alt=""
                  src={`${item?.imageUrl}`}
                  srcSet={`${item?.imageUrl}`}
                  loading="lazy"
                  width={'100%'}
                  style={{ border: '1px solid' }}
                />
                {/* <ImageListItemBar title={item?.name} /> */}
                <StyledStack direction="row" justifyContent={'space-between'}>
                  <Typography variant="h6">Name:</Typography>
                  <Box sx={{ width: '100%', textAlign: 'center' }}>
                    <Typography variant="subtitle2">{item?.name}</Typography>
                  </Box>
                </StyledStack>
                <StyledStack direction="row" justifyContent={'space-between'}>
                  <Typography variant="h6">Price:</Typography>
                  <Box sx={{ width: '100%', textAlign: 'center' }}>
                    <Typography variant="subtitle2">{Number(item?.price)} BNB</Typography>
                  </Box>
                </StyledStack>
                {/* <StyledStack direction="row" justifyContent={'space-between'} alignItems="center">
              <Typography variant="h6">Quantity:</Typography>
              <Typography variant="subtitle2">{item?.quantity}</Typography>
              <Typography variant="h6">Rarity:</Typography>
              <Typography variant="subtitle2">{Number(item?.probability)} %</Typography>
            </StyledStack> */}
              </BoxItem>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default DraftList;
