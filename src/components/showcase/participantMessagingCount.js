import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  maintainAspectRatio: false,
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Messages by User',
    },
  },
};

const ParticipantMessagingCount = ({
  chatMostActiveUser: chatMostActiveUser,
  chatConversationStarter: chatConversationStarter,
  chatTopEmoji: chatTopEmoji,
  chatUserMessageCountGraphData: chatUserMessageCountGraphData,
}) => {
  return (
    <>
      <div className="whiteDetailsBanner">
        <div className="columns">
          <div className="column">
            <p>
              <small>The most active texter is</small>
              <br />
              {chatMostActiveUser}
            </p>
            <br />
            <p>
              <small>The who usually starts a conversation is</small>
              <br />
              {chatConversationStarter}
            </p>
            <br />
            <p>
              <small>The most used emojis in this chat are</small>
              <br />
              {chatTopEmoji}
            </p>
            <br />
          </div>
          <div className="column">
            <Pie
              data={chatUserMessageCountGraphData}
              height={150}
              options={options}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ParticipantMessagingCount;
