import React, {
  FC,
  ReactNode,
} from 'react';
import PropTypes from 'prop-types';

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

FakeBrowser.propTypes = {
  canMoveForward: PropTypes.bool.isRequired,
  canMoveBack: PropTypes.bool.isRequired,
  currentAddress: PropTypes.string.isRequired,
  refresh: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  goForward: PropTypes.func.isRequired,
  goTo: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default FakeBrowser;
