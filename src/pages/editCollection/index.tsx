import { usePathQuery } from 'hooks/useQueryParams';

import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EditGeneralCollection from './editGeneral';
import EditLayer from './editLayer';

const EditCollection: FC = () => {
  const { id } = useParams();
  const query = usePathQuery();
  const step = Number(query.get('step'));
  const navigate = useNavigate();

  const onBack = () => {
    navigate(`/collection/edit/${Number(id)}?step=${step - 1}`);
    console.log(step);
  };

  const onNext = () => {
    navigate(`/collection/edit/${Number(id)}?step=${step + 1}`);
    console.log(step);
  };

  return (
    <>
      {step === 0 && <EditGeneralCollection onNext={onNext} />}
      {step > 0 && <EditLayer onBack={onBack} onNext={onNext} />}
    </>
  );
};

export default EditCollection;
