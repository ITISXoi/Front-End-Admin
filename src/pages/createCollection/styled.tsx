import { styled, TextField, TextFieldProps, Typography } from '@mui/material';

const StyledImageTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  //   height: '20px',
  '& .MuiOutlinedInput-input': {
    fontWeight: 500,
    color: theme.palette.text.primary,
    height: '0px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: '8px',
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? theme.palette.primary : theme.palette.divider,
  },
  '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary,
  },
}));

export const StyledErrorText = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  fontSize: '10px',
  mt: '37px',
}));

export const StyledLabel = styled('label')(() => ({
  fontSize: 16,
  fontWeight: 700,
  my: 2,
}));

export default StyledImageTextField;
