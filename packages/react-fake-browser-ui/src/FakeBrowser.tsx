import type {
  FC,
  ReactNode,
} from 'react';

import NavBar from './NavBar';

type Props = {
  canMoveForward: boolean;
  canMoveBack: boolean;
  currentAddress: string;
  refresh: () => void;
  goBack: () => void;
  goForward: () => void;
  goTo: (nextAddress: string) => void;
  children: ReactNode;
};

const FakeBrowser: FC<Props> = ({
  canMoveForward,
  canMoveBack,
  currentAddress,
  refresh,
  goBack,
  goForward,
  goTo,
  children,
}) => (
  <>
    <NavBar
      canMoveForward={canMoveForward}
      canMoveBack={canMoveBack}
      currentAddress={currentAddress}
      refresh={refresh}
      goBack={goBack}
      goForward={goForward}
      goTo={goTo}
    />

    {children}
  </>
);

export default FakeBrowser;
