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
  const [chatName, setChatName] = useState();
  const [chatDataCheck, setChatDataCheck] = useState(false);

  const [chatData, setChatData] = useState({
    chatName: '',
    chatMessageCount: '',
  });

  const getChatLogParsedFromChild = val => {
    setChatLogParsed(val);
    console.log(val);

    processChatLogData(val);
  };

  const getChatImagesFromChild = val => {
    setChatImages(val);
    console.log(val);
  };

  const getChatNameFromChild = val => {
    setChatName(val);
    console.log(val);
  };

  const processChatLogData = chatLog => {
    // Check to ensure chat logs are suitable for processing
    chatLog.length > 1 ? setChatDataCheck(true) : setChatDataCheck(false);

    // Set chatName
    setChatData({ chatName: 'test' });

    // Set chatMessageCount
    setChatData({ chatMessageCount: chatLog.length - 2 });
  };

  return (
    <>
      <Layout>
        {!chatDataCheck ? (
          <>
            <Introduction />
            <DragDrop
              sendChatLogParsed={getChatLogParsedFromChild}
              sendChatImages={getChatImagesFromChild}
              sendChatName={getChatNameFromChild}
            />
          </>
        ) : (
          <>
            chatName {chatData.chatName}
            chatMessageCount {chatData.chatMessageCount}
          </>
        )}
      </Layout>
    </>
  );
};

export default IndexPage;
