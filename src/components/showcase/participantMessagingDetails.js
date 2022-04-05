import React from 'react';

const ParticipantMessagingDetails = ({
  chatFirstMessageDate: chatFirstMessageDate,
  chatAvgWeeklyMessages: chatAvgWeeklyMessages,
  chatLongestDayStreak: chatLongestDayStreak,
}) => {
  return (
    <>
      <div className="whiteDetailsBanner">
        <div className="columns">
          <div className="column is-one-third">
            <p>
              <small>You started talking on</small>
              <br />
              {chatFirstMessageDate}
            </p>
          </div>
          <div className="column is-one-third">
            <p>
              <small>Since then, you've sent each other</small>
              <br />
              {chatAvgWeeklyMessages} messages a week
            </p>
          </div>
          <div className="column is-one-third">
            <p>
              <small>Your longest messaging streak is</small>
              <br />
              {chatLongestDayStreak} days
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParticipantMessagingDetails;
