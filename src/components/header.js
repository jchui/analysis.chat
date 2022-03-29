import * as React from 'react';
import { Link } from 'gatsby';

import '../styles/style.scss';

const Header = () => {
  return (
    <>
      <div className="header">
        <Link to="../" className="logo">Whatsapp Analysis</Link>
      </div>
    </>
  );
};

export default Header;
