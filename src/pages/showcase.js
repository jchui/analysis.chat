import React, { useEffect, useRef, useState } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

import Welcome from '../components/showcase/welcome';
import WelcomeDetails from '../components/showcase/welcomeDetails';
import Participants from '../components/showcase/participants';
import ParticipantMessagingDetails from '../components/showcase/participantMessagingDetails';
import ParticipantMessagingCount from '../components/showcase/participantMessagingCount';
import ParticipantMessagingTimeline from '../components/showcase/participantMessagingTimeline';
import AdditionalInformation from '../components/showcase/additionalInformation';
import AdditionalInformationDetails from '../components/showcase/additionalInformationDetails';
import AdditionalInformationSummary from '../components/showcase/additionalInformationSummary';
import Sharing from '../components/showcase/sharing';

const Showcase = ({
  chatName: chatName,
  chatImages: chatImages,
  chatData: chatData,
}) => {
  // Variables
  const parallax = useRef();

  // console.log(chatData);

  return (
    <div className="showcase" style={{ width: '100%', height: '100%' }}>
      {/* PARALLAX BACKGROUNDS */}
      <Parallax ref={parallax} pages={4.1}>
        <ParallaxLayer // Sharing
          offset={3}
          speed={1}
          factor={1.5}
          style={{ backgroundColor: '#F2D77E' }}
        />
        <ParallaxLayer // Additional Information
          offset={2}
          speed={1}
          factor={2}
          style={{ backgroundColor: '#2B8772' }}
        />
        <ParallaxLayer // Welcome - Participants
          offset={0}
          speed={1}
          factor={2}
          style={{ backgroundColor: '#6EF0D1' }}
        />
        <ParallaxLayer // Participants
          offset={1}
          speed={1}
          factor={2.75}
          style={{ backgroundColor: '#6EF0D1' }}
        />
        <ParallaxLayer // Welcome
          offset={0}
          speed={1}
          factor={1}
          style={{ backgroundColor: 'white' }}
        />

        {/* PARALLAX IMAGES */}
        {chatImages ? (
          Object.keys(chatImages).map(key => {
            const randomNumberMinMax = (min, max) => {
              var result = Math.random() * max + min;
              return result;
            };

            return (
              <ParallaxLayer
                offset={randomNumberMinMax(0.5, 2.5)}
                speed={randomNumberMinMax(0.5, 2)}
                key={key}
              >
                <img
                  src={chatImages[key]}
                  className="parallaxImages"
                  style={{
                    top: randomNumberMinMax(window.innerHeight/2, window.innerHeight + (window.innerHeight/2)),
                    left: randomNumberMinMax(10, window.innerWidth - 10),
                  }}
                />
              </ParallaxLayer>
            );
          })
        ) : (
          <></>
        )}

        {/* PARALLAX CONTENT */}
        {/* WELCOME CONTENT */}
        <ParallaxLayer
          offset={0}
          speed={0.1}
          onClick={() => parallax.current.scrollTo(1)}
          className="parallaxLayer"
        >
          <div className="container">
            <Welcome
              chatName={chatName}
              chatMessageCount={chatData.chatMessageCount}
            />
            <WelcomeDetails
              chatMessageDuration={chatData.chatMessageDuration}
            />
          </div>
        </ParallaxLayer>

        {/* PARTICIPANTS CONTENT */}
        <ParallaxLayer offset={1} speed={1} className="parallaxLayer">
          <div className="container">
            <Participants
              chatMessageCount={chatData.chatMessageCount}
              chatParticipantCount={chatData.chatParticipantCount}
            />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1.22} speed={1} className="parallaxLayer">
          <div className="container">
            <ParticipantMessagingDetails
              chatFirstMessageDate={chatData.chatFirstMessageDate}
              chatAvgWeeklyMessages={chatData.chatAvgWeeklyMessages}
              chatLongestDayStreak={chatData.chatLongestDayStreak}
            />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1.6} speed={0.8} className="parallaxLayer">
          <div className="container">
            <ParticipantMessagingCount
              chatMostActiveUser={chatData.chatMostActiveUser}
              chatLeastActiveUser={chatData.chatLeastActiveUser}
              chatTopEmoji={chatData.chatTopEmoji}
              chatUserMessageCountGraphData={
                chatData.chatUserMessageCountGraphData
              }
            />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1.99} speed={0.4} className="parallaxLayer">
          <div className="container">
            <ParticipantMessagingTimeline
              chatTextingTime={chatData.chatTextingTime}
              chatNightowlUser={chatData.chatNightowlUser}
              chatEarlybirdUser={chatData.chatEarlybirdUser}
              chatUserMessagingTrendsByTime={
                chatData.chatUserMessagingTrendsByTime
              }
            />
          </div>
        </ParallaxLayer>

        {/* ADDITIONAL CONTENT */}
        <ParallaxLayer offset={2.3} speed={1.8} className="parallaxLayer">
          <div className="container">
            <AdditionalInformation
              chatAvgDailyMessages={chatData.chatAvgDailyMessages}
              chatAvgDailyMessagesNote={chatData.chatAvgDailyMessagesNote}
            />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={2.52} speed={1.8} className="parallaxLayer">
          <div className="container">
            <AdditionalInformationDetails
              chatImagesCount={chatData.chatImagesCount}
              chatTopLinkAddress={chatData.chatTopLinkAddress}
              chatTopDay={chatData.chatTopDay}
            />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={2.999} speed={0.8} className="parallaxLayer">
          <div className="container">
            <AdditionalInformationSummary
              chatTopLinksSummary={chatData.chatTopLinksSummary}
              chatDayRadar={chatData.chatDayRadar}
              chatLogFullTimeline={chatData.chatLogFullTimeline}
            />
          </div>
        </ParallaxLayer>

        {/* SHARING CONTENT */}
        <ParallaxLayer offset={3.2} speed={1} className="parallaxLayer">
          <div className="container">
            <Sharing
              chatName={chatName}
              chatFirstMessageDate={chatData.chatFirstMessageDate}
              chatMessageCount={chatData.chatMessageCount}
              chatImagesCount={chatData.chatImagesCount}
              chatAvgDailyMessages={chatData.chatAvgDailyMessages}
              chatTopLinkAddress={chatData.chatTopLinkAddress}
              chatTextingTime={chatData.chatTextingTime}
              chatLongestDayStreak={chatData.chatLongestDayStreak}
            />
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default Showcase;
