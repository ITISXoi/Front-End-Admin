import { DateTimePicker, LoadingButton } from '@mui/lab';
import { Avatar, Box, Card, Container, Grid, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { createCollectionRequest } from 'api/collection';
import { useListCurrencyToken } from 'api/common';
import FullPageLoader from 'components/FullScreenLoading';
import LightTextField from 'components/LightTextField';
import UploadZone from 'components/UploadZone';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import useTitle from 'hooks/useTitle';
import { useToggle } from 'hooks/useToggle';
import { FC, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { setCollectionId, setCurrency, setType } from 'store/ducks/collection/slice';
import { convertToFormData, handleErrorMutate } from 'utils/common';
import { IMPORT_COLLECTION_CHAIN, SMART_CONTRACT_ADDRESS } from 'utils/constants';
import * as Yup from 'yup';

interface Props {
  onNext: any;
}

const GeneralStep: FC<Props> = ({ onNext }) => {
  // const { isSupperAdmin } = useUser();

  useTitle('Create Collection');
  const [chainId, setChainID] = useState(97);
  const { data: currencies } = useListCurrencyToken({ chainId: chainId }, { enabled: !!chainId });
  const [toogle, toggleOpen] = useToggle();
  const dispatch = useDispatch();
  const [valueTime, setValueTime] = useState<any>(dayjs());
  const [isAutoMint, setAuto] = useState<string>('false');
  const { mutate, isLoading } = useMutation(createCollectionRequest, {
    onSuccess: (data) => {
      toggleOpen();
      // dispatch(setLayerQuantity(data?.numberLayers));
      // dispatch(setTotalNFT(data?.totalNfts));
      dispatch(setCollectionId(data?.id));
      dispatch(setCurrency(data?.currency));
      dispatch(setType(data?.type));
      onNext();
      toggleOpen();
    },
    onError: handleErrorMutate,
  });

  const initialValues = {
    name: '',
    description: '',
    address: SMART_CONTRACT_ADDRESS,
    chainId: chainId,
    paymentToken: '0x0000000000000000000000000000000000000000',
    currency: '',
    image: '',
    banner: '',
    symbol: '',
    type: 'general',
    price: '',
    startMintTime: null,
    endMintTime: null,
    totalNfts: '',
    isAutoMint: 1,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().max(256).required('Collection Name is field required!'),
    description: Yup.string().required('Collection description is field required').max(1000),
    totalNfts: Yup.string().required('Total NFT is field required!'),
    image: Yup.mixed().required('Collection Thumbnail is field required'),
    banner: Yup.mixed().required('Collection Banner is field required'),
  });

  const { values, errors, handleChange, handleSubmit, touched, setFieldValue } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: any) => {
      console.log(values);
      mutate(convertToFormData(values));
      // onNext();
    },
  });

  useEffect(() => {
    if (!chainId) return;
    setFieldValue('currency', currencies?.find((item) => item?.contractAddress === values.paymentToken)?.currency);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencies, values.paymentToken]);

  useEffect(() => {
    setChainID(values.chainId);
  }, [currencies, values.chainId]);

  return (
    <Box pt={2} pb={4}>
      {toogle ? <FullPageLoader /> : null}
      <Card sx={{ padding: 4 }}>
        <form onSubmit={handleSubmit}>
          <Container maxWidth="md">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <LightTextField
                  fullWidth
                  name="name"
                  placeholder="Collection Name"
                  value={values.name}
                  onChange={handleChange}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>

              <Grid item xs={12}>
                <LightTextField
                  fullWidth
                  name="symbol"
                  placeholder="Symbol"
                  value={values.symbol}
                  onChange={handleChange}
                  error={Boolean(touched.symbol && errors.symbol)}
                  helperText={touched.symbol && errors.symbol}
                />
              </Grid>

              <Grid item xs={12}>
                <LightTextField
                  fullWidth
                  name="description"
                  placeholder="Description"
                  value={values.description}
                  onChange={handleChange}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                  multiline
                  minRows={5}
                />
              </Grid>

              <Grid item xs={8}>
                <Select fullWidth name="chainId" onChange={handleChange} value={values.chainId}>
                  <MenuItem value={IMPORT_COLLECTION_CHAIN['ETH']}>Ethereum</MenuItem>
                  <MenuItem value={IMPORT_COLLECTION_CHAIN['POLYGON']}>POLYGON</MenuItem>
                  <MenuItem value={IMPORT_COLLECTION_CHAIN['BSC']}>Binance smart chain</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={4}>
                <Stack direction={'column'} spacing={2}>
                  {/* <label>&nbsp;</label> */}
                  {values.paymentToken && (
                    <Select
                      onChange={handleChange}
                      // disabled={disable}
                      fullWidth
                      name="paymentToken"
                      value={values.paymentToken}
                      // IconComponent={() => (disable ? null : <ArrowDropDownIcon />)}
                    >
                      {currencies?.map((item) => (
                        <MenuItem value={item.contractAddress} key={item.id}>
                          <Stack direction="row">
                            <Avatar src={item.icon} sx={{ width: 18, height: 18, mr: 1 }} /> {item.tokenName}
                          </Stack>
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={6}>
                <Select fullWidth name="type" onChange={handleChange} value={values.type}>
                  <MenuItem value={'general'}>General</MenuItem>
                  <MenuItem value={'random'}>Random</MenuItem>
                  <MenuItem value={'composite'}>Composite</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={6}>
                {values.type !== 'general' && (
                  <LightTextField
                    fullWidth
                    name="price"
                    placeholder="Price"
                    value={values.price}
                    onChange={handleChange}
                    error={Boolean(touched.price && errors.price)}
                    helperText={touched.price && errors.price}
                  />
                )}
              </Grid>

              <Grid item xs={6}>
                <Stack direction={'column'} spacing={2}>
                  <DateTimePicker
                    label="Start Mint Time (optimal)"
                    value={values.startMintTime}
                    onChange={(value) => {
                      setFieldValue('startMintTime', Date.parse(String(value)));
                      setValueTime(value);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack direction={'column'} spacing={2}>
                  <DateTimePicker
                    label="End Mint Time (optimal)"
                    value={values.endMintTime}
                    onChange={(value) => {
                      setFieldValue('endMintTime', Date.parse(String(value)));
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    // minTime={dayjs(valueTime)}
                    minDate={dayjs(valueTime)}
                  />
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <LightTextField
                  type="number"
                  fullWidth
                  name="totalNfts"
                  placeholder="Total NFT"
                  value={values.totalNfts}
                  onChange={handleChange}
                  error={Boolean(touched.totalNfts && errors.totalNfts)}
                  helperText={touched.totalNfts && errors.totalNfts}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ fontSize: 16, fontWeight: 700, my: 2 }}>Image</Typography>
                <UploadZone
                  sx={{ width: 300, height: 300, mx: 'unset' }}
                  onSuccess={(file) => setFieldValue('image', file)}
                  initFile={values.image}
                  maxSize={2 * 1024 * 1024}
                >
                  Max size file 2MB
                </UploadZone>
                {touched.image && errors.image && (
                  <Typography fontSize={12} sx={{ color: 'red', mt: 1 }}>
                    {errors.image}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <Typography sx={{ fontSize: 16, fontWeight: 700, my: 2 }}>Banner Image</Typography>
                <UploadZone
                  sx={{ width: '100%', height: 200, mx: 'unset' }}
                  onSuccess={(file) => setFieldValue('banner', file)}
                  initFile={values.banner}
                  maxSize={4 * 1024 * 1024}
                >
                  Max size file 4MB
                </UploadZone>
                {touched.banner && errors.banner && (
                  <Typography fontSize={12} sx={{ color: 'red', mt: 1 }}>
                    {errors.banner}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <LoadingButton loading={isLoading} type="submit" variant="contained">
                  Create Collection
                </LoadingButton>
              </Grid>
            </Grid>
          </Container>
        </form>
      </Card>
    </Box>
  );
};

export default GeneralStep;
