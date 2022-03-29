import React from 'react';
import Anime, { anime } from 'react-anime';

const WelcomeDetails = ({ chatMessageDuration: chatMessageDuration }) => {
  var chatPlaceholder = 'Scroll down to find out more!';

  return (
    <>
      <Anime duration={3500} loop="false" delay={3000} opacity={[0, 1]}>
        <div className="welcomeDetails">
          <div className="columns">
            <div className="column is-one-third">
              <p>
                <small>You've been talking for {chatMessageDuration}.</small>
              </p>
            </div>
            <div className="column is-one-third"></div>
            <div className="column is-one-third">
              <p>
                <small>{chatPlaceholder}</small>
              </p>
            </div>
          </div>
        </div>
      </Anime>
    </>
  );
};

export default WelcomeDetails;
