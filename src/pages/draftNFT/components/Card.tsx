import { FC } from 'react';

import { BoxCard } from './styled';

type Props = {
  data: any[];
};

const Card: FC<Props> = ({ data }) => {
  return (
    <BoxCard>
      {data?.map((item, index) => (
        <img
          src={item?.base64 === '' ? `${item.imageUrl}` : `${item.base64}`}
          style={{
            position: 'absolute',
            zIndex: item.indexLayer,
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
          }}
          key={index}
        ></img>
      ))}
    </BoxCard>
  );
};

export default Card;
