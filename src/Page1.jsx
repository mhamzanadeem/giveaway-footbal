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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

const Page1 = () => {
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [lines, setLines] = useState([]);
  const [plusSign, setPlusSign] = useState(null);
  const [image] = useImage("test.jpg");
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [magnifierPosition, setMagnifierPosition] = useState({
    x: 250,
    y: 250,
  });
  const [tool, setTool] = useState("pen");

  useEffect(() => {
    if (image) {
      setImageDimensions({ width: 500, height: 505 });
    }
  }, [image]);

  const handleMouseDown = (e) => {
    const pos = e.target.getStage().getPointerPosition();
    if (tool === "pen") {
      setStartPoint(pos);
      setEndPoint(pos);
    } else if (tool === "plus") {
      setPlusSign(pos);
    }
  };

  const handleMouseMove = (e) => {
    const pos = e.target.getStage().getPointerPosition();
    setMagnifierPosition(pos);
    if (startPoint) {
      const angle = Math.atan2(pos.y - startPoint.y, pos.x - startPoint.x);
      const newEndPoint = {
        x: startPoint.x + 500 * Math.cos(angle),
        y: startPoint.y + 500 * Math.sin(angle),
      };
      setEndPoint(newEndPoint);
    }
  };

  const handleMouseUp = () => {
    if (startPoint && endPoint) {
      const newLine = {
        points: [startPoint.x, startPoint.y, endPoint.x, endPoint.y],
      };
      setLines([...lines, newLine]);
    }
    setStartPoint(null);
    setEndPoint(null);
  };

  const magnifierSize = 100;
  const magnifierScale = 2;

  const scalePoints = (points) =>
    points.map(
      (p, i) =>
        (i % 2 === 0 ? p - magnifierPosition.x : p - magnifierPosition.y) *
          magnifierScale +
        magnifierSize / 2
    );
  const history = useHistory();

  const handleButtonClick = () => {
    // Navigate to Page2
    history.push("/Page2");
  };

  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="pen">Pen</option>
        <option value="plus">Plus</option>
      </select>
      <div
        style={{
          marginTop: "10vh",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          height: "77vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Stage
            width={55}
            height={200}
            style={{
              border: "10px solid #CACACF",
              borderRadius: "10px 0px 0px 0px",
            }}
          >
            <Layer>
              <Rect x={0} y={0} width={75} height={200} fill="#CACACF" />
            </Layer>
            <Layer >
              {/* Hollow black circle */}
              <Circle
                x={25}
                y={20}
                radius={18}
                stroke="black"
                strokeWidth={1}
                fillEnabled={false}
              />
              <Text
                x={18}
                y={18}
                fontFamily="FontAwesome"
                text={"\uf015"}
                fill="black"
              />
              <Circle
                x={25}
                y={60}
                radius={18}
                stroke="black"
                strokeWidth={1}
                fillEnabled={false}
              />
              <Circle
                x={25}
                y={100}
                radius={18}
                stroke="black"
                strokeWidth={1}
                fillEnabled={false}
              />
              <Circle
                x={25}
                y={140}
                radius={18}
                stroke="black"
                strokeWidth={1}
                fillEnabled={false}
              />
              <Circle
                x={25}
                y={180}
                radius={18}
                stroke="black"
                strokeWidth={1}
                fillEnabled={false}
              />
            </Layer>
          </Stage>
          <Stage width={75} height={200}>
            <Layer>
              <Shape
                style={{ width: "75px" }}
                sceneFunc={(context, shape) => {
                  context.moveTo(0, 0); // Start from top-right corner
                  context.lineTo(75, 0); // Top-right corner moved to (100, 0)
                  context.lineTo(90, 100);
                  context.closePath();
                  // Konva specific method to fill the shape
                  context.fillStrokeShape(shape);
                }}
                fill="#CACACF" // Fill color of the triangle
              />
            </Layer>
          </Stage>
        </div>
        {image && (
          <Stage
            width={imageDimensions.width}
            height={imageDimensions.height}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{
              border: "10px solid #CACACF",
              borderRadius: "0px 10px 0px 10px",
            }}
          >
            <Layer
              onMouseEnter={() => {
                document.body.style.cursor = "crosshair";
              }}
              onMouseLeave={() => {
                document.body.style.cursor = "default";
              }}
            >
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
                {lines.map((line, i) => (
                  <Line
                    key={i}
                    points={line.points}
                    stroke="yellow"
                    strokeWidth={1}
                    lineCap="round"
                    lineJoin="round"
                  />
                ))}
                {startPoint && endPoint && (
                  <Line
                    points={[
                      startPoint.x,
                      startPoint.y,
                      endPoint.x,
                      endPoint.y,
                    ]}
                    stroke="yellow"
                    strokeWidth={2}
                    lineCap="round"
                    lineJoin="round"
                  />
                )}
                {plusSign && (
                  <>
                    <Line
                      points={[
                        plusSign.x - 15,
                        plusSign.y,
                        plusSign.x + 15,
                        plusSign.y,
                      ]}
                      stroke="blue"
                      strokeWidth={2}
                      lineCap="round"
                    />
                    <Line
                      points={[
                        plusSign.x,
                        plusSign.y - 15,
                        plusSign.x,
                        plusSign.y + 15,
                      ]}
                      stroke="blue"
                      strokeWidth={2}
                      lineCap="round"
                    />
                  </>
                )}
              </Group>

              {!startPoint && (
                <Group
                  x={magnifierPosition.x - magnifierSize / 2}
                  y={magnifierPosition.y - magnifierSize / 2}
                  clipFunc={(ctx) => {
                    ctx.arc(
                      magnifierSize / 2,
                      magnifierSize / 2,
                      magnifierSize / 2,
                      0,
                      Math.PI * 2
                    );
                  }}
                >
                  <KonvaImage
                    image={image}
                    x={
                      -magnifierPosition.x * magnifierScale + magnifierSize / 2
                    }
                    y={
                      -magnifierPosition.y * magnifierScale + magnifierSize / 2
                    }
                    width={imageDimensions.width * magnifierScale}
                    height={imageDimensions.height * magnifierScale}
                  />
                  {lines.map((line, i) => (
                    <Line
                      key={i}
                      points={scalePoints(line.points)}
                      stroke="yellow"
                      strokeWidth={1 * magnifierScale}
                      lineCap="round"
                      lineJoin="round"
                    />
                  ))}
                  {startPoint && endPoint && (
                    <Line
                      points={scalePoints([
                        startPoint.x,
                        startPoint.y,
                        endPoint.x,
                        endPoint.y,
                      ])}
                      stroke="yellow"
                      strokeWidth={2 * magnifierScale}
                      lineCap="round"
                      lineJoin="round"
                    />
                  )}

                  {plusSign && (
                    <>
                      <Line
                        points={scalePoints([
                          plusSign.x - 15,
                          plusSign.y,
                          plusSign.x + 15,
                          plusSign.y,
                        ])}
                        stroke="blue"
                        strokeWidth={2 * magnifierScale}
                        lineCap="round"
                      />
                      <Line
                        points={scalePoints([
                          plusSign.x,
                          plusSign.y - 15,
                          plusSign.x,
                          plusSign.y + 15,
                        ])}
                        stroke="blue"
                        strokeWidth={2 * magnifierScale}
                        lineCap="round"
                      />
                    </>
                  )}
                  <Text
                    x={magnifierSize / 2 - 30}
                    y={magnifierSize - 20}
                    text={`x: ${magnifierPosition.x.toFixed(
                      0
                    )}, y: ${magnifierPosition.y.toFixed(0)}`}
                    fontSize={10}
                    fill="yellow"
                  />
                </Group>
              )}
            </Layer>
            <Layer
              onMouseEnter={() => {
                document.body.style.cursor = "pointer";
              }}
              onMouseLeave={() => {
                document.body.style.cursor = "default";
              }}
            >
              <Rect
                x={190}
                y={450}
                width={150}
                height={40}
                fill="orange"
                cornerRadius={10}
                shadowBlur={10}
                onClick={handleButtonClick}
              />
              <Text
                x={210}
                y={460}
                text="TAP PHOTO"
                fontSize={18}
                fill="white"
                onClick={handleButtonClick}
              />
            </Layer>
          </Stage>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end", // Align items to the left side
            justifyContent: "flex-end", // Align content to the bottom
          }}
        >
          <Stage
            width={50}
            height={100}
            style={{
              border: "10px solid #CACACF",
              borderRadius: "0px 10px 10px 0px",
            }}
          >
            <Layer>
              <Rect x={0} y={0} width={50} height={100} fill="#CACACF" />
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
};

export default Page1;
