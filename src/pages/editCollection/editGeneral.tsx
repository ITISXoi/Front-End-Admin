/* eslint-disable @typescript-eslint/no-unused-vars */
import { DateTimePicker, LoadingButton } from '@mui/lab';
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { updateCollectionRequest, useCollection } from 'api/collection';
import { useListCurrencyToken } from 'api/common';
import FullPageLoader from 'components/FullScreenLoading';
import LightTextField from 'components/LightTextField';
import LoadingScreen from 'components/LoadingScreen';
import UploadZone from 'components/UploadZone';
import { useFormik } from 'formik';
import useTitle from 'hooks/useTitle';
import { useToggle } from 'hooks/useToggle';
import { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { setCollectionId, setCurrency, setType } from 'store/ducks/collection/slice';
import { handleErrorMutate } from 'utils/common';
import { IMPORT_COLLECTION_CHAIN, SMART_CONTRACT_ADDRESS } from 'utils/constants';
import * as Yup from 'yup';
import dayjs, { Dayjs } from 'dayjs';

interface Props {
  onNext: any;
}

const EditGeneralCollection: FC<Props> = ({ onNext }) => {
  // const { isSupperAdmin } = useUser();
  useTitle('Edit Collection General Info');
  const { id } = useParams();
  const { data: collection } = useCollection(Number(id));
  const [chainId, setChainID] = useState('97');
  const { data: currencies } = useListCurrencyToken({ chainId: chainId });
  const [toogle, toggleOpen] = useToggle();
  const dispatch = useDispatch();
  const [valueTime, setValueTime] = useState<any>(dayjs());
  const { mutate, isLoading } = useMutation(updateCollectionRequest, {
    onSuccess: (data) => {
      toast.success('Update successfully!');
      toggleOpen();
      // dispatch(setLayerQuantity(data?.numberLayers));
      // dispatch(setTotalNFT(data?.totalNfts));
      dispatch(setCollectionId(data?.id));
      dispatch(setCurrency(data?.currency));
      dispatch(setType(data?.type));
      toggleOpen();
      onNext();
    },
    onError: handleErrorMutate,
  });

  const initialValues = {
    id: Number(id),
    name: collection?.name || '',
    description: collection?.description || '',
    address: SMART_CONTRACT_ADDRESS,
    chainId: collection?.chainId || chainId,
    // numberLayers: collection?.numberLayers || '',
    // totalNfts: collection?.totalNfts || '',
    paymentToken: collection?.paymentToken || '0x0000000000000000000000000000000000000000',
    currency: collection?.currency || '',
    image: collection?.imageUrl || '',
    banner: collection?.bannerUrl || '',
    symbol: collection?.symbol || '',
    type: collection?.type || 'general',
    price: collection?.price || '',
    startMintTime: Number(collection?.startMintTime) || null,
    endMintTime: Number(collection?.endMintTime) || null,
  };
  const validationSchema = Yup.object().shape({
    // name: Yup.string().max(256).required('Collection Name requrired!'),
    // description: Yup.string().max(1000),
    // address: Yup.string().required(t('collection.contract_address_required')),
    // chainId: Yup.string().required(t('collection.chain_required')),
    // type: Yup.string().required(t('collection.type_required')),
    // image: Yup.mixed().required(t('collection.thumbnail_required')),
    // banner: Yup.mixed().required(t('collection.banner_required')),
  });

  const { values, errors, handleChange, handleSubmit, touched, setFieldValue } = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values: any) => {
      console.log(((new Date(Number(values.startMintTime))).toLocaleString('en-GB')));
      mutate(values);
    },
  });

  useEffect(() => {
    if (!chainId) return;
    setFieldValue('currency', currencies?.find((item) => item?.contractAddress === values.paymentToken)?.currency);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencies, values.paymentToken]);

  useEffect(() => {
    setChainID(values.chainId);
  }, [values.chainId]);

  useEffect(() => {
    if (!collection) return;
    setChainID(collection?.chainId);
    setFieldValue(
      'paymentToken',
      currencies?.find((item) => item?.contractAddress === collection.paymentToken)?.contractAddress
    );
    setFieldValue('currency', currencies?.find((item) => item?.contractAddress === collection.paymentToken)?.currency);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection, setFieldValue]);

  if (!collection) {
    return <LoadingScreen />;
  }

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
                  value={values.name}
                  onChange={handleChange}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                  label="Collection Name"
                />
              </Grid>

              <Grid item xs={12}>
                <LightTextField
                  fullWidth
                  name="symbol"
                  value={values.symbol}
                  onChange={handleChange}
                  error={Boolean(touched.symbol && errors.symbol)}
                  helperText={touched.symbol && errors.symbol}
                  label="Symbol"
                />
              </Grid>

              <Grid item xs={12}>
                <LightTextField
                  fullWidth
                  name="description"
                  label="Description"
                  value={values.description}
                  onChange={handleChange}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                  multiline
                  minRows={5}
                />
              </Grid>

              {/* <Grid item xs={12}>
                <LightTextField
                  fullWidth
                  name="numberLayers"
                  label="Number of Layers"
                  value={values.numberLayers}
                  onChange={handleChange}
                  error={Boolean(touched.numberLayers && errors.numberLayers)}
                  helperText={touched.numberLayers && errors.numberLayers}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12}>
                <LightTextField
                  fullWidth
                  name="totalNfts"
                  label="Total NFT"
                  value={values.totalNfts}
                  onChange={handleChange}
                  error={Boolean(touched.totalNfts && errors.totalNfts)}
                  helperText={touched.totalNfts && errors.totalNfts}
                  disabled={true}
                />
              </Grid> */}
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
                    minDate={dayjs(valueTime)}
                    // minTime={dayjs(valueTime)}
                  />
                </Stack>
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
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-start', gap: 1 }}>
                <Link to={`/collection/detail/${Number(id)}`}>
                  <Button variant="contained">Back</Button>
                </Link>
                <LoadingButton loading={isLoading} type="submit" variant="contained">
                  Submit
                </LoadingButton>
              </Grid>
            </Grid>
          </Container>
        </form>
      </Card>
    </Box>
  );
};

export default EditGeneralCollection;
