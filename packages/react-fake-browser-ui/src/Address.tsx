import React, {
  useState,
  useCallback,
  useEffect,
  FC,
  SyntheticEvent,
} from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { definition as faRedo } from '@fortawesome/free-solid-svg-icons/faRedo';
import styled from 'styled-components';

const StyledForm = styled.form({

});

const StyledButton = styled.button({

});

const StyledInput = styled.input({

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
              icon={faRedo}
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
