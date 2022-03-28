import React from 'react';
import reactDOM from 'react-dom';
import Anime, { anime } from 'react-anime';

import Welcome from '../components/showcase/welcome';

import '../styles/style.scss';

const IndexPage = () => (
  <div className="showcase">
    <Welcome chatName="Arthur Righteous 🏎" />
    
    Test

  </div>
);

export default IndexPage;
