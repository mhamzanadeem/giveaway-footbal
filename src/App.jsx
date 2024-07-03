import React, { useState, useEffect } from "react";
import { Stage, Layer, Line, Group, Image as KonvaImage } from "react-konva";
import useImage from "use-image";

const App = () => {
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
      setImageDimensions({ width: 500, height: 500 });
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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
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
      {image && (
        <Stage
          width={imageDimensions.width}
          height={imageDimensions.height}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{
            border: "1px solid black",
            cursor: "crosshair",
          }}
        >
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
                  points={[startPoint.x, startPoint.y, endPoint.x, endPoint.y]}
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
                  x={-magnifierPosition.x * magnifierScale + magnifierSize / 2}
                  y={-magnifierPosition.y * magnifierScale + magnifierSize / 2}
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
              </Group>
            )}
          </Layer>
        </Stage>
      )}
    </div>
  );
};

export default App;
