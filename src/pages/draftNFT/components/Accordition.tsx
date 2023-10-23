import { FC } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Avatar, AvatarGroup, Typography } from '@mui/material';

import { ILayer } from 'api/collection';
import Selection from './Selection';
import { Accordion, AccordionDetails, AccordionSummary } from './styled';

type Props = {
  item: ILayer;
  onClick: any;
  expanded: boolean;
  list: any[];
  handeClickItem: any;
};

const Accordition: FC<Props> = ({ item, expanded, onClick, list, handeClickItem }) => {
  return (
    <Accordion disableGutters expanded={expanded} onClick={onClick} sx={{ mb: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ lineHeight: '28px' }} variant="h6">
          {item.name}
        </Typography>
        <AvatarGroup
          max={10}
          sx={{
            alignItems: 'center',
            '& .MuiAvatar-root': {
              width: 28,
              height: 28,
              fontSize: '12px',
              border: '1px solid #000000',
              background: '#fff',
              color: '#000',
              alignItems: 'center',
            },
          }}
        >
          {item.images?.map((item_, index) => (
            <Avatar
              key={index}
              sx={{ width: 28, height: 28, border: '1px solid #000' }}
              alt="Remy Sharp"
              src={`${item_.imageUrl.slice(0, -4)}` + `_icon` + `${item_.imageUrl.slice(-4)}`}
            />
          ))}
        </AvatarGroup>
      </AccordionSummary>
      <AccordionDetails>
        <Selection list={list} handeClickItem={handeClickItem} />
      </AccordionDetails>
    </Accordion>
  );
};

export default Accordition;
