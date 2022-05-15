import React, { useCallback, useState } from 'react';

import { parseAcceptedFile } from '../components/functions';

import Dropzone from '../components/dropzone';
import Showcase from '../components/showcase';

import '../styles/style.scss';

function awaitDataParsing(acceptedFile) {
  const parsedData = parseAcceptedFile(acceptedFile);
  return Promise.resolve(parsedData);
}

const IndexPage = () => {
  const [loading, setLoading] = useState(false);
  const [chatLogData, setChatLogData] = useState();

  const handleFileDrop = useCallback(acceptedFile => {
    if (acceptedFile != 0) {
      setLoading(true);

      awaitDataParsing(acceptedFile).then(data => {
        setLoading(false);
        setChatLogData(data);
      });
    }
  }, []);

  return (
    <main>
      <div className="wip">
        <p>Work in Progress</p>
      </div>

      <section className="container">
        <Dropzone onDrop={handleFileDrop} />

        {loading && <p>Loading</p>}
        {chatLogData != undefined && <Showcase chatLogData={chatLogData} />}
      </section>
    </main>
  );
};

export default IndexPage;
