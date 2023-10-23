import {
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  styled,
  TextField,
  TextFieldProps,
} from '@mui/material';
import Box from '@mui/system/Box';

export const Banner = styled('div')(({ theme }) => ({
  width: '100%',
  height: '300px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}));

export const Avatar = styled('img')(({ theme }) => ({
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundImage: 'url(https://img.seadn.io/files/c99f3f082a69fe9db9983d5859a1dcc8.png?auto=format&fit=max&w=750)',
  minWidth: '168px',
  height: '168px',
  borderImage: 'linear-gradient(to right bottom, #FF4D00, #FFA800)',
  borderWidth: '6px',
  borderStyle: 'solid',
  borderImageSlice: 1,
  borderRadius: '6px',
  marginTop: '-70px',
}));

export const Surface = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  width: '100%',
  border: '1px solid #555E71',
}));

export const BoxCard = styled('div')(() => ({
  boxShadow: '2px 2px 12px rgba(0, 0, 0, 0.05)',
  borderRadius: '10px',
  // border: '1px solid #E6E8F0',
  width: '100%',
  aspectRatio: '1/1',
  position: 'relative',
  // '&::after': {
  //   content: '"PREVIEW"',
  //   background: 'radial-gradient(100% 1225% at 0% 0%, #2730ED 0%, #FF718A 100%)',
  //   webkitBackgroundClip: 'text',
  //   webkitTextFillColor: 'transparent',
  //   backgroundClip: 'text',
  //   textFillColor: 'transparent',
  //   fontWeight: '800',
  //   fontSize: '20px',
  //   position: 'absolute',
  //   top: '20px',
  //   left: '20px',
  // },
}));

export const BoxItem = styled('div')(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  background: '#ffffff',
  boxShadow: '2px 2px 12px rgba(0, 0, 0, 0.05)',
  border: `2px solid ${theme.palette.text.primary}`,
  borderRadius: '4px ',
  '& img': {
    width: '100%',
    height: '100%',
    aspectRatio: '1',
    cursor: 'pointer',
    display: 'block',
    borderBottom: `2px solid ${theme.palette.text.primary}`,
  },
}));

export const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  width: '100%',
  '& input': {
    border: `2px solid ${theme.palette.text.primary}`,
    borderRadius: '4px',
  },
}));

export const Accordion = styled(MuiAccordion)(({ theme }) => ({
  border: `2px solid ${theme.palette.text.primary}`,
  borderRadius: '4px',
}));

export const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  border: `2px solid ${theme.palette.text.primary}`,
  borderRadius: '4px',
  '& .MuiAccordionSummary-content': {
    justifyContent: 'space-between',
  },
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
}));
