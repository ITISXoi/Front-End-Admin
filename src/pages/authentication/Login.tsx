import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, FormControlLabel, Switch } from '@mui/material';
import { loginRequest, useUser } from 'api/auth';
import { TextFieldWrapper } from 'components/authentication/StyledComponents';
import FlexBox from 'components/FlexBox';
import LightTextField from 'components/LightTextField';
import { H1, Paragraph, Small } from 'components/Typography';
import { useFormik } from 'formik';
import { FC } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { handleErrorMutate } from 'utils/common';
import { STORAGE_KEY } from 'utils/constants';
import * as Yup from 'yup';

const Login: FC = () => {
  let navigate = useNavigate();

  const { refetch } = useUser();

  const { mutate, isLoading } = useMutation(loginRequest, {
    onSuccess: async (data) => {
      localStorage.setItem(STORAGE_KEY.token, data.token);
      // localStorage.setItem(STORAGE_KEY.refreshToken, data.refresh_token);
      await refetch();
      navigate('/');
      toast.success('You Logged In Successfully test');
    },
    onError: handleErrorMutate,
  });

  const initialValues = {
    email: 'cuonghoang.var@gmail.com',
    password: 'Cuongbayern@123',
    submit: null,
    remember: true,
  };
  // form field value validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().max(255).required('Email or Username is required'),
    password: Yup.string().min(6, 'Password should be of minimum 6 characters length').required('Password is required'),
  });

  const { errors, values, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: any) => {
      const isEmail = await Yup.string().email().isValid(values.email);
      if (isEmail) {
        mutate({
          email: values.email,
          password: values.password,
        });
      } else {
        mutate({
          username: values.email,
          password: values.password,
        });
      }
    },
  });

  return (
    <FlexBox sx={{ alignItems: 'center', flexDirection: 'column', justifyContent: 'center', height: { sm: '100vh' } }}>
      <Card sx={{ padding: 4, maxWidth: 600, boxShadow: 1 }}>
        <FlexBox alignItems="center" flexDirection="column" justifyContent="center" mb={5}>
          <Box mb={1}>{/* <img src="/static/logo/logo.svg" width="100%" alt="Uko Logo" /> */}</Box>
          <H1 fontSize={24} fontWeight={700}>
            Sign in
          </H1>
        </FlexBox>

        <FlexBox justifyContent="space-between" flexWrap="wrap" my="1rem">
          <form noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
            <FlexBox justifyContent="space-between" flexWrap="wrap">
              <TextFieldWrapper>
                <Paragraph fontWeight={600} mb={1}>
                  Email or Username
                </Paragraph>
                <LightTextField
                  fullWidth
                  name="email"
                  type="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email || ''}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </TextFieldWrapper>

              <TextFieldWrapper>
                <Paragraph fontWeight={600} mb={1}>
                  Password
                </Paragraph>
                <LightTextField
                  fullWidth
                  name="password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password || ''}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
              </TextFieldWrapper>
            </FlexBox>

            <FlexBox mt={2} alignItems="center" justifyContent="space-between">
              <FormControlLabel
                control={<Switch name="remember" checked={values.remember} onChange={handleChange} />}
                label="Remember Me"
                sx={{ '& .MuiTypography-root': { fontWeight: 600 } }}
              />
              <Link to="/forget-password">
                <Small color="secondary.red">Forgot Password?</Small>
              </Link>
            </FlexBox>

            <Box sx={{ mt: 4 }}>
              {isLoading ? (
                <LoadingButton loading fullWidth variant="contained">
                  Sign In
                </LoadingButton>
              ) : (
                <Button fullWidth type="submit" variant="contained">
                  Sign In
                </Button>
              )}
            </Box>
          </form>

          <Small margin="auto" mt={3} color="text.disabled">
            Don't have an account?{' '}
            <Link to="/register">
              <Small color="primary.main">Create an account</Small>
            </Link>
          </Small>
        </FlexBox>
      </Card>
    </FlexBox>
  );
};

export default Login;
