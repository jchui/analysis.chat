import React, { useCallback, useState } from 'react';
import JSZip from 'jszip';
import numWords from 'num-words';
import { format } from 'date-fns';
import _ from 'lodash';

async function parseAcceptedFile(acceptedFile) {
  let output = {
    status: false,
    chatName: null,
    chatImages: [],
    chatLog: [],
    data: {},
  };

  let chatLogFile = acceptedFile[0];

  var title = chatLogFile.name;
  title = title.replace('WhatsApp Chat - ', '');
  title = title.substring(0, title.length - 4);

  let chatImagesPromise = parseChatImages(chatLogFile);
  let chatLogPromise = parseChatLog(chatLogFile);

  output.chatName = title;
  output.chatImages = await chatImagesPromise;
  output.chatLog = await chatLogPromise;

  if (output.chatLog.length != 0) {
    output.data = processChatLogData(output.chatLog);
    output.status = true;
  }

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

function processChatLogData(chatLog) {
  let data = {
    chatMessageDuration: chatMessageDuration(chatLog),
    chatMessageCount: chatMessageCount(chatLog),
    chatParticipantCount: chatParticipantCount(chatLog),
    chatFirstMessageDate: chatFirstMessageDate(chatLog),
    chatLongestDayStreak: chatLongestDayStreak(chatLog),
  };

  return data;
}

/* ********************************************** */
// FUNCTIONS FOR PARSING INDIVIDUAL DATA POINTS  //
/* ********************************************** */

function chatMessageDuration(chatLog) {
  var earliestDate = chatLog[0].date.split('/');
  var earliestDateObject = new Date(
    +earliestDate[2],
    earliestDate[1] - 1,
    +earliestDate[0]
  );

  var lastDate = chatLog[chatLog.length - 1].date.split('/');
  var lastDateObject = new Date(+lastDate[2], lastDate[1] - 1, +lastDate[0]);

  var difference = lastDateObject.getTime() - earliestDateObject.getTime();
  var dateDifference = Math.ceil(difference / (1000 * 3600 * 24));

  return dateDifference;
}

function chatMessageCount(chatLog) {
  return chatLog.length;
}

function chatParticipantCount(chatLog) {
  const chatLogUsers = chatLog
    .map(({ user }) => user)
    .reduce((users, user) => {
      const count = users[user] || 0;
      users[user] = count + 1;
      return users;
    }, {});

  delete chatLogUsers['Admin'];
  delete chatLogUsers['‎You'];

  var result = numWords(Object.keys(chatLogUsers).length);

  return result;
}

function chatFirstMessageDate(chatLog) {
  var date = chatLog[0].date.split('/');
  var dateObject = new Date(+date[2], date[1] - 1, +date[0]);

  return format(dateObject, 'do LLLL y');
}

function chatLongestDayStreak(chatLog) {
  let chatLogCopy = chatLog;

  let uniqueChatLogDates = [
    ...new Map(chatLogCopy.map(item => [item['date'], item])).values(),
  ];

  let topStreakCounter = 0,
    tempStreakCounter = 0;
  let prevDate = new Date(),
    currentDate = new Date();

  Object.keys(uniqueChatLogDates).map(key => {
    var date = uniqueChatLogDates[key].date.split('/');
    var dateObject = new Date(+date[2], date[1] - 1, +date[0]);

    currentDate = dateObject;
    if (prevDate == null) {
      tempStreakCounter = tempStreakCounter + 1;
    } else {
      var datediff = Math.ceil(
        Math.abs(currentDate - prevDate) / (1000 * 60 * 60 * 24)
      );
      if (datediff <= 1) {
        tempStreakCounter = tempStreakCounter + 1;
      } else {
        tempStreakCounter = 0;
      }
    }

    if (tempStreakCounter > topStreakCounter) {
      topStreakCounter = tempStreakCounter;
    }
    prevDate = currentDate;
  });

  return topStreakCounter;
}

export { parseAcceptedFile };
