/* eslint-disable @typescript-eslint/no-unused-vars */
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Container, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useUser } from 'api/auth';
import { putCollectionPublic, useCollection, useListLayer } from 'api/collection';
import FlexBox from 'components/FlexBox';
import FullPageLoader from 'components/FullScreenLoading';
import LoadingScreen from 'components/LoadingScreen';
import { H5 } from 'components/Typography';
import { useCollectionContract } from 'hooks/useCollectionContract';
import useTitle from 'hooks/useTitle';
import { useToggle } from 'hooks/useToggle';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setCollectionId, setLayerQuantity, setTotalNFT } from 'store/ducks/collection/slice';
import { SMART_CONTRACT_ADDRESS } from 'utils/constants';
import { useAccount, useNetwork } from 'wagmi';
import DraftList from './draftList';
import ImageCard from './ImageCard';
import { Accordion, AccordionDetails, AccordionSummary } from './styled';

const CollectionDetail = () => {
  useTitle('Detail Collection');
  const { id } = useParams();
  const { data, refetch } = useCollection(Number(id));
  const { isAdmin } = useUser();
  const { data: listLayer, refetch: refetchLayer } = useListLayer(Number(id), { enabled: !!id });
  const [publicId, setPublicId] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contract = useCollectionContract(SMART_CONTRACT_ADDRESS);
  const { address } = useAccount();
  const { chain } = useNetwork();
  const [toogle, toggleOpen] = useToggle();
  const [tab, setTab] = useState('layer');
  const startDate = new Date(Number(data?.startMintTime));
  const endDate = new Date(Number(data?.endMintTime));
  const timeStamp = new Date().getTime();
  const nowDate = new Date(timeStamp);
  const { mutate, isLoading } = useMutation(putCollectionPublic, {
    onSuccess: (data) => {
      toast.success('Public success');
      refetch();
    },
    onError: () => {
      console.log('error');
    },
  });
  const publicHandle = () => {
    console.log('data', data);

    if (!data) return;
    (async () => {
      if (!address || !chain?.id || !contract) return toast.error('Please Connect your wallet');
      toggleOpen();
      const startTime = Number(Number(data?.startMintTime) / 1000) || 0;
      const endTime = Number(Number(data?.endMintTime) / 1000) || 0;
      try {
        const tx = await contract.createCollection(
          Number(id),
          data?.name,
          'TEST',
          '',
          data?.paymentToken,
          10000,
          startTime,
          endTime
          // parseUnits(String(data?.price), token?.decimal).toString()
        );
        await tx?.wait(2);
        mutate(Number(id));
        toggleOpen();
      } catch (error) {
        console.log(error);
        toggleOpen();
      }
    })();
  };
  const editNavigate = (step: number) => {
    dispatch(setLayerQuantity(Number(data?.numberLayers)));
    dispatch(setTotalNFT(Number(data?.totalNfts)));
    dispatch(setCollectionId(Number(data?.id)));
    if (step === 0) navigate(`/collection/edit/${id}`);
    else navigate(`/collection/edit/${id}?step=${step}`);
  };

  const handleChangeTab = (_: React.SyntheticEvent, newValue: string) => {
    // router.replace({ pathname: router.pathname, query: { ...router.query, tab: newValue } }, undefined, {
    //   shallow: true,
    // });
    setTab(newValue);
  };

  if (!data) {
    return <LoadingScreen />;
  }

  return (
    <>
      {toogle ? <FullPageLoader /> : null}
      <Card sx={{ padding: 4, mb: 5 }}>
        <Grid container>
          <Grid item xs={6} sm={4} lg={4}>
            <Container>
              <Stack spacing={2}>
                <img alt="" src={data?.imageUrl} style={{ width: 200, height: 200, marginLeft: 30 }} />
              </Stack>
            </Container>
          </Grid>
          <Grid item xs={12} sm={8} lg={8}>
            <Container>
              <Stack spacing={2}>
                <Stack direction={'row'} spacing={2} flexWrap={'wrap'}>
                  <H5>Name:</H5>
                  <Typography variant="subtitle2">{data?.name} </Typography>
                </Stack>
                <Stack direction={'row'} spacing={2} flexWrap={'wrap'}>
                  <H5>Chain Id: </H5>
                  <Typography variant="subtitle2">{data?.chainId} </Typography>
                </Stack>
                <Stack direction={'row'} spacing={2} flexWrap={'wrap'}>
                  <H5>Description: </H5>
                  <Typography variant="subtitle2">{data?.description} </Typography>
                </Stack>
                <Stack direction={'row'} spacing={2} flexWrap={'wrap'}>
                  <H5>Total NFTs: </H5>
                  <Typography variant="subtitle2">{data?.totalNfts} </Typography>
                </Stack>
                <Stack direction={'row'} spacing={2} flexWrap={'wrap'}>
                  <H5>NFT Minted: </H5>
                  <Typography variant="subtitle2">{data?.nftMinted} </Typography>
                </Stack>
                <Stack direction={'row'} spacing={2} flexWrap={'wrap'}>
                  <H5>Type: </H5>
                  <Typography variant="subtitle2">{data?.type} </Typography>
                </Stack>
                <Stack direction={'row'} spacing={2} flexWrap={'wrap'}>
                  <H5>Mint Method: </H5>
                  <Typography variant="subtitle2">{data?.isAutoMint ? 'Auto' : 'Manual'} </Typography>
                </Stack>
                <Stack direction={'row'} spacing={2} flexWrap={'wrap'}>
                  <H5>Status: </H5>
                  <Typography variant="subtitle2">{data?.isPublic ? 'Published' : 'None Public'} </Typography>
                </Stack>
                <Stack direction={'row'} spacing={2} flexWrap={'wrap'}>
                  <H5>Start Mint Time: </H5>
                  <Typography variant="subtitle2">
                    {data?.startMintTime ? startDate.toLocaleString('en-GB') : 0}
                  </Typography>
                </Stack>
                <Stack direction={'row'} spacing={2} flexWrap={'wrap'}>
                  <H5>End Mint Time: </H5>
                  <Typography variant="subtitle2">{data?.endMintTime ? endDate.toLocaleString('en-GB') : 0}</Typography>
                </Stack>
              </Stack>
            </Container>
            {!isAdmin && (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mb: 3 }}>
                  {!data?.isCreateDraft && (
                    <Button size="large" variant="contained" onClick={() => editNavigate(0)}>
                      <Typography sx={{ color: 'white' }} variant="h6">
                        Edit Collection
                      </Typography>
                    </Button>
                  )}
                  {!data?.isPublic && (
                    <LoadingButton
                      size="large"
                      variant="contained"
                      onClick={publicHandle}
                      disabled={nowDate.toLocaleString('en-GB') > startDate.toLocaleString('en-GB')}
                    >
                      <Typography sx={{ color: 'white' }} variant="h6">
                        Public Collection
                      </Typography>
                    </LoadingButton>
                  )}
                </Box>
                {nowDate > startDate && !data?.isPublic ? (
                  <Stack>
                    <Typography sx={{ color: 'red' }} variant="h6">
                      Please make sure your time is public before the start mint time
                    </Typography>
                  </Stack>
                ) : null}
              </>
            )}
          </Grid>
        </Grid>
      </Card>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tab || 'layer'}
          onChange={handleChangeTab}
          TabIndicatorProps={{
            children: <span className="MuiTabs-indicatorSpan" />,
          }}
        >
          <Tab label="Layer" value="layer" />
          <Tab label="Draft NFT" value="draft" />
        </Tabs>
      </Box>
      {tab === 'draft' && <DraftList collectionId={Number(id)} isAutoMint={data?.isAutoMint} />}
      {tab === 'layer' && (
        <FlexBox sx={{ mt: 2 }}>
          <Grid item xs={3} sx={{ mr: 5 }}>
            {listLayer &&
              listLayer.items.map((layer, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Accordion sx={{ width: 1120 }} disableGutters>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Stack
                        direction={'row'}
                        justifyContent="space-between"
                        sx={{ width: '100%', alignItems: 'center' }}
                      >
                        <Typography variant="h5" sx={{ ml: 3 }}>
                          {layer?.name}
                        </Typography>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: 4 }}>
                      {layer?.images ? (
                        <Box sx={{ width: '100%' }}>
                          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            {layer?.images.map((item, index) => (
                              <Grid item xs={3} key={index}>
                                <ImageCard image={item} tokenName={data?.currency} />
                              </Grid>
                            ))}
                          </Grid>
                        </Box>
                      ) : null}
                      {!isAdmin && (
                        <FlexBox justifyContent={'flex-end'} sx={{ mt: 2 }}>
                          <Button size="large" variant="contained" onClick={() => editNavigate(index + 1)}>
                            <Typography sx={{ color: 'white' }} variant="h6">
                              Edit Layer
                            </Typography>
                          </Button>
                        </FlexBox>
                      )}
                    </AccordionDetails>
                  </Accordion>
                </Box>
              ))}
          </Grid>
        </FlexBox>
      )}
    </>
  );
};

export default CollectionDetail;
