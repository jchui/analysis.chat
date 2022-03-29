import React from 'react';

const additionalInformation = ({
  chatAvgDailyMessages: chatAvgDailyMessages,
  chatAvgDailyMessagesNote: chatAvgDailyMessagesNote,
}) => {
  chatAvgDailyMessages = chatAvgDailyMessages
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return (
    <>
      <div className="whiteBanner">
        <div className="columns">
          <div className="column">
            <div>
              <h2>
                On average, you send {chatAvgDailyMessages} messages a day.
              </h2>
              <p>{chatAvgDailyMessagesNote}</p>
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

export default additionalInformation;
