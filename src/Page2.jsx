import React, { useState, useEffect } from "react";
import {
  Stage,
  Layer,
  Line,
  Group,
  Text,
  Shape,
  Circle,
  Rect,
  Image as KonvaImage,
} from "react-konva";
import useImage from "use-image";

const Page2 = () => {
  const [image] = useImage("test.jpg");
  const [image1] = useImage("../src/assets/blackArrow.png");
  const [image2] = useImage("../src/assets/greenArrow.png");
  const [image3] = useImage("../src/assets/firerings.png");
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    if (image) {
      setImageDimensions({ width: 700, height: 650 });
    }
  }, [image]);
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          height: "90vh",
        }}
      >
        {image1 && (
          <Stage width={imageDimensions.width} height={imageDimensions.height}>
            <Layer>
              <Group
                clipFunc={(ctx) =>
                  ctx.rect(0, 0, imageDimensions.width, imageDimensions.height)
                }
              >
                <KonvaImage
                  image={image}
                  width={imageDimensions.width}
                  height={imageDimensions.height}
                />

                <KonvaImage
                  image={image2}
                  width={imageDimensions.width}
                  height={imageDimensions.height}
                  y={50}
                />
                <KonvaImage
                  image={image3}
                  width={imageDimensions.width}
                  height={imageDimensions.height}
                />
                <KonvaImage
                  image={image1}
                  width={imageDimensions.width}
                  height={imageDimensions.height}
                />
                {/* Adding 4 circles */}
                {/* <Circle x={150} y={150} radius={130} fill="white" />
                <Circle x={150} y={150} radius={100} fill="black" />
                <Circle x={150} y={150} radius={60} fill="blue" />
                <Circle x={150} y={150} radius={20} fill="red" />
                <Circle x={150} y={150} radius={10} fill="orange" />
                <Line
                  points={[130, 150, 170, 150]} // Horizontal line
                  stroke="black"
                  strokeWidth={2}
                  lineCap="round"
                />
                <Line
                  points={[150, 130, 150, 170]} // Vertical line
                  stroke="black"
                  strokeWidth={2}
                  lineCap="round"
                /> */}
              </Group>
            </Layer>
          </Stage>
        )}
      </div>
    </div>
  );
};

export default Page2;
