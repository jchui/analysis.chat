import * as React from 'react';
import { useRef, useState } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import numWords from 'num-words';
import { format, formatDistance, formatRelative, subDays } from 'date-fns';

import '../styles/style.scss';

import Layout from '../components/layout';
import Introduction from '../components/showcase/introduction';
import DragDrop from '../components/showcase/dragdrop';
import Showcase from './showcase';

const IndexPage = () => {
  // VARIABLES
  const [chatDataCheck, setChatDataCheck] = useState(false);
  const [chatData, setChatData] = useState({
    chatName: null,
    chatMessageDuration: null,
    chatMessageCount: null,
    chatParticipantCount: null,
    chatFirstMessageDate: null,
    chatAvgWeeklyMessages: null,
    chatLongestDayStreak: null,
    chatMostActiveUser: null,
    chatConversationStarter: null,
    chatTopEmoji: null,
    chatTextingTime: null,
    chatNightowlUser: null,
    chatEarlybirdUser: null,
    chatAvgDailyMessages: null,
    chatAvgDailyMessagesNote: null,
    chatImagesCount: null,
    chatTopLinkAddress: null,
    chatTopDay: null,
    chatUserMessageCountGraphData: {
      labels: [],
      datasets: [],
    },
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
  });
  const [chatName, setChatName] = useState();
  const [chatImages, setChatImages] = useState();

  const parallax = useRef();

  // FUNCTIONS
  const getChatLogParsedFromChild = val => {
    processChatLogData(val, chatName);
  };

  const getChatImagesFromChild = val => {
    processChatImages(val);
  };

  const getChatNameFromChild = val => {
    setChatName(val);
    processChatName(val);
  };

  const processChatLogData = (chatLog) => {
    // Check to ensure chat logs are suitable for processing
    chatLog.length > 1 ? setChatDataCheck(true) : setChatDataCheck(false);

    const chatMessageDuration = () => {
      var date1 = chatLog[0].date.split('/');
      var date1Object = new Date(+date1[2], date1[1] - 1, +date1[0]);

      var date2 = chatLog[chatLog.length - 1].date.split('/');
      var date2Object = new Date(+date2[2], date2[1] - 1, +date2[0]);

      var difference = date2Object.getTime() - date1Object.getTime();
      var days = Math.ceil(difference / (1000 * 3600 * 24));

      return days;
    };

    const chatMessageCount = chatLog.length;

    const chatParticipantCount = () => {
      const frequency = chatLog
      .map(({ user }) => user)
      .reduce((users, user) => {
        const count = users[user] || 0;
        users[user] = count + 1;
        return users;
      }, {});

      delete frequency["Admin"];
      delete frequency["‎You"];

      var result = numWords(Object.keys(frequency).length);

      return result;
    };

    const chatFirstMessageDate = () => {
      var date = chatLog[0].date.split('/');
      var dateObject = new Date(+date[2], date[1] - 1, +date[0]);

      return format(dateObject, 'do LLLL, y');
    };

    const chatAvgWeeklyMessages = Math.floor(
      chatMessageCount / chatMessageDuration()
    );

    const chatLongestDayStreak = () => {
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
    };

    const chatMostActiveUser = () => {
      const frequency = chatLog
      .map(({ user }) => user)
      .reduce((users, user) => {
        const count = users[user] || 0;
        users[user] = count + 1;
        return users;
      }, {});

      delete frequency["Admin"];
      delete frequency["‎You"];

      var sortable = [];
      for (var item in frequency) {
          sortable.push([item, frequency[item]]);
      }

      sortable.sort(function(a, b) {
          return b[1] - a[1];
      });

      return sortable[0][0];
    }

    const chatLeastActiveUser = () => {
      const frequency = chatLog
      .map(({ user }) => user)
      .reduce((users, user) => {
        const count = users[user] || 0;
        users[user] = count + 1;
        return users;
      }, {});

      delete frequency["Admin"];
      delete frequency["‎You"];

      var sortable = [];
      for (var item in frequency) {
          sortable.push([item, frequency[item]]);
      }

      sortable.sort(function(a, b) {
          return a[1] - b[1];
      });

      return sortable[0][0];
    }

    const chatTopEmoji = () => {
      var chatLogMessages = {
        result: chatLog.map(function(item) {
           return item.message;
        })
    }

    var chatLogMessagesArray = Object.values(chatLogMessages.result);

    var chatLogMessagesBlock = chatLogMessagesArray.join(" ");

      let emojiFrequency = [...chatLogMessagesBlock].reduce((freq, char) => {
        if (char >= '\u{1F300}' && char < '\u{1F700}') freq[char] = (freq[char] || 0) + 1;
        return freq;
      }, {});

      var sortable = [];
      for (var item in emojiFrequency) {
          sortable.push([item, emojiFrequency[item]]);
      }

      sortable.sort(function(a, b) {
          return b[1] - a[1];
      });

      var output = sortable[0][0] + ' ' + sortable[1][0] + ' ' + sortable[2][0] + ' ' + sortable[3][0];

      return output;
    }

    setChatData({
      chatMessageDuration: chatMessageDuration(),
      chatMessageCount: chatMessageCount,
      chatParticipantCount: chatParticipantCount(),
      chatFirstMessageDate: chatFirstMessageDate(),
      chatAvgWeeklyMessages: chatAvgWeeklyMessages,
      chatLongestDayStreak: chatLongestDayStreak(),
      chatMostActiveUser: chatMostActiveUser(),
      chatLeastActiveUser: chatLeastActiveUser(),
      chatTopEmoji: chatTopEmoji(),
      chatTextingTime: null,
      chatNightowlUser: null,
      chatEarlybirdUser: null,
      chatAvgDailyMessages: '',
      chatImagesCount: 23,
      chatTopLinkAddress: null,
      chatTopDay: null,
      chatUserMessageCountGraphData: {
        labels: [],
        datasets: [],
      },
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
    });
  };

  const generateRandomChatImage = chatImages => {
    var result = chatImages[Math.floor(Math.random() * chatImages.length)][1];

    return result;
  };

  const processChatImages = chatImages => {
    let randomisedImagesArray = [];

    for (let i = 0; i < 100; i++) {
      randomisedImagesArray.push(generateRandomChatImage(chatImages));
    }

    // Set chatImages
    setChatImages(randomisedImagesArray);
  };

  const processChatName = chatName => {
    // Set chatMessageCount
    setChatName(chatName);
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
            <Showcase
              chatName={chatName}
              chatImages={chatImages}
              chatData={chatData}
            />
          </>
        )}
      </Layout>
    </>
  );
};

export default IndexPage;
