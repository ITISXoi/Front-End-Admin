import { Box, Button, Card } from '@mui/material';
import { updatePassword } from 'api/admin/request';
import FlexBox from 'components/FlexBox';
import PasswordInput from 'components/PasswordInput';
import { H1, Paragraph } from 'components/Typography';
import { useFormik } from 'formik';
import { FC } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const UpdatePassword: FC = () => {
    let navigate = useNavigate();
    const { mutate, isLoading } = useMutation(updatePassword, {
        onSuccess: () => {
            toast.success('Update password success');
            navigate('/');
        },
        onError: (error) => {
            console.log(error);
            toast.error('Update password failed!');
        },
    });

    const initialValues = {
        oldpassword: '',
        newpassword: '',
        passwordConfirmation: '',
    };
    // form field value validation schema
    const validationSchema = Yup.object().shape({
        oldpassword: Yup.string().max(255).required('Old password is required'),
        newpassword: Yup.string().min(6, 'Password should be of minimum 6 characters length').required('New password is required'),
        passwordConfirmation: Yup.string()
            .required('Confirm your password')
            .oneOf([Yup.ref('newpassword'), null], 'New Password must match'),
    });

    const { errors, values, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values: any) => {
            mutate({
                oldPassword: values.oldpassword,
                newPassword: values.newpassword,
            });
        },
    });

    return (
        <FlexBox sx={{ alignItems: 'center', flexDirection: 'column', justifyContent: 'center', height: { sm: '100vh' } }}>
            <Card sx={{ padding: 4, width: 600, boxShadow: 1 }}>
                <FlexBox alignItems="center" flexDirection="column" justifyContent="center" mb={5}>
                    <Box mb={1}>{/* <img src="/static/logo/logo.svg" width="100%" alt="Uko Logo" /> */}</Box>
                    <H1 fontSize={24} fontWeight={700}>
                        Update New Password
                    </H1>
                </FlexBox>
                <Box justifyContent="space-between" my="1rem">
                    <form noValidate onSubmit={handleSubmit}>
                        <Box >
                            <Box>
                                <Paragraph fontWeight={600} mb={1}>
                                    Old Password
                                </Paragraph>
                                <PasswordInput
                                    fullWidth
                                    name="oldpassword"
                                    onChange={handleChange}
                                    value={values.oldpassword || ''}
                                    error={Boolean(touched.oldpassword && errors.oldpassword)}
                                    helperText={touched.oldpassword && errors.oldpassword}
                                />
                            </Box>
                            <Box>
                                <Paragraph fontWeight={600} mb={1} mt={3}>
                                    Password
                                </Paragraph>
                                <PasswordInput
                                    fullWidth
                                    name="newpassword"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.newpassword || ''}
                                    error={Boolean(touched.newpassword && errors.newpassword)}
                                    helperText={touched.newpassword && errors.newpassword}
                                />
                            </Box>
                            <Box>
                                <Paragraph fontWeight={600} mb={1} mt={3}>
                                    Confirm Password
                                </Paragraph>
                                <PasswordInput
                                    fullWidth
                                    name="passwordConfirmation"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.passwordConfirmation}
                                    error={Boolean(touched.passwordConfirmation && errors.passwordConfirmation)}
                                    helperText={touched.passwordConfirmation && errors.passwordConfirmation}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ mt: 4 }}>
                            {isLoading ? null : (
                                <Button fullWidth type="submit" variant="contained">
                                    Update Password
                                </Button>
                            )}
                        </Box>
                    </form>
                </Box>
            </Card>
        </FlexBox>
    );
};

export default UpdatePassword;
