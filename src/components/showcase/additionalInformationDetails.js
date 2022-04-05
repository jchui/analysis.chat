import React from 'react';

const AdditionalInformationDetails = ({
  chatImagesCount: chatImagesCount,
  chatTopLinkAddress: chatTopLinkAddress,
  chatTopDay: chatTopDay,
}) => {
  chatImagesCount = chatImagesCount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return (
    <>
      <div className="whiteDetailsBanner">
        <div className="columns">
          <div className="column is-one-third">
            <p>
              <small>This includes a total of</small>
              <br />
              {chatImagesCount} images
            </p>
          </div>
          <div className="column is-one-third">
            <p>
              <small>You like sharing links from</small>
              <br />
              {chatTopLinkAddress}
            </p>
          </div>
          <div className="column is-one-third">
            <p>
              <small>Your chattiest day seems to be</small>
              <br />
              {chatTopDay}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdditionalInformationDetails;
