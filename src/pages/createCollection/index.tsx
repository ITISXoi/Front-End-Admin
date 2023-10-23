import { useAppSelector } from 'hooks/useRedux';

import { FC, useState } from 'react';
import { getLayerQuantity } from 'store/ducks/collection/slice';

import CreateLayerStep from './createLayerStep';
import GeneralStep from './generalStep';

const CreateCollection: FC = () => {
  const layersQuantity = useAppSelector(getLayerQuantity);
  const [step, setStep] = useState(0);

  const onBack = () => {
    setStep(step - 1);
    console.log(step);
  };

  const onNext = () => {
    setStep(step + 1);
    console.log(step);
  };

  return (
    <>
      {step === 0 && <GeneralStep onNext={onNext} />}
      {step > 0 && <CreateLayerStep onBack={onBack} onNext={onNext} step={step} />}
    </>
  );
};

export default CreateCollection;
