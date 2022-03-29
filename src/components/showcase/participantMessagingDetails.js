import React from 'react';
import Anime, { anime } from 'react-anime';

const ParticipantMessagingDetails = () => {

  return (
    <>
        <div className="whiteDetailsBanner">
          <div className="columns">
            <div className="column is-one-third">
              <p>
                <small>You started talking on</small><br/>
                September 27th, 2021
              </p>
            </div>
            <div className="column is-one-third">
              <p>
                <small>Since then, you've sent each other</small><br/>
                203 messages a week
              </p>
            </div>
            <div className="column is-one-third">
              <p>
                <small>Your longest messaging streak is</small><br/>
                21 days
              </p>
            </div>
          </div>
        </div>
    </>
  );
};

export default ParticipantMessagingDetails;
