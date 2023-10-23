import { useListCurrencyToken } from 'api/common';
import { useMemo } from 'react';

const useActiveToken = (chainId?: number, address?: string) => {
  const { data: currencies, isLoading } = useListCurrencyToken({ chainId: chainId });

  const activeToken = useMemo(() => {
    return currencies?.find((x) => x.contractAddress === address);
  }, [address, currencies]);

  return { activeToken, isLoading };
};

export default useActiveToken;
