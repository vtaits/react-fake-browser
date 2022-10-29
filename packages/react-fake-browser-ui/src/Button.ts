import styled from 'styled-components';

export const Button = styled.button(({
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

  ':hover': disabled ? undefined : {
    backgroundColor: '#ddd',
  },

  ':active': disabled ? undefined : {
    backgroundColor: '#d0d0d0',
  },
}));
