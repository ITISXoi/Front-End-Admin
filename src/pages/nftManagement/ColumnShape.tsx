/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Stack } from '@mui/material';
import { INFT } from 'api/nft';
import { H6 } from 'components/Typography';
import { Link } from 'react-router-dom';
import { routesEnum } from 'routes';
import { shortenAddress, shortenString } from 'utils/common';

interface IRecord {
  row: {
    original: INFT;
    index: number;
  };
  value: any;
  state: {
    pageIndex: number;
    pageSize: number;
  }
}

const ColumnShape = (currentPage: number) => [
  {
    Header: 'ID.',
    accessor: 'id',
    width: 30,
    Cell: ( data: any ) => { 
      const {
        row,
        state: { pageSize}, 
      }: IRecord = data;
      return <H6 color="text.primary">{row.index+ 1 + pageSize * (currentPage - 1)}</H6>;
    },
  },
  {
    Header: 'Image',
    accessor: 'imageUrl',
    Cell: ({ value }: IRecord) => {
      if (!value) return '---------';

      return (
        <Stack >
          <img alt='' src={value} style={{height: 50, width: 50}}/>
        </Stack>
      );
    },
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'CollectionId',
    accessor: 'collectionId',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  {
    Header: 'Address',
    accessor: 'contractAddress',
    Cell: ({ value }: IRecord) => {
      if (!value) return '------------';

      return (
        <Stack alignItems="center" direction="row">
          <div>{shortenAddress(value, 5)}</div>
        </Stack>
      );
    },
  },
  {
    Header: 'View',
    Cell: ({ row }: IRecord) => {
      return (
        <Link to={`/${routesEnum.nftDetail}/${row.original.id}`}>
          <Button sx={{ width: 5, height: 30 }} variant= "contained">
            View
          </Button>
        </Link>
      );
    },
  },
];

export default ColumnShape;
