import { DateTimePicker } from '@mui/lab';
import LightTextField from 'components/LightTextField';
import dayjs from 'dayjs';
import { FC, memo } from 'react';

interface Props {
  value: string;
  name: string;
  onChange: any;
  error: boolean;
  helperText: string | false | undefined;
  setErrors?: any;
  disabled?: any;
}

const DatePickerField: FC<Props> = ({ onChange, name, value, helperText, error, setErrors, ...props }) => {
  return (
    <DateTimePicker
      disableOpenPicker={props.disabled}
      renderInput={(params) => {
        if (setErrors) {
          const isCorrect = dayjs(params?.inputProps?.value, 'MM/DD/YYYY hh:mm A', true).isValid();
          if (params?.inputProps?.value && !isCorrect) {
            setErrors((prev: any) => {
              const newState = prev;
              newState[`${name}`] = true;
              return newState;
            });
          } else {
            setErrors((prev: any) => {
              const newState = prev;
              newState[`${name}`] = false;
              return newState;
            });
          }
        }
        return <LightTextField name={name} value={value} error={error} helperText={helperText} {...params} />;
      }}
      onChange={(value) => {
        if (value) onChange(name, value);
      }}
      value={value}
      clearable
      {...props}
      minDate={dayjs()}
    />
  );
};

export default memo(DatePickerField);
