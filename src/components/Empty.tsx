import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { FC, memo } from 'react';

const Wrapper = styled('div')({
  margin: '0px auto',
  marginTop: 32,
  width: '100%',
  height: '100%',
  maxHeight: 500,
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});

interface Props {
  sx?: SxProps;
}

const Empty: FC<Props> = ({ sx }) => {
  return (
    <Wrapper sx={sx}>
      <Box mb="24px" width="108px" height="108px" position="relative">
        <img src="/static/common/empty.png" width="108px" alt="empty" />
        <Typography variant="caption" align="center">
          No item found.
        </Typography>
      </Box>
    </Wrapper>
  );
};

export default memo(Empty);
