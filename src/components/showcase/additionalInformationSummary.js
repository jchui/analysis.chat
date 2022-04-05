import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Radar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

export const chatLogFullTimelineOptions = {
  maintainAspectRatio: false,
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
      text: 'Messages by Time of Day',
    },
  },
};

export const chatTopLinksSummaryOptions = {
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
      text: 'Top Shared Links',
    },
  },
};

export const chatDayRadarOptions = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Average Messages per Day',
    },
  },
};

const ParticipantMessagingTimeline = ({
  chatTopLinksSummary: chatTopLinksSummary,
  chatDayRadar: chatDayRadar,
  chatLogFullTimeline: chatLogFullTimeline,
}) => {
  return (
    <>
      <div className="whiteDetailsBanner">
        <div className="columns">
          <div className="column">
            <Bar
              options={chatLogFullTimelineOptions}
              data={chatLogFullTimeline}
              height={250}
            />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <Radar
              data={chatDayRadar}
              options={chatDayRadarOptions}
              height={300}
            />
          </div>
          <div className="column">
            <Bar
              options={chatTopLinksSummaryOptions}
              data={chatTopLinksSummary}
              height={300}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ParticipantMessagingTimeline;
