import type {
  FC,
} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { definition as faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { definition as faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { definition as faRedo } from '@fortawesome/free-solid-svg-icons/faRedo';

import Button from './Button';
import Address from './Address';

const StyledNavBar = styled.div({
  display: 'flex',
  padding: 5,
  backgroundColor: '#f6f6f6',
});

type Props = {
  canMoveForward: boolean;
  canMoveBack: boolean;
  currentAddress: string;
  refresh: () => void;
  goBack: () => void;
  goForward: () => void;
  goTo: (nextAddress: string) => void;
};

const NavBar: FC<Props> = ({
  canMoveForward,
  canMoveBack,
  currentAddress,
  refresh,
  goBack,
  goForward,
  goTo,
}) => (
  <StyledNavBar>
    <Button
      type="button"
      onClick={goBack}
      disabled={!canMoveBack}
    >
      <FontAwesomeIcon
        icon={faArrowLeft}
      />
    </Button>

    <Button
      type="button"
      onClick={goForward}
      disabled={!canMoveForward}
    >
      <FontAwesomeIcon
        icon={faArrowRight}
      />
    </Button>

    <Button
      type="button"
      onClick={refresh}
    >
      <FontAwesomeIcon
        icon={faRedo}
      />
    </Button>

    <Address
      currentAddress={currentAddress}
      goTo={goTo}
      refresh={refresh}
    />
  </StyledNavBar>
);

export default NavBar;
