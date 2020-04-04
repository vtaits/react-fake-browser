import React, {
  useState,
  useCallback,
  useEffect,
  FC,
  SyntheticEvent,
} from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { definition as faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import styled from 'styled-components';

const StyledForm = styled.form({
  flex: 1,
  marginLeft: 5,
  marginRight: 5,
  position: 'relative',
});

const StyledButton = styled.button({
  position: 'absolute',
  top: 0,
  right: 0,
  padding: 0,
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  width: 24,
  height: 24,
  borderRadius: 12,
  outline: 'none',
  color: '#333',

  ':hover': {
    backgroundColor: '#ddd',
  },

  ':active': {
    backgroundColor: '#d0d0d0',
  },
});

const StyledInput = styled.input({
  boxSizing: 'border-box',
  outline: 'none',
  width: '100%',
  height: 24,
  borderRadius: 12,
  border: 'none',
  paddingLeft: 12,
  paddingRight: 40,
});

type Props = {
  currentAddress: string;
  goTo: (nextAddress: string) => void;
};

const Address: FC<Props> = ({
  currentAddress,
  goTo,
}) => {
  const [address, setAddress] = useState<string>('');

  const onChange = useCallback((event: SyntheticEvent): void => {
    setAddress((event.target as HTMLInputElement).value);
  }, []);

  const onSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();

    goTo(address);
  };

  useEffect(() => {
    if (address !== currentAddress) {
      setAddress(currentAddress);
    }
  }, [currentAddress]);

  return (
    <StyledForm
      onSubmit={onSubmit}
    >
      <StyledInput
        type="text"
        value={address}
        onChange={onChange}
      />

      {
        address !== currentAddress && (
          <StyledButton
            type="submit"
          >
            <FontAwesomeIcon
              icon={faAngleRight}
            />
          </StyledButton>
        )
      }
    </StyledForm>
  );
};

Address.propTypes = {
  currentAddress: PropTypes.string.isRequired,
  goTo: PropTypes.func.isRequired,
};

export default Address;
