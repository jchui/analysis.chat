import React, { useCallback, useState } from 'react';

import Dropzone from '../components/dropzone';

import '../styles/style.scss';

const IndexPage = () => {
  const [droppedFile, setDroppedFile] = useState([]);

  const handleFileDrop = useCallback(acceptedFiles => {
    if (acceptedFiles == 0) {
        console.log("File Rejected.");
    } else {
        console.log(acceptedFiles);
        setDroppedFile(acceptedFiles);
    }
}, []);

  return (
    <main>
      <Dropzone onDrop={handleFileDrop}/>
    </main>
  );
};

export default IndexPage;
