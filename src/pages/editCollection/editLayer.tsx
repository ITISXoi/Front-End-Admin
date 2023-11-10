/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, InputAdornment, Stack, Typography } from '@mui/material';
import { createDraftRequest, createLayer, updateLayer, useCollection, useLayerPreview } from 'api/collection';
import { IImageObject, ILayerCreate } from 'api/collection/types';
import LightTextField from 'components/LightTextField';
import LoadingScreen from 'components/LoadingScreen';
import UploadImages from 'components/UploadZone/UploadImages';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import { usePathQuery } from 'hooks/useQueryParams';
import useTitle from 'hooks/useTitle';
import { BoxItem, StyledDeleteIcon } from 'pages/editCollection/styled';
import { FC, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { convertToFormData } from 'utils/common';
import * as Yup from 'yup';
import { StyledErrorText, StyledImageTextField } from './styled';

interface Props {
  onBack: () => void;
  onNext: () => void;
}

const EditLayer: FC<Props> = ({ onBack, onNext }) => {
  useTitle('Edit Collection');
  const { id } = useParams();
  const collectionId = Number(id);
  const { data: collection } = useCollection(collectionId);
  // const totalNFT = useMemo(() => Number(collection?.totalNfts), [collection]);
  // const numberLayers = useMemo(() => collection?.numberLayers, [collection]);
  const query = usePathQuery();
  const step = Number(query.get('step'));
  const navigate = useNavigate();
  const { data } = useLayerPreview({ collectionId: collectionId, layerIndex: step });
  const [imageObjectList, setImageObjectList] = useState<IImageObject[]>(data ? data?.images : []);

  const { mutate: finishDraft } = useMutation(createDraftRequest, {
    onSuccess: (data) => {
      toast.success('Created Draft NFTs Succesed !');
      navigate(`/collection/detail/${collectionId}`);
    },
    onError: () => {
      toast.error('Finish Failed');
    },
  });

  const initialValues: ILayerCreate = {
    name: data?.name || '',
    description: data?.description || '',
    collectionId: collectionId,
    layerIndex: step,
    images: data?.images || [],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().max(256).required('Collection Name requrired!'),
    images: Yup.array().of(
      Yup.object().shape({
        quantity: Yup.number()
          .typeError('You must specify a number')
          .required('Quantity required!')
          .min(1, 'Quantity must bigger than 0'),
        price: Yup.number().typeError('You must specify a number').required('Quantity required!'),
      })
    ),
    // .test('sum', '*Error: Sum of images must be equal to total image copies!', (images) => {
    //   const sum = images?.reduce<number>((sum, item) => {
    //     return sum + Number(item.quantity);
    //   }, 0);
    //   return Number(sum) === Number(totalQuantity);
    // }),
  });

  const navigateHandle = () => {
    onNext();
    // navigate(`/collection/detail/${collectionId}`);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    // enableReinitialize: true,
    onSubmit: (values: ILayerCreate) => {
      // values.images = imageList;
      console.log(values, 'hihih');
      const listHaveFile = values?.images?.filter((item_) => typeof item_.imageUrl !== 'string');
      const listNotHaveFile = values?.images?.filter((item_) => typeof item_.imageUrl === 'string');
      const imagesDescription = listHaveFile
        .map((imgObject, index) => {
          return JSON.stringify({
            name: imgObject?.name,
            quantity: imgObject?.quantity,
            probability: Number(Number((imgObject?.quantity * 100) / totalQuantity).toFixed(2)),
            price: imgObject?.price,
            description: '',
          });
        })
        .toString();

      const dataUpdate = listNotHaveFile
        .map((imgObject, index) => {
          return JSON.stringify({
            id: imgObject?.id,
            name: imgObject?.name,
            quantity: imgObject?.quantity,
            probability: Number(Number((imgObject?.quantity * 100) / totalQuantity).toFixed(2)),
            price: imgObject?.price,
            description: '',
            imageUrl: imgObject.imageUrl,
          });
        })
        .toString();
      console.log(
        listNotHaveFile.map((imgObject, index) => {
          return {
            ...imgObject,
            id: imgObject?.id,
            name: imgObject?.name,
            quantity: imgObject?.quantity,
            probability: Number(Number((imgObject?.quantity * 100) / totalQuantity).toFixed(2)),
            price: imgObject?.price,
            description: '',
          };
        })
      );
      const mutate = data?.name ? update : add;
      mutate(
        convertToFormData({
          name: values.name,
          description: values?.description,
          collectionId: values?.collectionId,
          layerIndex: values?.layerIndex,
          images:
            listHaveFile.map((item) => {
              return item.imageUrl;
            }) || '',
          imagesDescription: `[${imagesDescription.toString()}]`,
          dataUpdate: `[${dataUpdate.toString()}]`,
        })
      );
    },
  });

  const { values, errors, handleChange, handleSubmit, touched, setFieldValue, setValues } = formik;
  const { mutate: add, isLoading: loadingAdd } = useMutation(createLayer, {
    onSuccess: (data) => {
      toast.success('Create layer successfully!');
      navigateHandle();
    },
    onError: () => {
      toast.error('Create Failed');
    },
  });

  const { mutate: update, isLoading: loadingUpdate } = useMutation(updateLayer, {
    onSuccess: (data) => {
      toast.success('Update layer successfully!');
      navigateHandle();
    },
    onError: () => {
      toast.error('Update Failed');
    },
  });

  const onSuccess = (files: File[] | undefined) => {
    if (!files) return;
    // if (files.length + imageObjectList.length > totalNFT) {
    //   toast.error(`You cant add more than ${totalNFT} image`);
    //   return;
    // }
    let quantity = 1;
    // let lastQuantity = 0;
    // if (imageObjectList.length === 0) {
    //   quantity = Math.round(totalNFT / files.length);
    //   lastQuantity = totalNFT - quantity * (files.length - 1);
    // }
    const imageObjectNew = files?.map((file, index) => {
      if (index === files?.length - 1)
        return {
          name: file.name.substring(0, file.name.indexOf('.')),
          quantity: quantity,
          probability: Number(Number((quantity * 100) / totalQuantity).toFixed(2)),
          price: 0,
          imageUrl: file,
        };
      return {
        name: file.name.substring(0, file.name.indexOf('.')),
        quantity: quantity,
        probability: Number(Number((quantity * 100) / totalQuantity).toFixed(2)),
        price: 0,
        imageUrl: file,
      };
    });
    if (files && files.length > 0) {
      setImageObjectList((pre) => [...pre, ...imageObjectNew]);
    }
  };

  const totalQuantity: number = useMemo(() => {
    return values?.images?.reduce<number>((sum, item) => {
      return sum + Number(item.quantity);
    }, 0);
  }, [values]);

  useEffect(() => {
    async function setInitialValues() {
      if (data)
        await setValues(
          {
            name: data?.name,
            description: data?.description,
            collectionId: collectionId,
            layerIndex: step,
            images: data.images,
          },
          false
        );
      else
        setValues(
          {
            name: '',
            description: '',
            collectionId: collectionId,
            layerIndex: step,
            images: [],
          },
          false
        );
      setImageObjectList(data?.images || []);
    }
    setInitialValues();
  }, [data, step, setValues, collectionId]);

  useEffect(() => {
    const temp = imageObjectList?.map((item) => {
      return { ...item, price: Number(item.price) };
    });
    setFieldValue('images', temp);
  }, [imageObjectList, setFieldValue]);

  if (!data) {
    return <LoadingScreen />;
  }

  return (
    <FormikProvider value={formik}>
      <Box>
        <Card sx={{ padding: 4 }}>
          <Typography variant="h5">Edit Layer {step}</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <LightTextField
                  fullWidth
                  name="name"
                  placeholder="Name"
                  value={values.name}
                  onChange={handleChange}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
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
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container columns={12} spacing={1} sx={{ mb: 3 }}>
                  <>
                    <FieldArray
                      name="images"
                      validateOnChange={false}
                      render={(arrayHelpers) => (
                        <>
                          {values.images &&
                            values.images.length > 0 &&
                            values.images.map((image, index) => (
                              <Grid item xs={3} key={index} sx={{ mb: 2 }}>
                                <BoxItem sx={{ mb: 1 }} style={{ position: 'relative' }}>
                                  <img
                                    src={
                                      typeof image?.imageUrl === 'string'
                                        ? image?.imageUrl
                                        : URL.createObjectURL(image?.imageUrl)
                                    }
                                    width={200}
                                    alt=""
                                  />
                                  <StyledDeleteIcon
                                    onClick={() => {
                                      arrayHelpers.remove(index);
                                      setImageObjectList([
                                        ...imageObjectList.slice(0, index),
                                        ...imageObjectList.slice(index + 1),
                                      ]);
                                    }}
                                  />
                                  {/* <DeleteOutlineIcon
                                    style={{ position: 'absolute', top: '10px', right: '10px' }}
                                    onClick={() => {
                                      arrayHelpers.remove(index);
                                      setImageObjectList([
                                        ...imageObjectList.slice(0, index),
                                        ...imageObjectList.slice(index + 1),
                                      ]);
                                    }}
                                  /> */}
                                </BoxItem>
                                <Stack gap={3}>
                                  <StyledImageTextField
                                    name={`images[${index}].name`}
                                    value={values.images[index].name}
                                    onChange={handleChange}
                                    label="Image Name"
                                    fullWidth
                                  />
                                  <Stack direction={'row'} justifyContent="space-between" gap={1} alignItems="center">
                                    <Stack flex={'3'}>
                                      <StyledImageTextField
                                        name={`images[${index}].quantity`}
                                        value={values.images[index].quantity}
                                        onChange={handleChange}
                                        label="Quantity"
                                      />
                                      {errors.images?.[index] &&
                                      (errors.images[index] as { quantity: string }).quantity ? (
                                        <Typography
                                          color="error"
                                          variant="subtitle2"
                                          sx={{ position: 'absolute', fontSize: '10px', mt: '37px' }}
                                        >
                                          {(errors.images[index] as { quantity: string }).quantity}
                                        </Typography>
                                      ) : null}
                                    </Stack>

                                    {/* <StyledImageTextField
                                    name={`images[${index}].probability`}
                                    value={values.images[index].probability}
                                    onChange={handleChange}
                                    label="Probability (%)"
                                  /> */}
                                    <Typography fontWeight={600} flex={'2'}>
                                      Rarity:{' '}
                                      {Number(Number((values.images[index].quantity * 100) / totalQuantity).toFixed(2))}
                                      %
                                    </Typography>
                                  </Stack>
                                  {collection?.type !== 'random' && (
                                    <Stack>
                                      {/* <Typography>Price</Typography> */}
                                      <StyledImageTextField
                                        name={`images[${index}].price`}
                                        value={values.images[index].price}
                                        onChange={handleChange}
                                        label="Price"
                                        fullWidth
                                        InputProps={{
                                          endAdornment: (
                                            <InputAdornment position="start">{collection?.currency}</InputAdornment>
                                          ),
                                        }}
                                      />
                                      {errors.images?.[index] && (errors.images[index] as { price: string }).price ? (
                                        <StyledErrorText
                                          color="error"
                                          variant="subtitle2"
                                          sx={{ position: 'absolute', fontSize: '10px', mt: '37px' }}
                                        >
                                          {(errors.images[index] as { price: string }).price}
                                        </StyledErrorText>
                                      ) : null}
                                    </Stack>
                                  )}
                                </Stack>
                              </Grid>
                            ))}
                        </>
                      )}
                    />
                  </>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <UploadImages
                  onSuccess={onSuccess}
                  // initFile={imageListTest}
                />
              </Grid>

              <Grid item xs={12}>
                {/* <Typography variant="h6">Total Image Copies: {totalQuantity}</Typography>
                <Typography variant="h6">Total Images: {imageObjectList.length || 0}</Typography> */}
                <Typography variant="h6">Total Images Quantity: {totalQuantity || 0}</Typography>
                {typeof errors.images === 'string' ? (
                  <Typography color="error" fontWeight={600}>
                    {errors.images}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                <Link to={`/collection/edit/${Number(id)}?step=${step - 1}`}>
                  <Button variant="contained">Back</Button>
                </Link>
                <Stack gap={2} direction="row">
                  <LoadingButton variant="contained" loading={loadingAdd || loadingUpdate} type="submit">
                    Submit
                  </LoadingButton>
                  {/* <Link to={`/collection/detail/${collectionId}`}> */}
                  <Button
                    variant="outlined"
                    onClick={() => {
                      console.log('alo');
                      finishDraft(collectionId);
                    }}
                  >
                    Finish Create
                  </Button>
                  {/* </Link> */}
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Box>
    </FormikProvider>
  );
};

export default EditLayer;
