import React, { useCallback, useState } from 'react';

import { parseAcceptedFile } from '../components/functions';

import Dropzone from '../components/dropzone';
import Showcase from '../components/showcase';

import '../styles/style.scss';

const IndexPage = () => {
  const [chatLogData, setChatLogData] = useState();

  const handleFileDrop = useCallback(acceptedFile => {
    if (acceptedFile != 0) {
      setChatLogData(parseAcceptedFile(acceptedFile));
    }
  }, []);

  console.log(chatLogData);

  return (
    <main>
      <Dropzone onDrop={handleFileDrop} />
      {chatLogData != undefined && <Showcase chatLogData={chatLogData} />}
    </main>
  );
};

export default IndexPage;
