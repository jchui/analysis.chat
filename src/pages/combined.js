import * as React from 'react';
import { useCallback, useEffect, useMemo, useState, Link } from 'react';
import { useDropzone } from 'react-dropzone';
import JSZip from 'jszip';

import '../styles/style.scss';

import Layout from '../components/layout';
import Introduction from '../components/showcase/introduction';
import DragDrop from '../components/showcase/dragdrop';

const IndexPage = () => {

    const [chatLogParsed, setChatLogParsed] = useState();
    const [chatImages, setChatImages] = useState();
    const [chatDataCheck, setChatDataCheck] = useState(false);

    const getChatLogParsedFromChild = (val) => {
        setChatLogParsed(val);
        console.log(val);
        val.length > 1 
        ? setChatDataCheck(true)
        : setChatDataCheck(false)
    }

    const getChatImagesFromChild = (val) => {
        setChatImages(val)
        console.log(val);
    }

  return (
    <>
      <Layout>
          <Introduction />
        <DragDrop sendChatLogParsed={getChatLogParsedFromChild} sendChatImages={getChatImagesFromChild}/>
        {chatDataCheck.toString()}
      </Layout>
    </>
  );
};

export default IndexPage;
