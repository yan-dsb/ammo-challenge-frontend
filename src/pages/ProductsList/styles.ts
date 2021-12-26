import styled from 'styled-components';

type PaginationIconProps = {
  disabled?: boolean;
};

export const Container = styled.div``;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 20px;

  img {
    width: 80px;
    height: 30px;
  }

  div {
    height: 25px;
    width: 30%;
  }

  @media (max-width: 768px) {
    display: block;

    div {
      width: 100%;
    }
  }
`;

export const QueryContainer = styled.div`
  background: #eeedf1;
  height: 100px;
  display: flex;
  align-items: center;
  border-top: 2px solid #e0dfe3;
  border-bottom: 2px solid #e0dfe3;

  h1 {
    margin-left: 20px;
    font-size: 24px;
    color: #433e66;
  }
`;

export const ProductsListContainer = styled.div`
  margin: 50px 200px;

  @media (max-width: 768px) {
    margin: 30px 30px;
  }
`;

export const ProductsFound = styled.div`
  &::after {
    content: '';
    display: block;
    width: 230px;
    height: 5px;
    margin-top: 5px;
    z-index: 1;
    background: #dfbe7f;
  }
`;

export const Products = styled.div`
  margin-top: 20px;
`;

export const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  border-top: 1px solid #e0dfe3;
  border-right: 1px solid #e0dfe3;
  border-left: 1px solid #e0dfe3;
  height: 120px;
  &:last-of-type {
    border-bottom: 1px solid #e0dfe3;
  }

  @media (max-width: 768px) {
    height: 100%;
  }
`;

export const ProductImages = styled.div`
  display: flex;
  flex-direction: row;
  height: 100px;
  width: 35%;
  img {
    width: 100px;
    margin-left: 5px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    img {
      width: 50px;
      margin: 5px;
    }
  }
`;

export const ProductDetails = styled.div`
  margin-left: 30px;
  width: 30%;

  @media (max-width: 768px) {
    margin-left: 5px;
  }
`;

export const ProductName = styled.p``;

export const ProductDescription = styled.p`
  margin-top: 5px;
  color: #9d9d9d;
  font-size: 12px;
`;

export const ProductDiscount = styled.div`
  margin-right: 20px;

  p {
    span {
      color: #9d9d9d;
    }
  }
  @media (max-width: 768px) {
    margin: 5px;
  }
`;

export const PaginationContainer = styled.div`
  position: relative;
  p {
    color: #777777;
  }
`;

export const Pagination = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;

  select {
    padding: 10px;
    border: 1px solid #777777;
    color: #777777;
    border-radius: 5px;
  }
`;

export const PaginationNumber = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  button {
    &:disabled {
      border: 1px solid #777777;
    }
    border: 0;
    background: #fff;
    color: #777777;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    margin-left: 2px;
    border-radius: 5px;
  }
  @media (max-width: 768px) {
    position: initial;
    width: 300px;
    overflow-x: scroll;
    overflow-y: hidden;
    margin-left: 20px;
  }
`;

export const Divider = styled.div`
  border-top: 1px solid #e0dfe3;
  margin: 20px 0;
`;

export const PaginationIcon = styled.div<PaginationIconProps>`
  cursor: ${props => (props.disabled ? 'unset' : 'pointer')};
  pointer-events: ${props => (props.disabled ? 'none' : 'all')};
  svg {
    margin: 7px;
    color: ${props => (props.disabled ? '#e0dfe3' : '#777777')};
  }
`;
