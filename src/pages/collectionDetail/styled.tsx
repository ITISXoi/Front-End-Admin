import {
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  Stack,
  styled,
} from '@mui/material';

export const Accordion = styled(MuiAccordion)(({ theme }) => ({
  border: `1px solid ${theme.palette.text.primary}`,
  borderRadius: '4px',
  background: 'none',
}));

export const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  border: `1px solid ${theme.palette.text.primary}`,
  background: '#fbf8ff',
  borderRadius: '4px 4px 0px 0px',
  '& .MuiAccordionSummary-content': {
    justifyContent: 'space-between',
  },
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  border: `1px solid ${theme.palette.text.primary}`,
  borderTop: 'none',
  borderRadius: '0px 0px 4px 4px',
  padding: theme.spacing(2),
  background: 'transparent',
}));

export const BoxItem = styled('div')(() => ({
  background: '#ffffff',
  boxShadow: '2px 2px 12px rgba(0, 0, 0, 0.05)',
  borderRadius: '4px',
  border: '2px solid #E6E8F0',
  '& img': {
    width: '100%',
    height: '100%',
    aspectRatio: '1',
    borderRadius: '4px 4px 0px 0px',
    cursor: 'pointer',
    display: 'block',
  },
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  padding: '0px 16px 0px 16px',
  margin: '8px 0px',
  mt: 1,
  width: '100%',
}));
