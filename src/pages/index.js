import React, { useCallback, useState } from 'react';

import { parseAcceptedFile } from '../components/functions';

import Dropzone from '../components/dropzone';

import '../styles/style.scss';

const IndexPage = () => {
  const [droppedFile, setDroppedFile] = useState([]);

  const handleFileDrop = useCallback(acceptedFile => {
    if (acceptedFile == 0) {
        console.log("File Rejected.");
    } else {
        console.log(acceptedFile);
        console.log(parseAcceptedFile(acceptedFile));
        setDroppedFile(acceptedFile);
    }
}, []);

  return (
    <main>
      <Dropzone onDrop={handleFileDrop}/>
    </main>
  );
};

export default IndexPage;
