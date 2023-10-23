import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { useToggle } from 'hooks/useToggle';
import { FC, memo } from 'react';

// type PasswordFieldProps = TextFieldProps & {
//   GenerateFC?: () => void;
// };

const PasswordInput: FC<TextFieldProps> = ({ label, ...props }) => {
  const [show, toggleShow] = useToggle(false);

  return (
    <TextField
      type={show ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={toggleShow}>
              {show ? (
                <VisibilityIcon fontSize="small" sx={{ color: (theme) => theme.palette.text.primary }} />
              ) : (
                <VisibilityOffIcon fontSize="small" sx={{ color: (theme) => theme.palette.text.primary }} />
              )}
            </IconButton>
            {/* {GenerateFC !== undefined ? (
              <IconButton onClick={GenerateFC}>
                <ReplayIcon fontSize="small" sx={{ color: (theme) => theme.palette.text.primary }} />
              </IconButton>
            ) : null} */}
          </InputAdornment>
        ),
      }}
      label={label}
      fullWidth
      variant="outlined"
      {...props}
    />
  );
};

export default memo(PasswordInput);
