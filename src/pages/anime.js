import React, { useRef } from 'react';
import Anime, { anime } from 'react-anime';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

import Welcome from '../components/showcase/welcome';
import WelcomeDetails from '../components/showcase/welcomeDetails';
import Participants from '../components/showcase/participants';
import ParticipantMessagingDetails from '../components/showcase/participantMessagingDetails';
import ParticipantMessagingCount from '../components/showcase/participantMessagingCount';
import ParticipantMessagingTimeline from '../components/showcase/participantMessagingTimeline';
import AdditionalInformation from '../components/showcase/additionalInformation';

import '../styles/style.scss';

const IndexPage = () => {
  const chatName = 'Riya Banerjee';
  const chatMessageCount = 4928;

  const parallax = useRef();

  const chatUserMessageCountGraphData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
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
        borderWidth: 1,
      },
    ],
  };

  const chatUserMessagingTrendsByTime = {
    labels: [
      '00:00 - 06:00',
      '06:00 - 12:00',
      '12:00 - 18:00',
      '18:00 - 00:00',
    ],
    datasets: [
      {
        label: 'Dataset 1',
        data: [100, 120, 140, 292, 129, 1202, 1292],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: [100, 120, 140, 292, 129, 1202, 1292],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div
      className="showcase"
      style={{ width: '100%', height: '100%', background: '#253237' }}
    >
      {/* PARALLAX BACKGROUNDS */}
      <Parallax ref={parallax} pages={4}>
        <ParallaxLayer
          offset={3}
          speed={1}
          factor={2}
          style={{ backgroundColor: 'blue' }}
        />
        <ParallaxLayer
          offset={2}
          speed={1}
          factor={2}
          style={{ backgroundColor: 'pink' }}
        />
        <ParallaxLayer
          offset={0}
          speed={1}
          factor={2}
          style={{ backgroundColor: '#6EF0D1' }}
        />
        <ParallaxLayer
          offset={1}
          speed={1}
          factor={2.75}
          style={{ backgroundColor: '#6EF0D1' }}
        />
        <ParallaxLayer
          offset={0}
          speed={1}
          factor={1}
          style={{ backgroundColor: 'white' }}
        />

        {/* PARALLAX IMAGES */}
        <ParallaxLayer offset={1} speed={1}>
          <div
            style={{
              width: 50,
              height: 100,
              backgroundColor: 'purple',
              position: 'relative',
              left: 100,
              top: '-100%',
            }}
          ></div>
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.4}>
          <div
            style={{
              width: 50,
              height: 100,
              backgroundColor: 'purple',
              position: 'relative',
              left: 120,
              top: 120,
            }}
          ></div>
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={1.3}>
          <div
            style={{
              width: 50,
              height: 100,
              backgroundColor: 'purple',
              position: 'relative',
              left: 300,
            }}
          ></div>
        </ParallaxLayer>

        {/* PARALLAX CONTENT */}
        {/* WELCOME CONTENT */}
        <ParallaxLayer
          offset={0}
          speed={0.1}
          onClick={() => parallax.current.scrollTo(1)}
          className="parallaxLayer"
        >
          <div className="container">
            <Welcome chatName={chatName} chatMessageCount={chatMessageCount} />
            <WelcomeDetails chatMessageDuration={'127 days'} />
          </div>
        </ParallaxLayer>

        {/* PARTICIPANTS CONTENT */}
        <ParallaxLayer offset={1} speed={1} className="parallaxLayer">
          <div className="container">
            <Participants
              chatMessageCount={chatMessageCount}
              chatParticipantCount="three"
            />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1.22} speed={1} className="parallaxLayer">
          <div className="container">
            <ParticipantMessagingDetails
              chatFirstMessageDate="September 10, 2021"
              chatAvgWeeklyMessages="128"
              chatLongestDayStreak="31"
            />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1.6} speed={0.8} className="parallaxLayer">
          <div className="container">
            <ParticipantMessagingCount
              chatMostActiveUser="Bob"
              chatConversationStarter="Alice"
              chatTopEmoji="😂🥲🤷🏻‍♂️😤"
              chatUserMessageCountGraphData={chatUserMessageCountGraphData}
            />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1.99} speed={0.4} className="parallaxLayer">
          <div className="container">
            <ParticipantMessagingTimeline
              chatTextingTime="late at night"
              chatNightowlUser="Alice"
              chatEarlybirdUser="Janice"
              chatUserMessagingTrendsByTime={chatUserMessagingTrendsByTime}
            />
          </div>
        </ParallaxLayer>

        {/* ADDITIONAL CONTENT */}
        <ParallaxLayer offset={2.5} speed={1.8} className="parallaxLayer">
          <div className="container">
            <AdditionalInformation
              chatAvgDailyMessages={129}
              chatAvgDailyMessagesNote="Have you tried calling?"
            />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={3.22} speed={1} className="parallaxLayer">
          <div className="container">
            <ParticipantMessagingDetails
              chatFirstMessageDate="September 10, 2021"
              chatAvgWeeklyMessages="128"
              chatLongestDayStreak="31"
            />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={3.6} speed={0.8} className="parallaxLayer">
          <div className="container">
            <ParticipantMessagingCount
              chatMostActiveUser="Bob"
              chatConversationStarter="Alice"
              chatTopEmoji="😂🥲🤷🏻‍♂️😤"
              chatUserMessageCountGraphData={chatUserMessageCountGraphData}
            />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={3.99} speed={0.4} className="parallaxLayer">
          <div className="container">
            <ParticipantMessagingTimeline
              chatTextingTime="late at night"
              chatNightowlUser="Alice"
              chatEarlybirdUser="Janice"
              chatUserMessagingTrendsByTime={chatUserMessagingTrendsByTime}
            />
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default IndexPage;
