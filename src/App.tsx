import React from 'react';
import { ProductsList } from './pages/ProductsList';
import GlobalStyle from './styles/global';

export const App = function App() {
  return (
    <>
      <ProductsList />
      <GlobalStyle />
    </>
  );
};
