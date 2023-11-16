/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Stack, Table, TableBody, TableCell, TableHead, TableRow, useTheme } from '@mui/material';
import Empty from 'components/Empty';
import { FC, useMemo } from 'react';
import { useExpanded, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import ScrollBar from 'simplebar-react';
import { StyledPagination } from './styled';

// component props interface
interface CustomTableProps {
  columnShape: object[];
  data?: any[];
  rowClick?: (rowData: object) => void;
  pageSize?: number;
  pageCount?: number;
  fetchNextPage: (pageIndex: number, pageSize: number) => void;
  currentPage?: number;
}

const CustomTable: FC<CustomTableProps> = (props) => {
  const {
    data,
    rowClick,
    columnShape,
    pageSize: controlledPageSize,
    pageCount,
    fetchNextPage,
    currentPage,
    children,
  } = props;
  // hooks
  const theme = useTheme();
  const tableData: any = useMemo(() => data, [data]);
  const columns: any = useMemo(() => columnShape, [columnShape]);
  console.log(tableData, 'tableData');

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageOptions,
    gotoPage,
    state: { pageSize },
  }: any = useTable(
    {
      columns,
      data: tableData,
      manualPagination: true,
      initialState: { pageIndex: 1, pageSize: controlledPageSize ?? 15 },
      pageCount: pageCount,
    } as any,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  // handle pagination
  const handleChange = (_e: any, currentPageNo: number) => {
    gotoPage(currentPageNo);
    fetchNextPage(currentPageNo, pageSize);
  };
  // table border color
  const borderColor = theme.palette.mode === 'light' ? 'text.secondary' : 'divider';

  return (
    <Box position="relative">
      <ScrollBar>
        <Table {...getTableProps()} sx={{ borderSpacing: '0 1rem', borderCollapse: 'separate' }}>
          <TableHead>
            {headerGroups.map((headerGroup: any) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <TableCell
                    {...column.getHeaderProps(column?.disabledSortBy ? undefined : column.getSortByToggleProps())}
                    sx={{
                      paddingY: 0,
                      fontSize: 13,
                      fontWeight: 600,
                      borderBottom: 0,
                      color: 'text.disabled',
                      width: column.width,
                      minWidth: column.minWidth,
                      maxWidth: column.maxWidth,
                      '&:last-child': { textAlign: 'center' },
                      textAlign: column.align,
                      ...column.sx,
                    }}
                  >
                    {column.render('Header')}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody {...getTableBodyProps()}>
            {page.map((row: any) => {
              prepareRow(row);
              return (
                <TableRow
                  {...row.getRowProps()}
                  onClick={rowClick && rowClick(row.original)}
                  sx={{
                    backgroundColor: 'background.paper',
                    cursor: rowClick ? 'pointer' : 'unset',
                    '& td:first-of-type': {
                      borderTopLeftRadius: '8px',
                      borderBottomLeftRadius: '8px',
                    },
                    '& td:last-of-type': {
                      textAlign: 'center',
                      borderTopRightRadius: '8px',
                      borderBottomRightRadius: '8px',
                    },
                    '&:last-of-type .MuiTableCell-root': {},
                  }}
                >
                  {row.cells.map((cell: any) => (
                    <TableCell
                      {...cell.getCellProps()}
                      sx={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: 'text.disabled',
                      }}
                    >
                      {cell.render('Cell')}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </ScrollBar>
      <Stack alignItems="flex-end" marginY={1}>
        <StyledPagination count={pageOptions.length} page={currentPage} shape="rounded" onChange={handleChange} />
      </Stack>
      {children}
      {data?.length === 0 && <Empty />}
    </Box>
  );
};

export default CustomTable;
