import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import JSZip from 'jszip';

import '../styles/style.scss';

const IndexPage = () => {
  let chatLog = [];
  let chatFiles = [];

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
            console.log(chatLog);
            for(var i = 0; i<chatLog.length; i++) {
              let tempArray = [];
              let tempDate = chatLog[i].split(", ")[0].split("[")[1];
              let tempUser = chatLog[i].split(", ")[1].split("] ")[1].split(": ")[0];
              let tempMessage = chatLog[i].split(", ")[1].split("] ")[1].split(": ")[1];
    
              tempUser = chatLog[i].split(", ")[1].split("] ")[1].split(": ")[1] == undefined ? "Admin" : chatLog[i].split(", ")[1].split("] ")[1].split(": ")[0];
    
              tempMessage = chatLog[i].split(", ")[1].split("] ")[1].split(": ")[1] == undefined ? chatLog[i].split(", ")[1].split("] ")[1].split(": ")[0] : chatLog[i].split(", ")[1].split("] ")[1].split(": ")[1];
    
              tempArray.push({
                "date": tempDate,
                "time": chatLog[i].split(", ")[1].split("] ")[0],
                "user": tempUser,
                "message": tempMessage
              });
              chatLog[i] = tempArray[0];
            }

          console.log(chatLog);
          return chatLog;
        });
      // .then(function (log) {
      //   chatLog = log.split('\r\n[');
      //   for(var i = 0; i<chatLog.length; i++) {
      //     let tempArray = [];
      //     let tempUser = chatLog[i].split(", ")[1].split("] ")[1].split(": ")[0];
      //     let tempMessage = chatLog[i].split(", ")[1].split("] ")[1].split(": ")[1];

      //     tempUser = chatLog[i].split(", ")[1].split("] ")[1].split(": ")[1] == undefined ? "Admin" : chatLog[i].split(", ")[1].split("] ")[1].split(": ")[0];

      //     tempMessage = chatLog[i].split(", ")[1].split("] ")[1].split(": ")[1] == undefined ? chatLog[i].split(", ")[1].split("] ")[1].split(": ")[0] : chatLog[i].split(", ")[1].split("] ")[1].split(": ")[1];

      //     tempArray.push({
      //       "date": chatLog[i].split(", ")[0],
      //       "time": chatLog[i].split(", ")[1].split("] ")[0],
      //       "user": tempUser,
      //       "message": tempMessage
      //     });
      //     chatLog[i] = tempArray[0];
      //   }
      // })
      // .then(function () {
      //   console.log(chatFiles);
      //   console.log(chatLog);
      // });
    });
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      accept:
        'application/zip, application/octet-stream, application/x-zip-compressed, multipart/x-zip',
    });

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
