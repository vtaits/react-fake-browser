import React, {
  FC,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { definition as faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import { definition as faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';

import Button from './Button';
import Address from './Address';

const StyledNavBar = styled.div({
});

type Props = {
  canMoveForward: boolean;
  canMoveBack: boolean;
  currentAddress: string;
  goBack: () => void;
  goForward: () => void;
  goTo: (nextAddress: string) => void;
};

const NavBar: FC<Props> = ({
  canMoveForward,
  canMoveBack,
  currentAddress,
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
        icon={faAngleLeft}
      />
    </Button>

    <Button
      type="button"
      onClick={goForward}
      disabled={!canMoveForward}
    >
      <FontAwesomeIcon
        icon={faAngleRight}
      />
    </Button>

    <Address
      currentAddress={currentAddress}
      goTo={goTo}
    />
  </StyledNavBar>
);

NavBar.propTypes = {
  canMoveForward: PropTypes.bool.isRequired,
  canMoveBack: PropTypes.bool.isRequired,
  currentAddress: PropTypes.string.isRequired,
  goBack: PropTypes.func.isRequired,
  goForward: PropTypes.func.isRequired,
  goTo: PropTypes.func.isRequired,
};

export default NavBar;
