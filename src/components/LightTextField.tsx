import { styled, TextField, TextFieldProps } from '@mui/material';

const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  '& .MuiOutlinedInput-input': {
    fontWeight: 500,
    color: theme.palette.text.primary,
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

const LightTextField = (props: TextFieldProps) => {
  return <StyledTextField {...props} />;
};

export default LightTextField;
