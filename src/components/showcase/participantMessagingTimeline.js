import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
      text: 'Messaging Trends',
    },
  },
};

const ParticipantMessagingTimeline = ({
  chatTextingTime: chatTextingTime,
  chatNightowlUser: chatNightowlUser,
  chatEarlybirdUser: chatEarlybirdUser,
  chatUserMessagingTrendsByTime: chatUserMessagingTrendsByTime,
}) => {
  return (
    <>
      <div className="whiteDetailsBanner">
        <div className="columns">
          <div className="column">
            <p>
              <small>You seem to prefer texting</small>
              <br />
              {chatTextingTime}
            </p>
            <br />
            <p>
              <small>The nightowl seems to be</small>
              <br />
              {chatNightowlUser} 🦉
            </p>
            <br />
            <p>
              <small>The early bird seems to be</small>
              <br />
              {chatEarlybirdUser} 🐓
            </p>
            <br />
          </div>
          <div className="column">
            <Bar
              options={options}
              data={chatUserMessagingTrendsByTime}
              height={150}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ParticipantMessagingTimeline;
