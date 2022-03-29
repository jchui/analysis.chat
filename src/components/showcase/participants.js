import React from 'react';
import Anime, { anime } from 'react-anime';
import AnimatedGIF from '../../../src/images/981-consultation-outline.gif';

const Participants = () => {


  return (
    <>
      <div className="whiteBanner">
        <div className="columns">
          <div className="column">
            <div>
                <h2>We found 5,192 messages between the two of you.</h2>
                <p>Who do you think messaged more?</p>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
              <div className="highlightTab" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Participants;
