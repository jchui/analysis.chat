import React from 'react';

function Showcase(data) {
  const { chatLogData } = data;

  return (
    <>
      <p>{chatLogData.chatName}</p>
    </>
  );
}

export default Showcase;
