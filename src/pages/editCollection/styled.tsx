import DeleteOutline from '@mui/icons-material/DeleteOutline';
import { styled, TextField, TextFieldProps, Typography } from '@mui/material';

export const BoxItem = styled('div')(() => ({
  background: '#ffffff',
  boxShadow: '2px 2px 12px rgba(0, 0, 0, 0.05)',
  borderRadius: '14px',
  border: '2px solid #E6E8F0',
  '& img': {
    width: '100%',
    height: '100%',
    aspectRatio: '1',
    borderRadius: '14px',
    // cursor: 'pointer',
    display: 'block',
  },
}));

export const StyledImageTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
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

export const StyledDeleteIcon = styled(DeleteOutline) ({
  position: 'absolute',
  top: '10px',
  right: '10px',
  fontSize: '25px',
  '&:hover': {
    cursor: 'pointer',
    fontSize: '35px',
    transition: '0.25s ease-in-out 0s',
  },
})