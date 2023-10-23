/* eslint-disable react/no-unescaped-entities */
import { UploadFile } from '@mui/icons-material';
import { Paper, Stack, Typography } from '@mui/material';
import { SxProps } from '@mui/system';
import { FC, useCallback, useEffect, useState } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { DropZoneContainer } from './styled';

type Props = {
  children?: any;
  onSuccess?: (files?: File[]) => void;
  accept?: Accept;
  maxSize?: number;
  name?: string;
  initFile?: string[] | File[];
  sx?: SxProps;
};

const UploadImages: FC<Props> = ({
  children,
  onSuccess,
  accept = {
    'image/*': ['.jpeg', '.png', '.gif'],
  },
  maxSize,
  name,
  initFile,
  sx,
}) => {
  const [file, setFile] = useState(initFile);

  useEffect(() => {
    setFile(initFile);
  }, [initFile]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      // Do something with the files
      onSuccess && onSuccess(acceptedFiles);
      setFile(acceptedFiles);
    },
    [onSuccess]
  );

  const onDropRejected = useCallback((acceptedFiles: any[]) => {
    const firstFile = acceptedFiles?.[0];
    if (firstFile.errors && firstFile.errors[0] && firstFile.errors[0].code === 'file-too-large') {
      toast.error('File is too large. ');
      return null;
    }

    toast.error('Invalid file extension. ');
    return null;
  }, []);

  // const previewFile = useMemo(() => {
  //   if (!file) return undefined;
  //   return typeof file === 'string' ? file : URL.createObjectURL(file);
  // }, [file]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: accept,
    maxSize: maxSize,
    // disabled: !!previewFile,
  });

  return (
    <Paper
      sx={{
        mx: 'auto',
        position: 'relative',
        p: 0,
        borderWidth: 1,
        borderColor: 'gray.300',
        borderStyle: isDragActive ? 'dashed' : 'solid',
        ...sx,
      }}
    >
      <DropZoneContainer {...getRootProps()}>
        <input name={name} {...getInputProps()} />
        <>
          <Stack sx={{ zIndex: 2 }} spacing={2} alignItems="center" justifyContent="center">
            <UploadFile fontSize="large" />

            <Stack spacing={1}>
              <Typography align="center" fontWeight={700} fontSize="16px">
                Browse or drop file here
              </Typography>
              <Typography align="center" variant="caption">
                Support JPG, PNG, GIF
              </Typography>
              <Typography align="center" variant="caption">
                {children}
              </Typography>
            </Stack>
          </Stack>
        </>
        {/* {previewFile && <StyledImage src={previewFile} />} */}
      </DropZoneContainer>
    </Paper>
  );
};

export default UploadImages;
