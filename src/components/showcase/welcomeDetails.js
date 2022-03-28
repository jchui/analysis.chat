import React from 'react';
import Anime, { anime } from 'react-anime';

const WelcomeDetails = ({
  chatMessageDuration: chatMessageDuration,
  chatImagesCountSummary: chatImagesCountSummary,
}) => {
  chatMessageDuration = "You've been talking for 47 days.";
  chatImagesCountSummary = 'Over hundreds of images have been shared.';
  var chatPlaceholder = '<chatPlaceholder>';

  return (
    <>
      <Anime duration={3500} loop="false" delay={3000} opacity={[0, 1]}>
        <div className="welcomeDetails">
          <div className="columns">
            <div className="column is-one-third">
              <p>
                <small>{chatMessageDuration}</small>
              </p>
            </div>
            <div className="column is-one-third">
              <p>
                <small>{chatImagesCountSummary}</small>
              </p>
            </div>
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
