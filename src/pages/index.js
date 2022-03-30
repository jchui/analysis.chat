import * as React from 'react';
import { useRef, useState } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

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
    chatDayRadar:{
      labels: [],
      datasets: [],
    },
    chatTopLinksSummary:{
      labels: [],
      datasets: [],
    }
  });
  const [chatName, setChatName] = useState();
  const [chatImages, setChatImages] = useState();

  const parallax = useRef();

  // FUNCTIONS
  const getChatLogParsedFromChild = val => {
    processChatLogData(val);
  };

  const getChatImagesFromChild = val => {
    processChatImages(val);
  };

  const getChatNameFromChild = val => {
    setChatName(val);
    processChatName(val);
  };

  const processChatLogData = chatLog => {
    // Check to ensure chat logs are suitable for processing
    chatLog.length > 1 ? setChatDataCheck(true) : setChatDataCheck(false);

    const chatMessageDuration = () => {

      var date1 = chatLog[0].date.split("/");
      var date1Object = new Date(+date1[2], date1[1] - 1, +date1[0]); 

      var date2 = chatLog[chatLog.length - 1].date.split("/");
      var date2Object = new Date(+date2[2], date2[1] - 1, +date2[0]); 

      var difference = date2Object.getTime() - date1Object.getTime() ;
      var days = Math.ceil(difference / (1000 * 3600 * 24));

      return days;
    }

    const chatMessageCount = chatLog.length;

    setChatData({ 
      chatMessageDuration: chatMessageDuration(),
      chatMessageCount: chatMessageCount,
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
      chatDayRadar:{
        labels: [],
        datasets: [],
      },
      chatTopLinksSummary:{
        labels: [],
        datasets: [],
      }
     });

  };

  const processChatImages = chatImages => {
    // Set chatImages
    setChatImages(chatImages);
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
            <Showcase chatName={chatName} chatImages={chatImages} chatData={chatData} />
          </>
        )}
      </Layout>
    </>
  );
};

export default IndexPage;
