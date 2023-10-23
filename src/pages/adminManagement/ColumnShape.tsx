/* eslint-disable @typescript-eslint/no-unused-vars */
import { Rowing } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import { IUser } from 'api/auth';
import { H6 } from 'components/Typography';
import { Link } from 'react-router-dom';
import { routesEnum } from 'routes';
import { shortenAddress } from 'utils/common';

interface IRecord {
  row: {
    original: IUser;
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
      return <H6 color="text.primary">{row.index + 1 + pageSize * (currentPage - 1)}</H6>;
    },
  },
  {
    Header: 'Avatar',
    accessor: 'avatarUrl',
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
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Fullname',
    accessor: 'fullName',
  },
  {
    Header: 'Status',
    accessor: 'type',
    Cell: ({ row }: IRecord) => {
      if (row.original.type === 1) return 'Admin';

      return (
        'Artist'
      );
    },
  },
  // {
  //   Header: 'Address',
  //   accessor: 'walletAddress',
  //   Cell: ({ value }: IRecord) => {
  //     if (!value) return '------------';

  //     return (
  //       <Stack alignItems="center" direction="row">
  //         <div>{shortenAddress(value, 5)}</div>
  //       </Stack>
  //     );
  //   },
  // },
  {
    Header: 'View',
    // accessor: 'address',
    Cell: ({ row }: IRecord) => {
      return (
        <Link to={`/${routesEnum.adminDetail}/${row.original.id}`}>
          <Button sx={{width: 5, height: 30 }} variant="contained">
            View
          </Button>
        </Link>
      );
    },
  },
];

export default ColumnShape;
