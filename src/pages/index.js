import * as React from 'react';

import '../styles/style.scss';

const IndexPage = () => {
  return (
    <main>
      <title>Home Page</title>
      <h1>Hello world</h1>

      <div className="container">
        <div className="columns">
          <div className="column">
            <h2 className="title is-2">Level 2 heading</h2>
            <p className="content">Cool content. Using Bulma!</p>
          </div>
          <div className="column is-four-fifths">
            <h2 className="title is-2">Level 2 heading</h2>
            <p className="content">This column is cool too!</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default IndexPage;
