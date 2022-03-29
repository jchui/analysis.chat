import * as React from 'react';
import { useCallback, useEffect, useMemo, useState, Link } from 'react';
import { useDropzone } from 'react-dropzone';
import JSZip from 'jszip';

import '../styles/style.scss';

import Layout from '../components/layout';
import DragDrop from '../components/showcase/dragdrop';

const IndexPage = () => {

    const getChatImagesFromChild = (val) => {
        console.log(val);
    }

    const getChatLogParsedFromChild = (val) => {
        console.log(val);
    }

  return (
    <>
      <Layout>
        <DragDrop sendChatLogParsed={getChatLogParsedFromChild} sendChatImages={getChatImagesFromChild}/>
      </Layout>
    </>
  );
};

export default IndexPage;
