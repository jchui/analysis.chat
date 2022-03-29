import React, { useEffect, useRef } from 'react';
import {
  Stage,
  Layer,
  Rect,
  Text,
  Circle,
  Line,
} from 'react-konva/lib/ReactKonvaCore';
import 'konva/lib/shapes/Rect';
import 'konva/lib/shapes/Text';
import 'konva/lib/shapes/Circle';
import 'konva/lib/shapes/Line';
import canvasToImage from 'canvas-to-image';

const Sharing = ({
  chatMessageCount: chatMessageCount,
  chatParticipantCount: chatParticipantCount,
}) => {
  const sharingCanvasRef = useRef(null);

  useEffect(() => {
    sharingCanvasRef.current.getCanvas()._canvas.id = 'sharingCanvas';
  }, []);

  const downloadCanvasImage = () => {
    canvasToImage('sharingCanvas', { 
        name: 'analysis.chat Summary',
        type: 'png',
        quality: 1
      });
  }

  return (
    <>
      <div className="whiteBanner">
        <div className="columns">
          <div className="column">
            <div>
              <h2>And that's it for now!</h2>
              <p>Here is an image you can share:</p>
            </div>
          </div>
          <div className="column">
            <div>
                <a onClick={downloadCanvasImage}><div className="downloadHover"></div></a>
              <Stage width={400} height={400}>
                <Layer ref={sharingCanvasRef}>
                  <Rect width={400} height={400} fill="#FFD23F" />
                  <Circle radius={20} x={50} y={350} fill="#FFF" />
                  <Circle radius={20} x={350} y={350} fill="#FFF" />
                  <Rect width={300} height={40} x={50} y={330} fill="#FFF" />
                  <Text
                    text="analysis.chat"
                    fontSize={18}
                    fontVariant={600}
                    fontFamily={'Poppins'}
                    x={140}
                    y={343}
                  />
                  <Circle x={200} y={100} radius={50} fill="green" />
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
