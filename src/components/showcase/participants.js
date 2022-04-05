import React from 'react';

const Participants = ({
  chatMessageCount: chatMessageCount,
  chatParticipantCount: chatParticipantCount,
}) => {
  chatMessageCount = chatMessageCount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return (
    <>
      <div className="whiteBanner">
        <div className="columns">
          <div className="column">
            <div>
              <h2>
                We found {chatMessageCount} messages between the{' '}
                {chatParticipantCount} of you.
              </h2>
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
