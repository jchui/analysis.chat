import React, { useRef } from 'react';
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
  chatData: chatData
}) => {
    // Variables
    const parallax = useRef();

    console.log(chatData);

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
            <Welcome chatName={chatName} chatMessageCount={chatData.chatMessageCount} />
            <WelcomeDetails chatMessageDuration={chatData.chatMessageDuration} />
          </div>
        </ParallaxLayer>

      </Parallax>
    </div>
  );
};

export default Showcase;
