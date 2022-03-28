import React from 'react';
import Anime, { anime } from 'react-anime';
import AnimatedGIF from '../../../src/images/981-consultation-outline.gif';

const Welcome = ({ chatName: chatName, chatLogParsed: chatLogParsed, chatImages: chatImages }) => {

    let chatMessageCountReaction = "That's a lot!";

  return (
    <>
      <div className="container welcome">
        <div className="columns">
            <div className="column">
                <div style={{marginTop: -100, paddingBottom: 100}}>
                    <Anime 
                        easing="easeOutExpo" 
                        duration={1500} 
                        direction="normal"
                        loop="false"
                        translateY={100}
                        opacity={[0, 1]} 
                    >
                        <h2>Conversations With</h2>
                    </Anime>
                </div>
                <div style={{marginLeft: 1000, width: '80%'}}>
                    <Anime 
                        easing="easeOutExpo" 
                        duration={1500} 
                        direction="normal"
                        loop="false"
                        translateX={-1000}
                        delay={1000}
                        opacity={[0, 1]} 
                    >
                        <h1>{chatName}</h1>
                    </Anime>
                </div>
            </div>
        </div>
        <div className="columns">
            <div className="column">
                <Anime 
                        duration={1000} 
                        loop="false"
                        delay={2000}
                        opacity={[0, 1]} 
                        easing="linear"
                        width={210}
                    >
                        <div style={{backgroundColor: '#4a4a4a', marginTop: '12px', height: '7px', width: '100%'}}/>
                        </Anime>
            </div>
            <div className="column is-two-thirds">
                <Anime 
                        duration={1000} 
                        loop="false"
                        delay={2000}
                        opacity={[0, 1]} 
                        easing="linear"
                        translateX={-150}
                    >
                <p>20,391 messages were sent between you. </p>
                </Anime>
                <Anime 
                        duration={500} 
                        loop="false"
                        delay={2500}
                        opacity={[0, 1]} 
                        easing="linear"
                        translateX={-150}
                    >
                <p>{chatMessageCountReaction}</p>
                </Anime>
                <Anime 
                        duration={2500} 
                        loop="false"
                        delay={3000}
                        opacity={[0, 1]} 
                    >
                <object type="image/gif" data={AnimatedGIF}>svg-animation</object>
                </Anime>
            </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
