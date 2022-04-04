import React, { useCallback, useState } from 'react';
import JSZip from 'jszip';

const parseAcceptedFile = acceptedFile => {
  let output = { chatName: null, chatFiles: [], chatLog: [] };
  let fileContent = [];
  let chatLog = [];

  var title = acceptedFile[0].name;
  title = title.replace('WhatsApp Chat - ', '');
  title = title.substring(0, title.length - 4);

  JSZip.loadAsync(acceptedFile[0]).then(
    function (zip) {
      zip.forEach(function (relativePath, zipEntry) {
        fileContent.push(zipEntry);
      });

      chatLog = zip.file('_chat.txt');
    },
    function (e) {
      console.log(acceptedFile[0].name + ': ' + e.message);
    }
  );

  output.chatName = title;
  output.chatFiles = fileContent;
  output.chatLog = chatLog;

  return output;
};

export { parseAcceptedFile };
