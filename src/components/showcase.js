import React from 'react';

function Showcase(data) {
  const { chatLogData } = data;

  console.log(chatLogData);

  return (
    <div className="showcase">
      <code>{chatLogData.chatName}</code>

      <br />

      <code>{JSON.stringify(chatLogData.data)}</code>
    </div>
  );
}

export default Showcase;
