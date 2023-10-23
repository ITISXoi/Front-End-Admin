/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoadingButton } from '@mui/lab';
import { Avatar, Box, Card, Container, Grid, Stack, Typography } from '@mui/material';
// import { IUser, supperAminResetPasswordRequest, supperAminUpdateStatusRequest, useUser } from 'api/auth';
// import { useAdmin } from 'api/user';
// import FormDialog from 'components/Layouts/dialog/FormDialog';
import { H5 } from 'components/Typography';
import useTitle from 'hooks/useTitle';
// import { useTypeSafeTranslation } from 'hooks/useTypeSafeTranslation';
import { useDetailUsers } from 'api/user/queries';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

const UserDetail: FC = () => {
  useTitle('User Detail');
  const { id } = useParams();
  const { data } = useDetailUsers(Number(id));
  // const { t } = useTypeSafeTranslation();
  // useTitle(t('common.view_detail'));
  // const [isShowing, toggle] = useToggle();
  // const { isAdmin } = useUser();

  // const { data, refetch } = useAdmin({
  //   id: id,
  // });
  // const isOwner = data?.id === id;

  // const { mutate, isLoading } = useMutation(supperAminResetPasswordRequest, {
  //   onSuccess: async (_) => {
  //     toast.success(t('partnership.new_email_has_been_partnership'));
  //   },
  //   onError: handleErrorMutate,
  // });

  // const { mutate: updateStatus, isLoading: loadingUpdate } = useMutation(supperAminUpdateStatusRequest, {
  //   onSuccess: async () => {
  //     toast.success(t('common.status_updated'));
  //     toggle();
  //     refetch();
  //   },
  //   onError: handleErrorMutate,
  // });

  // const handleFreeze = (account: IUser, reason: string) => {
  //   if (!account) return;
  //   updateStatus({
  //     id: account.id,
  //     status: account.isActive === 1 ? 2 : 1,
  //     reason: reason,
  //   });
  // };

  // const handleSendMailResetPassword = (account?: IUser) => {
  //   if (!account) return;
  //   mutate({ id: account.id });
  // };

  return (
    <Box pt={2} pb={4}>
      <Card sx={{ padding: 4 }}>
        <Card sx={{ padding: 3, boxShadow: 2, mx: 'auto' }}>
          <Grid container>
            <Grid item xs={12} sm={4} lg={4}>
              <Container>
                <Stack spacing={2}>
                  <Avatar alt="" src={data?.avatarUrl || ''} sx={{ width: 150, height: 150, mx: 'auto' }} />
                  <Typography align="center">{data?.firstName}</Typography>
                  <Typography align="center">{data?.lastName}</Typography>
                </Stack>
              </Container>
            </Grid>
            <Grid item xs={12} sm={8} lg={8}>
              <Container>
                <Stack spacing={2}>
                  <Stack direction={'row'} spacing={2} flexWrap={'wrap'}>
                    <H5>Email:</H5>
                    <Typography>{data?.email} </Typography>
                  </Stack>
                  <Stack direction={'row'} spacing={2} flexWrap={'wrap'}>
                    <H5>First name: </H5>
                    <Typography color={'green'}>{data?.firstName} </Typography>
                  </Stack>
                  <Stack direction={'row'} spacing={2} flexWrap={'wrap'}>
                    <H5>Last name: </H5>
                    <Typography color={'green'}>{data?.lastName} </Typography>
                  </Stack>
                  <Stack direction={'row'} spacing={2} flexWrap={'wrap'}>
                    <H5>Date of birth: </H5>
                    <Typography color={'green'}>{data?.dateOfBirth} </Typography>
                  </Stack>
                  {/* {data?.type === 2 ? ( */}
                  <>
                    <Stack direction={'row'} spacing={2} flexWrap={'wrap'}>
                      {/* <H5>{t('user_detail.client_id')}:</H5> */}
                      {/* <Typography color={'green'}>{data?.clientId} </Typography> */}
                    </Stack>
                  </>
                  {/* ) : null} */}
                </Stack>
              </Container>
            </Grid>
            <Grid xs={12} item mt={2}>
              <Container>
                <Stack justifyContent={'end'} spacing={2} direction={'row'}>
                  {/* {isSupperAdmin && !isOwner && ( */}
                  {/* {isAdmin && ( */}
                  <>
                    <LoadingButton
                      // loading={loadingUpdate}
                      // onClick={() => toggle()}
                      size="small"
                      variant="contained"
                      // color={data?.status === 1 ? 'error' : 'secondary'}
                      sx={{ color: '#fff' }}
                    >
                      {!data?.status ? 'Active' : 'Unactive'}
                    </LoadingButton>
                    {/* {data?.isActive === 1 && ( */}
                    <LoadingButton
                      // loading={loadingUpdate}
                      // onClick={() => handleSendMailResetPassword(data)}
                      size="small"
                      variant="contained"
                    >
                      {/* {t('common.reset_password')} */}Update Password
                    </LoadingButton>
                    {/* )} */}

                    {/* <UpdateEmailModal id={Number(id)} refetch={refetch} /> */}
                    {/* <FormDialog
                        isShowing={isShowing}
                        handleSubmit={handleFreeze}
                        title={t('common.you_are_in_the_process_of_freezing')}
                        modalValue={data ?? {}}
                        buttonName={data?.isActive === 1 ? t('common.freeze') : t('common.unfreeze')}
                        toggle={toggle}
                        color={data?.isActive === 1 ? 'error' : 'secondary'}
                        isLoading={loadingUpdate}
                      /> */}
                  </>
                  {/* )}  */}

                  {/* {isOwner && ( */}
                  {/* <Link to={routesEnum.changePassword}>
                      <LoadingButton loading={isLoading} size="small" variant="contained">
                        {t('common.change_password')}
                      </LoadingButton>
                    </Link> */}
                  {/* )} */}
                </Stack>
              </Container>
            </Grid>
          </Grid>
        </Card>
      </Card>
    </Box>
  );
};

export default UserDetail;
