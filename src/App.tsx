import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';

import GlobalStyle from './styles/Global';
import AppProvider from './hooks';

const App: React.FC = () => (
  <BrowserRouter>
    <GlobalStyle />
    <AppProvider>
      <Routes />
    </AppProvider>
  </BrowserRouter>
);

export default App;
