import React, { useRef } from 'react';
import Anime, { anime } from 'react-anime';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

import Welcome from '../components/showcase/welcome';
import WelcomeDetails from '../components/showcase/welcomeDetails';
import Participants from '../components/showcase/participants';
import ParticipantMessagingDetails from '../components/showcase/participantMessagingDetails';
import ParticipantMessagingCount from '../components/showcase/participantMessagingCount';

import '../styles/style.scss';

const url = (name, wrap = false) =>
  `${
    wrap ? 'url(' : ''
  }https://awv3node-homepage.surge.sh/build/assets/${name}.svg${
    wrap ? ')' : ''
  }`;

const IndexPage = () => {
  const chatName = 'Riya Banerjee';
  const chatMessageCount = 4928;

  console.log(chatName.length);
  const parallaxOffset = chatName.length < 40 ? 0.7 : 0.7;

  const parallax = useRef();
  return (
    <div
      className="showcase"
      style={{ width: '100%', height: '100%', background: '#253237' }}
    >
      <Parallax ref={parallax} pages={3}>
        <ParallaxLayer
          offset={0}
          speed={1}
          factor={4.05}
          style={{ backgroundColor: '#50D927' }}
        />
        <ParallaxLayer
          offset={3.75}
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

        <ParallaxLayer
          offset={0}
          speed={0.1}
          onClick={() => parallax.current.scrollTo(1)}
          className="parallaxWelcomeLayer"
        >
          <div className="container">
            <Welcome chatName={chatName} chatMessageCount={chatMessageCount} />
            <WelcomeDetails
              chatName={chatName}
              chatMessageCount={chatMessageCount}
            />
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={1}
          className="parallaxWelcomeLayer"
        >
          <div className="container">
            <Participants />
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1.22}
          speed={1}
          className="parallaxWelcomeLayer"
        >
          <div className="container">
            <ParticipantMessagingDetails />
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1.80}
          speed={0.8}
          className="parallaxWelcomeLayer"
        >
          <div className="container">
            <ParticipantMessagingCount />
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default IndexPage;
