import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useCollection, useDraftNFTDetail, useListImageByLayerId, useListLayer } from 'api/collection';
import axios from 'axios';
import * as Bs64 from 'base64-arraybuffer';
import { usePathQuery } from 'hooks/useQueryParams';
import { toPng } from 'html-to-image';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Accordition from './components/Accordition';
import Card from './components/Card';
import Form from './components/Form';

interface IDesign {
  indexLayer: number;
  url: string;
  base64: any;
  id: number;
}

const CreateImage = () => {
  const ref = useRef<any>();
  const { id: asId } = useParams();
  const { data } = useCollection(Number(asId));
  const [src, setSrc] = useState('');
  const { data: listLayer } = useListLayer(Number(data?.id));
  const [price, setPrice] = useState<any>({});

  const [layerId, setLayerId] = useState(-1);
  const { data: listImageLayer } = useListImageByLayerId(Number(layerId));

  const query = usePathQuery();
  const draftId = Number(query.get('id'));

  const { data: draftInfo } = useDraftNFTDetail(draftId);
  const [initData, setInitData] = useState<IDesign[]>([]);

  useEffect(() => {
    const images: IDesign[] = [];
    const updateInitData = async () => {
      if (draftInfo && draftInfo.images) {
        // eslint-disable-next-line array-callback-return
        for (let i = 0; i < draftInfo.images.length; i++) {
          const { data } = (await axios.get(draftInfo.images[i].imageUrl + '?cacheblock=true', {
            responseType: 'arraybuffer',
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
          })) as any;
          const temp = `data:image/jpg;base64,${Bs64.encode(data)}`;
          images.push({
            indexLayer: Number(draftInfo.images[i]?.layerId),
            url: draftInfo.images[i]?.imageUrl,
            base64: temp,
            id: draftInfo.images[i]?.id,
          });
          // handleSelectImage(item);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    };
    updateInitData().then(() => {
      setInitData(images);
    });
  }, [draftInfo]);

  const [imagesIds, setImageIds] = useState<string>();
  const handleChooseLayer = (data: number) => {
    setLayerId(data);
  };
  const handleSelectImage = async (item: any) => {
    const { layerId, imageUrl, id, price: layerPrice } = item;
    const currentPrice: any = price;
    currentPrice[layerId] = layerPrice;
    if (initData.find((item) => item.indexLayer === layerId)) {
      const i = initData.findIndex((item) => item.indexLayer === layerId);
      if (initData[i].url === imageUrl) {
        setInitData([...initData.slice(0, i), ...initData.slice(i + 1)]);
        currentPrice[layerId] = 0;
        return;
      }
    }
    setPrice(currentPrice);
    // const { data } = await getImageFromServer({ url: imageUrl });
    const { data } = (await axios.get(imageUrl + '?cacheblock=true', {
      responseType: 'arraybuffer',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })) as any;

    const temp = `data:image/jpg;base64,${Bs64.encode(data)}`;

    if (initData.find((item) => item.indexLayer === layerId)) {
      const i = initData.findIndex((item) => item.indexLayer === layerId);
      await setInitData([
        ...initData.slice(0, i),
        { ...initData[i], url: imageUrl, base64: temp, id: id },
        ...initData.slice(i + 1),
      ]);
      // initData[i].url = url;
    } else await setInitData([...initData, { indexLayer: layerId, url: imageUrl, base64: temp, id: id }]);
  };

  const handleGenerateDraft = () => {};

  useEffect(() => {
    const imgIds = initData?.map((item) => {
      return item?.id;
    });
    setImageIds(imgIds.toString());
    const gen64 = async () => {
      const uri = await toPng(ref.current);
      await setSrc(uri);
    };
    gen64().catch(() => {
      console.log('error');
    });
  }, [initData]);

  const priceNft: number = Object.values(price).reduce((prev, current) => Number(prev) + Number(current), 0) as number;

  if (!data) {
    return null;
  }

  return (
    <>
      {/* <Header data={data} /> */}
      <Container sx={{ mt: { xl: 8, md: 5 } }}>
        <Typography variant="h3" align="center" sx={{}}>
          Customized your draft NFT
        </Typography>
        <Grid container spacing={3} columns={9} sx={{ mt: { xl: 3, md: 2 } }}>
          <Grid item lg={4} md={9} xs={9}>
            {listLayer?.items.map((item) => (
              <Accordition
                key={item.id}
                item={item}
                expanded={item.id === layerId}
                onClick={() => handleChooseLayer(item.id)}
                list={listImageLayer?.data || []}
                handeClickItem={handleSelectImage}
              />
            ))}
          </Grid>
          <Grid item lg={3} md={5} xs={9}>
            <Box sx={{ border: '2px solid #000000', borderRadius: '4px' }}>
              <div ref={ref}>
                <Card data={initData} />
              </div>
            </Box>
          </Grid>
          <Grid item lg={2} md={4} xs={9}>
            <Form
              collectionId={data?.id || 0}
              src={src}
              imagesIds={String(imagesIds)}
              price={priceNft}
              name={draftInfo?.name || ''}
              description={draftInfo?.description || ''}
            />
            <Button
              sx={{ marginTop: 3, padding: '14px 0', background: '#2081E2', color: '#ffffff' }}
              fullWidth
              onClick={handleGenerateDraft}
            >
              Generate Drafts
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CreateImage;
