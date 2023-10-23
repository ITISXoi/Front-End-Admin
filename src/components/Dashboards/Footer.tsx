import { Box, Card, styled } from '@mui/material';
import { H1 } from 'components/Typography';
import { FC } from 'react';

// styled components
const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 3rem',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column-reverse',
    padding: '2rem',
    '& img': { marginBottom: '1.5rem' },
  },
}));

// component props interface
interface FooterProps {
  imageLink: string;
}

const Footer: FC<FooterProps> = ({ imageLink }) => {
  return (
    <StyledCard>
      <Box>
        <H1 fontSize={24}>Dashboard & UI kit</H1>
      </Box>

      <Box>
        <img src={imageLink} alt="saas-dasboard-footer" />
      </Box>
    </StyledCard>
  );
};

export default Footer;
