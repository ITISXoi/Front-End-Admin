import { Fragment, ReactNode } from 'react';

// component props interface
interface GuestGuardProps {
  children: ReactNode;
}
const GuestGuard = ({ children }: GuestGuardProps) => {
  return <Fragment>{children}</Fragment>;
};

export default GuestGuard;
