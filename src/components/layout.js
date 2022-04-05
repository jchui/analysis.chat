import * as React from 'react';

import Header from './header';
import '../styles/style.scss';

const Layout = ({ children }) => {
  return (
    <>
      <Header />

      <main>{children}</main>
    </>
  );
};

export default Layout;
