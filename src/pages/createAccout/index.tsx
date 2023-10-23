import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, MenuItem, Select, Stack, Typography } from '@mui/material';
import { createAccount } from 'api/auth';
import LightTextField from 'components/LightTextField';
import PasswordInput from 'components/PasswordInput';
import UploadZone from 'components/UploadZone';
import { useFormik } from 'formik';
import useTitle from 'hooks/useTitle';
import { FC } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { convertToFormData, handleErrorMutate } from 'utils/common';
import * as Yup from 'yup';

const CreateArtist: FC = () => {
  useTitle('Create Account');

  const { mutateAsync, isLoading } = useMutation(createAccount, {
    onSuccess: async (data) => {
      // navigate('/dashboard');
      toast.success('Created successfully!');
    },
    onError: handleErrorMutate,
  });

  const initialValues = {
    email: '',
    fullName: '',
    password: '',
    type: 1,
    image: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().trim().email('Invalid Email!').required('Email required!').label('Email'),
    password: Yup.string().min(6, 'Password should be of minimum 6 characters length').required('Password is required'),
    fullName: Yup.string().required('FullName required!'),
  });

  const { handleChange, values, handleSubmit, setFieldValue, touched, errors, handleBlur } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutateAsync(convertToFormData(values));
    },
  });
  return (
    <>
      <Box pt={2} pb={4}>
        <Card sx={{ padding: 4, boxShadow: 1 }}>
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={5}>
                <Typography sx={{ fontSize: 16, fontWeight: 700, mb: 2 }}>Avatar Image</Typography>
                <UploadZone
                  sx={{ width: 400, height: 400, mx: 'unset' }}
                  onSuccess={(file) => setFieldValue('image', file)}
                  initFile={values.image}
                  maxSize={4 * 1024 * 1024}
                ></UploadZone>
              </Grid>
              <Grid item xs={7}>
                <Stack pt={5} spacing={2}>
                  <Select fullWidth name="type" onChange={handleChange} value={values.type}>
                    <MenuItem value={2}>Artist</MenuItem>
                    <MenuItem value={1}>Admin</MenuItem>
                  </Select>
                  <LightTextField
                    fullWidth
                    name="fullName"
                    placeholder="Full Name"
                    value={values.fullName}
                    onChange={handleChange}
                    error={Boolean(touched.fullName && errors.fullName)}
                    helperText={touched.fullName && errors.fullName}
                  />
                  <LightTextField
                    fullWidth
                    name="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <PasswordInput
                    fullWidth
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password || ''}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  {/* <LightTextField
                    fullWidth
                    name="bio"
                    placeholder="Bio"
                    value={values.bio}
                    onChange={handleChange}
                    // error={Boolean(touched.name && errors.name)}
                    // helperText={touched.name && errors.name}
                    multiline
                    minRows={8}
                  /> */}
                  <LoadingButton loading={isLoading} type="submit" variant="contained">
                    Create Account
                  </LoadingButton>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Box>
    </>
  );
};

export default CreateArtist;
