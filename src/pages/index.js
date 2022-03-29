import * as React from 'react';
import { useRef, useState } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

import '../styles/style.scss';

import Layout from '../components/layout';
import Introduction from '../components/showcase/introduction';
import DragDrop from '../components/showcase/dragdrop';
import Welcome from '../components/showcase/welcome';
import WelcomeDetails from '../components/showcase/welcomeDetails';

const IndexPage = () => {
  // VARIABLES
  const [chatDataCheck, setChatDataCheck] = useState(false);
  const [chatData, setChatData] = useState({
    chatMessageCount: null,
  });
  const [chatName, setChatName] = useState();

  const parallax = useRef();

  // FUNCTIONS
  const getChatLogParsedFromChild = val => {
    processChatLogData(val);
  };

  const getChatImagesFromChild = val => {
    // Process Images
  };

  const getChatNameFromChild = val => {
    console.log(val);
    setChatName(val);
    processChatName(val);
  };

  const processChatLogData = chatLog => {
    // Check to ensure chat logs are suitable for processing
    chatLog.length > 1 ? setChatDataCheck(true) : setChatDataCheck(false);

    // Set chatMessageCount
    setChatData({ chatMessageCount: chatLog.length });
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
            <div
              className="showcase"
              style={{ width: '100%', height: '100%', background: '#253237' }}
            >
              <Parallax ref={parallax} pages={3}>
                <ParallaxLayer
                  offset={0}
                  speed={1}
                  factor={2.75}
                  style={{ backgroundColor: 'blue' }}
                />
                <ParallaxLayer
                  offset={1.75}
                  speed={1}
                  factor={2.75}
                  style={{ backgroundColor: 'green' }}
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
                    <Welcome
                      chatName={chatName}
                      chatMessageCount={chatData.chatMessageCount}
                    />
                    <WelcomeDetails
                      chatName={chatName}
                      chatMessageCount={chatData.chatMessageCount}
                    />
                  </div>
                </ParallaxLayer>

                <ParallaxLayer
                  offset={2}
                  speed={-0}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onClick={() => parallax.current.scrollTo(0)}
                >
                  Rawr
                </ParallaxLayer>
              </Parallax>
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

export default IndexPage;
