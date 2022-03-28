import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import JSZip from 'jszip';

import '../styles/style.scss';

const IndexPage = () => {
  let chatLog = [];
  let chatFiles = [];

  // Open _chat.txt and parse conversation into chatLog and chatFiles
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      const chatLogFile = JSZip.loadAsync(file)
        .then(function (zip) {
          const chatLogFile = zip.file('_chat.txt');
          chatFiles = zip.file().files;
          return chatLogFile == null ? null : chatLogFile.async('text');
        })
        .then(function (promiseResult) {
          promiseResult == null
            ? (chatLog = ['[, ] : ', undefined])
            : (chatLog = promiseResult.split('\r\n'));

          chatLog.pop();

          for (var i = 0; i < chatLog.length; i++) {
            let tempArray = [];

            let tempDate,
              tempTime,
              tempUser,
              tempMessage,
              tempUserMessage = '';

            tempDate = chatLog[i].split(', ')[0].split('[')[1];

            tempTime = chatLog[i].split(', ')[1].split('] ')[0];

            tempUserMessage = chatLog[i].split('] ').slice(1).join('] ');

            tempUserMessage.split(': ').slice(1).join(': ')[1] == undefined
              ? ((tempUser = 'Admin'), (tempMessage = tempUserMessage))
              : ((tempUser = tempUserMessage.substring(
                  0,
                  tempUserMessage.indexOf(': ')
                )),
                (tempMessage = tempUserMessage.substring(
                  tempUserMessage.indexOf(': ') + 2
                )));

            tempArray.push({
              date: tempDate,
              time: tempTime,
              user: tempUser,
              message: tempMessage,
            });
            chatLog[i] = tempArray[0];
          }

          console.log(chatLog);
          return chatLog;
        });
    });
  }, []);

  // react-dropzone props + accept only .zip files
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      accept:
        'application/zip, application/octet-stream, application/x-zip-compressed, multipart/x-zip',
    });

  // Styling for react-dropzone
  const style = useMemo(
    () => ({
      ...['base'],
      ...(isFocused ? ['base focused'] : {}),
      ...(isDragAccept ? ['base accept'] : {}),
      ...(isDragReject ? ['base reject'] : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <main>
      <title>Home Page</title>
      <h1>Hello world</h1>

      <div className="container">
        <div className="column">
          <div className="dndinput">
            <div {...getRootProps()} className={style[0]}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default IndexPage;
