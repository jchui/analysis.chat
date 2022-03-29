import * as React from 'react';
import { useCallback, useMemo, useState, Link } from 'react';
import { useDropzone } from 'react-dropzone';
import JSZip from 'jszip';

import '../../styles/style.scss';

const DragDrop = ({ sendChatLogParsed, sendChatImages }) => {

    const [chatLogParsed, setChatLogParsed] = useState();
    const [chatImages, setChatImages] = useState();

    const sendChatLogParsedToParent = (value) => {
        sendChatLogParsed(value);
    }

    const sendChatImagesToParent = (value) => {
        sendChatImages(value);
    }

    const onDrop = useCallback(files => {

      // chatLogParsed [{date: , time: , name: , message: }]
      JSZip.loadAsync(files[0])
        .then(function (zip) {
          const chatLogFile = zip.file('_chat.txt');
          return chatLogFile == null ? null : chatLogFile.async('text');
        })
        .then(
          function (promiseResult) {
            let chatLog = [];
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

            setChatLogParsed(chatLog);
            sendChatLogParsedToParent(chatLog);
            // console.log(chatLog);
          },
          [chatLogParsed]
        );

      // chatImages [{blob_url, image_name}]
      JSZip.loadAsync(files[0])
        .then(function (zip) {
          var re = /(.jpg|.png|.gif|.ps|.jpeg)$/;
          var promises = Object.keys(zip.files)
            .filter(function (fileName) {
              // don't consider non image files
              return re.test(fileName.toLowerCase());
            })
            .map(function (fileName) {
              var file = zip.files[fileName];
              return file.async('blob').then(function (blob) {
                return [fileName, URL.createObjectURL(blob)];
              });
            });
          return Promise.all(promises);
        })
        .then(
          function (result) {
            setChatImages(result);
            sendChatImagesToParent(result);
            // console.log(result);
          },
          [chatImages]
        );

    });

  // react-dropzone props + accept only .zip files
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      accept:
        'application/zip, application/octet-stream, application/x-zip-compressed, multipart/x-zip',
      multiple: false,
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
    <>
      <div className="dndinput">
        <div {...getRootProps()} className={style[0]}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        </div>
    </>
  );
};

export default DragDrop;