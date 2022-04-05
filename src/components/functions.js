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
    output.data = processChatLogData(output.chatLog, output.chatImages);
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

function processChatLogData(chatLog, chatImages) {
  let data = {
    chatMessageDuration: chatMessageDuration(chatLog),
    chatMessageCount: chatMessageCount(chatLog),
    chatParticipantCount: chatParticipantCount(chatLog),
    chatFirstMessageDate: chatFirstMessageDate(chatLog),
    chatLongestDayStreak: chatLongestDayStreak(chatLog),
    chatMostActiveUser: chatMostActiveUser(chatLog),
    chatLeastActiveUser: chatLeastActiveUser(chatLog),
    chatTopEmoji: chatTopEmoji(chatLog),
    chatTextingTime: chatTextingTime(chatLog),
    chatAvgWeeklyMessages: chatAvgWeeklyMessages(chatLog),
    chatAvgDailyMessages: chatAvgDailyMessages(chatLog),
    chatNightowlUser: chatNightowlUser(chatLog),
    chatEarlybirdUser: chatEarlybirdUser(chatLog),
    chatImagesCount: chatImagesCount(chatImages),
    chatTopLinkAddress: chatTopLinkAddress(chatLog),
    chatTopDay: null,
    chatUserMessageCountGraphData: chatUserMessageCountGraphData(chatLog),
    chatUserMessagingTrendsByTime: {
      labels: [],
      datasets: [],
    },
    chatLogFullTimeline: {
      labels: [],
      datasets: [],
    },
    chatDayRadar: {
      labels: [],
      datasets: [],
    },
    chatTopLinksSummary: {
      labels: [],
      datasets: [],
    },
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

function chatMostActiveUser(chatLog) {
  const frequency = chatLog
    .map(({ user }) => user)
    .reduce((users, user) => {
      const count = users[user] || 0;
      users[user] = count + 1;
      return users;
    }, {});

  delete frequency['Admin'];
  delete frequency['‎You'];

  var sortable = [];
  for (var item in frequency) {
    sortable.push([item, frequency[item]]);
  }

  sortable.sort(function (a, b) {
    return b[1] - a[1];
  });

  return sortable[0][0];
}

function chatLeastActiveUser(chatLog) {
  const frequency = chatLog
    .map(({ user }) => user)
    .reduce((users, user) => {
      const count = users[user] || 0;
      users[user] = count + 1;
      return users;
    }, {});

  delete frequency['Admin'];
  delete frequency['‎You'];

  var sortable = [];
  for (var item in frequency) {
    sortable.push([item, frequency[item]]);
  }

  sortable.sort(function (a, b) {
    return a[1] - b[1];
  });

  return sortable[0][0];
}

function chatTopEmoji(chatLog) {
  var chatLogMessages = {
    result: chatLog.map(function (item) {
      return item.message;
    }),
  };

  var chatLogMessagesArray = Object.values(chatLogMessages.result);

  var chatLogMessagesBlock = chatLogMessagesArray.join(' ');

  let emojiFrequency = [...chatLogMessagesBlock].reduce((freq, char) => {
    if (char >= '\u{1F300}' && char < '\u{1F700}')
      freq[char] = (freq[char] || 0) + 1;
    return freq;
  }, {});

  var sortable = [];
  for (var item in emojiFrequency) {
    sortable.push([item, emojiFrequency[item]]);
  }

  sortable.sort(function (a, b) {
    return b[1] - a[1];
  });

  var output =
    sortable[0][0] +
    ' ' +
    sortable[1][0] +
    ' ' +
    sortable[2][0] +
    ' ' +
    sortable[3][0];

  return output;
}

function chatUserMessageCountGraphData(chatLog) {
  let result = {
    labels: [],
    datasets: [
      {
        label: 'User',
        data: [],
        borderWidth: 1,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
      },
    ],
  };

  const frequency = chatLog
    .map(({ user }) => user)
    .reduce((users, user) => {
      const count = users[user] || 0;
      users[user] = count + 1;
      return users;
    }, {});

  delete frequency['Admin'];
  delete frequency['‎You'];

  let tempDatasetArray = [];

  Object.keys(frequency).map(item => {
    result.labels.push(item);
    tempDatasetArray.push(frequency[item]);
  });

  result.datasets[0].data = tempDatasetArray;

  return result;
}

function chatTextingTime(chatLog) {
  const tempChatTextTime = _.cloneDeep(chatLog);

  Object.keys(tempChatTextTime).map(item => {
    delete tempChatTextTime[item]['date'];
    delete tempChatTextTime[item]['message'];

    tempChatTextTime[item]['time'] = tempChatTextTime[item]['time'].substring(
      0,
      2
    );
  });

  var tempChatTextTimeHour = tempChatTextTime.reduce(
    (c, { time: key }) => ((c[key] = (c[key] || 0) + 1), c),
    {}
  );

  var sortable = [];
  for (var item in tempChatTextTimeHour) {
    sortable.push([item, tempChatTextTimeHour[item]]);
  }

  sortable.sort(function (a, b) {
    return b[1] - a[1];
  });

  var topTimeFreq = parseInt(sortable[0][0]);
  let result = '';

  if (topTimeFreq >= 2 && topTimeFreq < 8) {
    result = 'early mornings';
  } else if (topTimeFreq >= 8 && topTimeFreq < 12) {
    result = 'in the morning';
  } else if (topTimeFreq >= 12 && topTimeFreq < 18) {
    result = 'in the afternoon';
  } else if (topTimeFreq >= 18 && topTimeFreq < 22) {
    result = 'in the evening';
  } else {
    result = 'late at night';
  }

  return result;
}

function chatAvgWeeklyMessages(chatLog) {
  return Math.floor(
    (chatMessageCount(chatLog) / chatMessageDuration(chatLog)) * 7
  );
}

function chatAvgDailyMessages(chatLog) {
  return Math.floor(chatMessageCount(chatLog) / chatMessageDuration(chatLog));
}

function chatImagesCount(chatImages) {
  return chatImages.length;
}

function chatNightowlUser(chatLog) {
  const tempChatTextTime = _.cloneDeep(chatLog);

  Object.keys(tempChatTextTime).map(item => {
    delete tempChatTextTime[item]['date'];
    delete tempChatTextTime[item]['message'];

    tempChatTextTime[item]['time'] = tempChatTextTime[item]['time'].substring(
      0,
      2
    );
  });

  let filteredTime = [];
  for (let i = 0; i < tempChatTextTime.length; i++) {
    if (tempChatTextTime[i].time >= 22 || tempChatTextTime[i].time <= 4) {
      filteredTime.push(tempChatTextTime[i]);
    }
  }

  const frequency = filteredTime
    .map(({ user }) => user)
    .reduce((users, user) => {
      const count = users[user] || 0;
      users[user] = count + 1;
      return users;
    }, {});

  delete frequency['Admin'];
  delete frequency['‎You'];

  var sortable = [];
  for (var item in frequency) {
    sortable.push([item, frequency[item]]);
  }

  sortable.sort(function (a, b) {
    return b[1] - a[1];
  });

  return sortable[0][0];
}

function chatEarlybirdUser(chatLog) {
  const tempChatTextTime = _.cloneDeep(chatLog);

  Object.keys(tempChatTextTime).map(item => {
    delete tempChatTextTime[item]['date'];
    delete tempChatTextTime[item]['message'];

    tempChatTextTime[item]['time'] = tempChatTextTime[item]['time'].substring(
      0,
      2
    );
  });

  let filteredTime = [];
  for (let i = 0; i < tempChatTextTime.length; i++) {
    if (tempChatTextTime[i].time >= 4 && tempChatTextTime[i].time <= 8) {
      filteredTime.push(tempChatTextTime[i]);
    }
  }

  const frequency = filteredTime
    .map(({ user }) => user)
    .reduce((users, user) => {
      const count = users[user] || 0;
      users[user] = count + 1;
      return users;
    }, {});

  delete frequency['Admin'];
  delete frequency['‎You'];

  var sortable = [];
  for (var item in frequency) {
    sortable.push([item, frequency[item]]);
  }

  sortable.sort(function (a, b) {
    return b[1] - a[1];
  });

  return sortable[0][0];
}

function chatTopLinkAddress(chatLog) {
  var chatLogMessages = {
    result: chatLog.map(function (item) {
      return item.message;
    }),
  };

  var chatLogMessagesArray = Object.values(chatLogMessages.result);

  var chatLogMessagesBlock = chatLogMessagesArray.join(' ');

  var expression =
    /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;
  var chatLogMessagesURL = chatLogMessagesBlock.match(expression);

  let summarisedChatLogURLs = [];
  for (var item in chatLogMessagesURL) {
    let url = chatLogMessagesURL[item];
    url = url.replace('http://', '');
    url = url.replace('https://', '');
    url = url.replace('www.', '');
    url = url.split('/')[0];

    summarisedChatLogURLs.push(url);
  }

  let chatLogURLSummary = {};
  summarisedChatLogURLs.forEach(function (x) {
    chatLogURLSummary[x] = (chatLogURLSummary[x] || 0) + 1;
  });

  let sortable = Object.entries(chatLogURLSummary);

  let sortedURLs = sortable.sort((a, b) => b[1] - a[1]);

  return sortedURLs[0][0];
}

export { parseAcceptedFile };
