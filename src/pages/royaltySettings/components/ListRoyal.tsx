/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, CircularProgress } from '@mui/material';
import { useGetRoyalList } from 'api/admin/queries';
import { useUser } from 'api/auth';
import CustomTable from 'components/CustomTable';
import FlexBox from 'components/FlexBox';
import useTitle from 'hooks/useTitle';
import { FC, useCallback, useMemo, useState } from 'react';
import { debounce } from 'utils/common/debounce';
import ColumnShape from './ColumnShape';

const RoyalList: FC = () => {
  // change navbar title
  useTitle('Collection List');
  const [pageParams, setPageParams] = useState({
    page: 1,
    limit: 10,
    name: '',
  });
  const {
    data,
    refetch,
    isLoading: loadingData,
  } = useGetRoyalList({
    page: pageParams.page,
    limit: pageParams.limit,
  });
  const onSearch = useCallback(
    debounce((searchText: string, key: 'name') => {
      try {
        setPageParams((pre) => ({
          ...pre,
          page: 1,
          [key]: searchText ?? '',
        }));
        console.log('>>>', pageParams);
      } catch (err) {
        console.log(err);
      }
    }, 500),
    [pageParams]
  );
  const { isAdmin } = useUser();
  const columns = useMemo(() => {
    return ColumnShape(pageParams.page);
  }, [pageParams.page]);

  return (
    <Box pt={2} pb={4}>
      {/* <StyledFlexBox>
        <Stack direction="row" spacing={2}>
          <SearchInput onChange={(e: any) => onSearch(e.target.value, 'name')} placeholder="search_name" />
        </Stack>
        {!isAdmin && (
          <Link to={`/collection/create`}>
            <Button sx={{ height: 30 }} variant="contained">
              Create New
            </Button>
          </Link>
        )}
      </StyledFlexBox> */}
      {loadingData && (
        <FlexBox justifyContent="center" width="100%">
          <CircularProgress />
        </FlexBox>
      )}
      <CustomTable
        columnShape={columns}
        pageSize={data?.meta.itemsPerPage ?? 0}
        pageCount={data?.meta.totalPages ?? 0}
        data={data?.items ?? []}
        currentPage={pageParams.page}
        fetchNextPage={(nextPage) => {
          setPageParams((prevState) => ({ ...prevState, page: nextPage }));
        }}
      />
    </Box>
  );
};

export default RoyalList;
