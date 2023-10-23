/* eslint-disable @typescript-eslint/no-unused-vars */
import { Typography } from '@mui/material';
import { IRoyalUser } from 'api/admin/types';
import { H6 } from 'components/Typography';
import dayjs from 'dayjs';

interface IRecord {
  row: {
    original: IRoyalUser;
    index: number;
  };
  value: any;
  state: {
    pageIndex: number;
    pageSize: number;
  };
}

const ColumnShape = (currentPage: number) => [
  {
    Header: 'ID.',
    accessor: 'id',
    width: 30,
    Cell: (data: any) => {
      const {
        row,
        state: { pageSize },
      }: IRecord = data;
      return <H6 color="text.primary">{row.original.artistId}</H6>;
    },
  },
  {
    Header: 'Name Artist',
    accessor: 'nameArtist',
    Cell: ({ value }: IRecord) => {
      if (!value) return '------------';

      return <Typography>{value}</Typography>;
    },
  },
  // {
  //   Header: 'Address',
  //   accessor: 'address',
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
    Header: 'Status',
    accessor: 'status',
    Cell: ({ row }: IRecord) => {
      if (row.original.status) return <Typography>{row.original.status}</Typography>;

      return '---------';
    },
  },
  {
    Header: 'End Time',
    accessor: 'endTime',
    Cell: ({ row }: IRecord) => {
      if (row.original.endTime)
        return <Typography>{dayjs.unix(Number(row.original.endTime) / 1000).format('DD/MM/YYYY HH:mm')}</Typography>;

      return '---------';
    },
  },
  // {
  //   Header: 'View',
  //   // accessor: 'address',
  //   Cell: ({ row }: IRecord) => {
  //     return (
  //       <Link to={`/${routesEnum.collectionDetail}/${row.original.id}`}>
  //         <Button sx={{width: 5, height: 30 }} variant= "contained">
  //           View
  //         </Button>
  //       </Link>
  //     );
  //   },
  // },
];

export default ColumnShape;
