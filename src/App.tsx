import React from 'react';

import GlobalStyle from './styles/Global';
import SignUp from './pages/SignUp';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <SignUp />
    </>
  );
};

export default App;
