/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, CircularProgress, Stack, styled } from '@mui/material';
import { useListNFT } from 'api/nft/queries';
import CustomTable from 'components/CustomTable';
import FlexBox from 'components/FlexBox';
import SearchInput from 'components/SearchInput';
import { StyledFlexBox } from 'components/StyleFlexBox';
import useTitle from 'hooks/useTitle';
import { FC, useMemo, useCallback, useState } from 'react';
import { debounce } from 'utils/common/debounce';
import ColumnShape from '../nftManagement/ColumnShape';

const NFTList: FC = () => {
  // change navbar title
  useTitle('NFT List');
  const [pageParams, setPageParams] = useState({
    page: 1,
    limit: 10,
    name: '',
    collectionId: '',
  });
  const { data, isLoading: loadingData } = useListNFT({
    page: pageParams.page,
    limit: pageParams.limit,
    name: pageParams.name,
    collectionId: pageParams.collectionId,
  });
  const onSearch = useCallback(
    debounce((searchText: string, key: 'name' | 'collectionId') => {
      try {
        setPageParams((pre) => ({
          ...pre,
          page: 1,
          [key]: searchText ?? '',
        }));
      } catch (err) {
        console.log(err);
      }
    }, 500),
    [pageParams]
  );
  const columns = useMemo(() => {
    return ColumnShape(pageParams.page);
  }, [pageParams.page]);
  return (
    <Box pt={2} pb={4}>
      <StyledFlexBox>
        <Stack direction="row" spacing={2}>
          <SearchInput onChange={(e: any) => onSearch(e.target.value, 'name')} placeholder='search_name' />
          <SearchInput onChange={(e: any) => onSearch(e.target.value, 'collectionId')} placeholder='search_collectionId' />
        </Stack>
      </StyledFlexBox> 
      {loadingData && (
        <FlexBox justifyContent="center" width="100%">
          <CircularProgress />
        </FlexBox>
      )}
      {data?.items && (
        <CustomTable
          columnShape={columns}
          pageSize={data?.meta.itemsPerPage ?? 0}
          pageCount={data?.meta.totalPages ?? 0}
          data={data?.items ?? []}
          currentPage={pageParams.page}
          fetchNextPage={(nextPage) => setPageParams((prevState) => ({ ...prevState, page: nextPage }))}
        />
      )}
    </Box>
  );
};

export default NFTList;
