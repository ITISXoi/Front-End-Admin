/* eslint-disable @typescript-eslint/no-empty-function */
import { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';

import { LoadingButton } from '@mui/lab';
import { Stack, Typography } from '@mui/material';

import { useFormik } from 'formik';

import { draftNFT, IDraftINFT, updateDraftNftDetail } from 'api/collection';
import { usePathQuery } from 'hooks/useQueryParams';
import { convertToFormData } from 'utils/common';
import { StyledTextField } from './styled';

type Props = {
  collectionId: number;
  src: string;
  imagesIds: string;
  price: number;
  name: string;
  description: string;
};

const Form: FC<Props> = ({ collectionId = 0, src = '', imagesIds, price, name, description }) => {
  const [isLoading, setLoading] = useState(false);

  const query = usePathQuery();
  const draftId = Number(query.get('id'));

  const initialValues: IDraftINFT = {
    name: name || '',
    images: '',
    collectionKeyId: collectionId,
    collectionName: '',
    description: description || '',
    imageIds: imagesIds,
  };

  const { mutate: create, status: statusDraftNFT } = useMutation(draftNFT, {
    onSuccess: (data) => {
      toast.success('Draft success!');
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const { mutate: update, status: statusUpdateDraftNFT } = useMutation(updateDraftNftDetail, {
    onSuccess: (data) => {
      toast.success('Update success!');
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  function DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',');
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  }

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values: any) => {
      if (src === null || src === undefined || src === '') {
        toast.error('Please choose your image');
        return;
      }
      console.log(values, price, imagesIds, collectionId);

      if (draftId)
        update({
          id: String(draftId),
          formData: convertToFormData({
            ...values,
            price: price,
            collectionKeyId: collectionId,
            images: DataURIToBlob(src),
            imageIds: `[${imagesIds}]`,
          }),
        });
      else
        create(
          convertToFormData({
            ...values,
            price: price,
            collectionKeyId: collectionId,
            images: DataURIToBlob(src),
            imageIds: `[${imagesIds}]`,
          })
        );
    },
  });

  useEffect(() => {
    setFieldValue('name', name);
    setFieldValue('description', description);
  }, [name, description, setFieldValue]);

  return (
    <>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Stack sx={{ textAlign: 'center' }} gap={3}>
          <StyledTextField
            fullWidth
            name="name"
            placeholder={'Name'}
            value={values.name}
            onChange={handleChange}
            disabled={isLoading}
          ></StyledTextField>
          <StyledTextField
            fullWidth
            name="description"
            placeholder={'Description'}
            value={values.description}
            onChange={handleChange}
            disabled={isLoading}
          ></StyledTextField>

          <Typography align="left" fontWeight={600}>
            Price: {price} MATIC
          </Typography>
          {!draftId ? (
            <LoadingButton
              sx={{ padding: '14px 0', background: '#2081E2', color: '#ffffff' }}
              type="submit"
              size="large"
              // onClick={handleClick}
              loading={isLoading || statusDraftNFT === 'loading'}
            >
              Create Draft NFT
            </LoadingButton>
          ) : (
            <LoadingButton
              sx={{ padding: '14px 0', background: '#2081E2', color: '#ffffff' }}
              type="submit"
              size="large"
              // onClick={handleClick}
              loading={isLoading || statusUpdateDraftNFT === 'loading'}
            >
              Update Draft NFT
            </LoadingButton>
          )}
        </Stack>
      </form>
    </>
  );
};

export default Form;
