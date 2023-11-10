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
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          borderRadius: '10px',
          gap: '10px',
        }}
        mb="24px"
        position="relative"
      >
        <img style={{ borderRadius: '10px', width: '400px' }} src="/static/empty/empty.jpeg" alt="empty" />
      </Box>
    </Wrapper>
  );
};

export default memo(Empty);
