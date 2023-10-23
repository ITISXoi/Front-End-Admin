import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import LoadingButton from '@mui/lab/LoadingButton';
import { Container, Stack, Typography } from '@mui/material';
import { resetPasswordRequest } from 'api/auth/request';
import FlexBox from 'components/FlexBox';
import PasswordInput from 'components/PasswordInput';
import { useFormik } from 'formik';
import NotFound from 'pages/notFound';
import { routesEnum } from 'routes';
import * as Yup from 'yup';
const ResetPassword = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const code = params.get('code');
  const initValues = {
    code: code,
    password: '',
    passwordConfirmation: '',
  };
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    password: Yup.string()
      .required('Password required!')
      .min(8, 'Password is too short, at least 8 characrters')
      .max(20, 'Password is too long, no longer then 20 characters')
      .label('Password'),
    passwordConfirmation: Yup.string()
      .required('Confirm your password')
      .oneOf([Yup.ref('password'), null], 'New Password must match'),
  });

  const { mutate } = useMutation(resetPasswordRequest, {
    onSuccess: () => {
      navigate(routesEnum.login);
    },
  });

  const { values, handleSubmit, handleChange, touched, errors } = useFormik({
    initialValues: initValues,
    validationSchema: schema,
    onSubmit: (values) => {
      mutate({
        code: String(values.code),
        password: String(values.password),
      });
    },
  });
  if (!code) return <NotFound />;
  return (
    <>
      <Container sx={{ width: { xs: '100%', md: '480px' }, padding: { md: '0px' }, textAlign: 'center', mt: 12 }}>
        <Typography variant="h3">Update New Password</Typography>
        <FlexBox sx={{ padding: 5, my: 3 }}>
          <form style={{ width: '100%' }} onSubmit={handleSubmit}>
            <Stack spacing={3} mb={2.5}>
              <PasswordInput
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
              <PasswordInput
                placeholder="Confirm Password"
                name="passwordConfirmation"
                value={values.passwordConfirmation}
                onChange={handleChange}
                error={Boolean(touched.passwordConfirmation && errors.passwordConfirmation)}
                helperText={touched.passwordConfirmation && errors.passwordConfirmation}
              />
            </Stack>

            <LoadingButton variant="contained" type="submit" fullWidth size="medium">
              Change Password
            </LoadingButton>
          </form>
        </FlexBox>
      </Container>
    </>
  );
};

export default ResetPassword;
