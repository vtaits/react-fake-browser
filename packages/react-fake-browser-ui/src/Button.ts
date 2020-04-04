import styled from 'styled-components';

const StyledButton = styled.button(({
  disabled,
}) => ({
  marginLeft: 5,
  marginRight: 5,
  padding: 0,
  border: 'none',
  backgroundColor: 'transparent',
  cursor: disabled ? 'default' : 'pointer',
  width: 24,
  height: 24,
  borderRadius: 12,
  outline: 'none',
  color: disabled ? '#999' : '#333',

  ':hover': disabled ? null : {
    backgroundColor: '#ddd',
  },

  ':active': disabled ? null : {
    backgroundColor: '#d0d0d0',
  },
}));

export default StyledButton;
