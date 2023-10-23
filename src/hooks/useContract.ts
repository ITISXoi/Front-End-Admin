import { Contract } from '@ethersproject/contracts';
import { JsonRpcProvider } from '@ethersproject/providers';
import { useMemo } from 'react';
import { useNetwork, useSigner } from 'wagmi';

export function useContract<T extends Contract = Contract>(address: string, ABI: any): T | null {
  const { data: signer } = useSigner();
  // console.log(signer);
  return useMemo(() => {
    if (!address || !ABI || !signer) {
      return null;
    }

    try {
      return new Contract(address, ABI, signer);
    } catch (error) {
      console.error('Failed To Get Contract', error);
      return null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, ABI, signer]) as T;
}

export function useContractNoSigner<T extends Contract = Contract>(address: string, ABI: any, chainId: any): T {
  const { chains } = useNetwork();

  const rpcUrls = chains.find((x) => x.id === chainId)?.rpcUrls;

  return useMemo(() => {
    return new Contract(address, ABI, new JsonRpcProvider(rpcUrls?.public));
  }, [address, ABI, rpcUrls?.public]) as T;
}
