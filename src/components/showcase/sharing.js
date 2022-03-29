import React, { useEffect, useRef } from 'react';
import {
  Stage,
  Layer,
  Rect,
  Text,
  Circle,
} from 'react-konva/lib/ReactKonvaCore';
import 'konva/lib/shapes/Rect';
import 'konva/lib/shapes/Text';
import 'konva/lib/shapes/Circle';
import 'konva/lib/shapes/Line';
import canvasToImage from 'canvas-to-image';

const Sharing = ({
  chatName: chatName,
  chatFirstMessageDate: chatFirstMessageDate,
  chatMessageCount: chatMessageCount,
  chatImagesCount: chatImagesCount,
  chatAvgDailyMessages: chatAvgDailyMessages,
  chatTopLinkAddress: chatTopLinkAddress,
  chatTextingTime: chatTextingTime,
  chatLongestDayStreak: chatLongestDayStreak,
}) => {
  const sharingCanvasRef = useRef(null);

  useEffect(() => {
    sharingCanvasRef.current.getCanvas()._canvas.id = 'sharingCanvas';
  }, []);

  const downloadCanvasImage = () => {
    canvasToImage('sharingCanvas', {
      name: 'analysis.chat Summary',
      type: 'png',
      quality: 1,
    });
  };

  chatMessageCount = chatMessageCount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  chatImagesCount = chatImagesCount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  chatAvgDailyMessages = chatAvgDailyMessages
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  chatLongestDayStreak = chatLongestDayStreak
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <>
      <div className="whiteBanner">
        <div className="columns">
          <div className="column is-half">
            <div>
              <h2>And that's it for now!</h2>
              <p>Here is an image you can share:</p>
              <p style={{ paddingTop: '260px' }}>
                <small>
                  Thanks for using this app!
                  <br />
                  <a
                    href="https://twitter.com/analysischat"
                    className="twitter"
                  >
                    @analysischat
                  </a>
                </small>
              </p>
            </div>
          </div>
          <div className="column"></div>
          <div className="column">
            <div>
              <a onClick={downloadCanvasImage}>
                <div className="downloadHover"></div>
              </a>
              <Stage width={400} height={400}>
                <Layer ref={sharingCanvasRef} className="sharingCanvas">
                  <Rect width={400} height={400} fill="#FFD23F" />

                  <Text
                    text="My conversation with"
                    fontSize={16}
                    fontVariant={600}
                    fontFamily={'Poppins'}
                    x={40}
                    y={30}
                  />

                  <Text
                    text={chatName}
                    fontSize={30}
                    fontVariant={700}
                    fontFamily={'Poppins'}
                    x={40}
                    y={55}
                  />

                  <Rect width={320} height={3} x={40} y={95} fill="#2e2e2e" />

                  <Text
                    text="since"
                    fontSize={16}
                    fontVariant={600}
                    fontFamily={'Poppins'}
                    x={40}
                    y={120}
                  />

                  <Text
                    text={chatFirstMessageDate}
                    fontSize={20}
                    fontVariant={700}
                    fontFamily={'Poppins'}
                    x={95}
                    y={117}
                  />

                  <Text
                    text={chatMessageCount}
                    fontSize={20}
                    fontVariant={700}
                    fontFamily={'Poppins'}
                    x={40}
                    y={185}
                  />

                  <Text
                    text="total messages"
                    fontSize={16}
                    fontVariant={600}
                    fontFamily={'Poppins'}
                    x={40}
                    y={160}
                  />

                  <Text
                    text={chatImagesCount}
                    fontSize={20}
                    fontVariant={700}
                    fontFamily={'Poppins'}
                    x={210}
                    y={185}
                  />

                  <Text
                    text="total images"
                    fontSize={16}
                    fontVariant={600}
                    fontFamily={'Poppins'}
                    x={210}
                    y={160}
                  />

                  <Text
                    text={chatAvgDailyMessages}
                    fontSize={20}
                    fontVariant={700}
                    fontFamily={'Poppins'}
                    x={40}
                    y={245}
                  />

                  <Text
                    text="daily messages"
                    fontSize={16}
                    fontVariant={600}
                    fontFamily={'Poppins'}
                    x={40}
                    y={220}
                  />

                  <Text
                    text={chatTopLinkAddress}
                    fontSize={20}
                    fontVariant={700}
                    fontFamily={'Poppins'}
                    x={210}
                    y={245}
                  />

                  <Text
                    text="most shared link"
                    fontSize={16}
                    fontVariant={600}
                    fontFamily={'Poppins'}
                    x={210}
                    y={220}
                  />

                  <Text
                    text={chatTextingTime}
                    fontSize={20}
                    fontVariant={700}
                    fontFamily={'Poppins'}
                    x={40}
                    y={305}
                  />

                  <Text
                    text="most talkative"
                    fontSize={16}
                    fontVariant={600}
                    fontFamily={'Poppins'}
                    x={40}
                    y={280}
                  />

                  <Text
                    text={chatLongestDayStreak + ' days'}
                    fontSize={20}
                    fontVariant={700}
                    fontFamily={'Poppins'}
                    x={210}
                    y={305}
                  />

                  <Text
                    text="longest chat streak"
                    fontSize={16}
                    fontVariant={600}
                    fontFamily={'Poppins'}
                    x={210}
                    y={280}
                  />

                  <Circle radius={20} x={50} y={360} fill="#FFF" />
                  <Circle radius={20} x={350} y={360} fill="#FFF" />
                  <Rect width={300} height={40} x={50} y={340} fill="#FFF" />
                  <Text
                    text="analysis.chat"
                    fontSize={18}
                    fontVariant={600}
                    fontFamily={'Poppins'}
                    x={140}
                    y={353}
                  />
                </Layer>
              </Stage>
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

export default Sharing;
