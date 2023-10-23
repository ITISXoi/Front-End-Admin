/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Card, Container, Grid, Stack, Typography } from '@mui/material';
// import { IUser, supperAminResetPasswordRequest, supperAminUpdateStatusRequest, useUser } from 'api/auth';
// import { useAdmin } from 'api/user';
// import FormDialog from 'components/Layouts/dialog/FormDialog';
import { H5 } from 'components/Typography';
import useTitle from 'hooks/useTitle';
// import { useTypeSafeTranslation } from 'hooks/useTypeSafeTranslation';
import { useNFTById } from 'api/nft';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import Detail from './component/Detail';
import Data from './component/Data';

const NFTDetail: FC = () => {
  useTitle('NFT Detail');
  const { id } = useParams();
  const { data } = useNFTById(Number(id));
  if (!data) {
    return null;
  }
  return (
    <Container>
      <Box pt={2} pb={4}>
        <Detail item={data}></Detail>
        <Data item={data}></Data>
      </Box>
    </Container>
  );
};

export default NFTDetail;
