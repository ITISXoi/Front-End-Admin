/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Stack } from '@mui/material';
import { Box, CircularProgress, styled } from '@mui/material';
import { useGetAdmin } from 'api/admin/queries';
import CustomTable from 'components/CustomTable';
import FlexBox from 'components/FlexBox';
import SearchInput from 'components/SearchInput';
import { StyledFlexBox } from 'components/StyleFlexBox';
import useTitle from 'hooks/useTitle';
import { FC, useMemo, useCallback, useState } from 'react';
import { debounce } from 'utils/common/debounce';
import ColumnShape from './ColumnShape';

const AdminList: FC = () => {
  // change navbar title
  useTitle('Admin List');
  const [pageParams, setPageParams] = useState({
    page: 1,
    limit: 10,
    email: '',
  });
  const {
    data,
    refetch,
    isLoading: loadingData,
  } = useGetAdmin({
    type: 1,
    page: pageParams.page,
    limit: pageParams.limit,
    email: pageParams.email,
  });
  const onSearch = useCallback(
    debounce((searchText: string, key: 'email')=> {
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
      <SearchInput onChange={(e: any) => onSearch(e.target.value, 'email')} placeholder='search_email' />
        </Stack>
      </StyledFlexBox>
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

export default AdminList;
