import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  border-radius: 10px;

  padding: 16px;
  width: 100%;

  border: 2px solid #9d9d9d;
  color: #9d9d9d;

  display: flex;
  align-items: center;

  ${props =>
    props.isFocused &&
    css`
      border-color: #433e66;
      color: #433e66;
    `}
  ${props =>
    props.isFilled &&
    css`
      color: #433e66;
    `}


      & + div {
    margin-top: 8px;
  }
  input {
    color: #433e66;

    flex: 1;
    background: transparent;
    border: 0;
    &::placeholder {
      color: #9d9d9d;
    }
  }

  svg {
    margin-right: 16px;
  }
`;
