import React, { useCallback, useState } from 'react';
import JSZip from 'jszip';

async function parseAcceptedFile(acceptedFile) {
  let output = { chatName: null, chatImages: [], chatLog: [] };
  let chatImages = [];
  let chatLog = [];

  var title = acceptedFile[0].name;
  title = title.replace('WhatsApp Chat - ', '');
  title = title.substring(0, title.length - 4);

  let chatImagesPromise = parseChatImages(acceptedFile[0]);
  let chatLogPromise = parseChatLog(acceptedFile[0]);

  output.chatName = title;
  output.chatImages = await chatImagesPromise;
  output.chatLog = await chatLogPromise;

  console.log(output);

  return output;
}

function parseChatImages(acceptedFile) {
  const chatImages = JSZip.loadAsync(acceptedFile)
    .then(function (zip) {
      var re = /(.jpg|.png|.gif|.ps|.jpeg)$/;
      var promises = Object.keys(zip.files)
        .filter(function (fileName) {
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
      function (value) {
        return value;
      },
      function (error) {
        return error;
      }
    );

  return chatImages;
}

function parseChatLog(acceptedFile) {
  const chatLog = JSZip.loadAsync(acceptedFile)
    .then(function (zip) {
      const chatLogFile = zip.file('_chat.txt');
      return chatLogFile == null ? null : chatLogFile.async('text');
    })
    .then(function (promiseResult) {
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

      chatLog.shift();

      return chatLog;
    }, []);

  return chatLog;
}

export { parseAcceptedFile };
