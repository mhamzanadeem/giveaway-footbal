// import React, { useState, useEffect } from "react";
// import {
//   Stage,
//   Layer,
//   Line,
//   Circle,
//   Group,
//   Image as KonvaImage,
// } from "react-konva";
// import useImage from "use-image";

// const App = () => {
//   const [startPoint, setStartPoint] = useState(null);
//   const [endPoint, setEndPoint] = useState(null);
//   const [lines, setLines] = useState([]);
//   const [intersection, setIntersection] = useState(null);
//   const [image] = useImage("../src/assets/test.jpg");
//   const [imageDimensions, setImageDimensions] = useState({
//     width: 0,
//     height: 0,
//   });
//   const [magnifierPosition, setMagnifierPosition] = useState({
//     x: 250,
//     y: 250,
//   });
//   const [tool, setTool] = useState("pen");

//   useEffect(() => {
//     console.log("lines: ", lines);
//   }, [lines]);

//   useEffect(() => {
//     if (image) {
//       setImageDimensions({ width: 500, height: 500 });
//     }
//   }, [image]);

//   const handleMouseDown = (e) => {
//     const pos = e.target.getStage().getPointerPosition();
//     if (tool === "pen") {
//       setStartPoint(pos);
//       setEndPoint(pos);
//     } else if (tool === "eraser") {
//       const updatedLines = lines.filter(
//         (line) => !isPointOnLine(line.points, pos)
//       );
//       setLines(updatedLines);
//     }
//   };

//   const handleMouseMove = (e) => {
//     // const pos = e.target.getStage().getPointerPosition();
//     // setMagnifierPosition(pos);
//     // if (startPoint) {
//     //   setEndPoint(pos);
//     //   console.log("setEndPoint: ", endPoint);
//     // }
//     const pos = e.target.getStage().getPointerPosition();
//     setMagnifierPosition(pos);
//     if (startPoint) {
//       const angle = Math.atan2(pos.y - startPoint.y, pos.x - startPoint.x);
//       const newEndPoint = {
//         x: startPoint.x + 500 * Math.cos(angle),
//         y: startPoint.y + 500 * Math.sin(angle),
//       };
//       setEndPoint(newEndPoint);
//     }
//   };

//   const handleMouseUp = () => {
//     if (startPoint && endPoint) {
//       const newLine = {
//         points: [startPoint.x, startPoint.y, endPoint.x, endPoint.y],
//       };
//       setLines([...lines, newLine]);
//       if (lines.length > 0) {
//         const intersect = getIntersection(
//           lines[lines.length - 1].points,
//           newLine.points
//         );
//         if (intersect) setIntersection(intersect);
//       }
//     }
//     setStartPoint(null);
//     setEndPoint(null);
//   };

//   const getIntersection = (line1, line2) => {
//     const [x1, y1, x2, y2] = line1;
//     const [x3, y3, x4, y4] = line2;

//     const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
//     if (denom === 0) return null; // Lines are parallel or coincident

//     const intersectX =
//       ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) /
//       denom;
//     const intersectY =
//       ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) /
//       denom;

//     return { x: intersectX, y: intersectY };
//   };

//   const magnifierSize = 50;
//   const magnifierScale = 2;

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         height: "100vh",
//       }}
//     >
//       <select
//         value={tool}
//         onChange={(e) => {
//           setTool(e.target.value);
//         }}
//       >
//         <option value="pen">Pen</option>
//         <option value="plus">Plus</option>
//       </select>
//       {image && (
//         <Stage
//           width={imageDimensions.width}
//           height={imageDimensions.height}
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//           style={{
//             border: "1px solid black",
//             cursor: tool === "pen" ? "crosshair" : "default",
//           }}
//         >
//           <Layer>
//             <Group
//               clipFunc={(ctx) =>
//                 ctx.rect(0, 0, imageDimensions.width, imageDimensions.height)
//               }
//             >
//               <KonvaImage
//                 image={image}
//                 width={imageDimensions.width}
//                 height={imageDimensions.height}
//               />
//               {lines.map((line, i) => (
//                 <Line
//                   key={i}
//                   points={line.points}
//                   stroke="yellow"
//                   strokeWidth={1}
//                   lineCap="round"
//                   lineJoin="round"
//                 />
//               ))}
//               {startPoint && endPoint && (
//                 <Line
//                   points={[startPoint.x, startPoint.y, endPoint.x, endPoint.y]}
//                   stroke="yellow"
//                   strokeWidth={2}
//                   lineCap="round"
//                   lineJoin="round"
//                 />
//               )}
//               {/* {intersection && (
//                 <>
//                   <Line
//                     points={[
//                       intersection.x - 15,
//                       intersection.y,
//                       intersection.x + 15,
//                       intersection.y,
//                     ]}
//                     stroke="blue"
//                     strokeWidth={2}
//                     lineCap="round"
//                   />
//                   <Line
//                     points={[
//                       intersection.x,
//                       intersection.y - 15,
//                       intersection.x,
//                       intersection.y + 15,
//                     ]}
//                     stroke="blue"
//                     strokeWidth={2}
//                     lineCap="round"
//                   />
//                 </>
//               )} */}
//             </Group>
//             {!startPoint && (
//               <Group
//                 x={magnifierPosition.x - magnifierSize / 2}
//                 y={magnifierPosition.y - magnifierSize / 2}
//                 clipFunc={(ctx) => {
//                   ctx.arc(
//                     magnifierSize / 2,
//                     magnifierSize / 2,
//                     magnifierSize / 2,
//                     0,
//                     Math.PI * 2
//                   );
//                 }}
//               >
//                 <KonvaImage
//                   image={image}
//                   x={-magnifierPosition.x * magnifierScale + magnifierSize / 2}
//                   y={-magnifierPosition.y * magnifierScale + magnifierSize / 2}
//                   width={imageDimensions.width * magnifierScale}
//                   height={imageDimensions.height * magnifierScale}
//                 />
//               </Group>
//             )}
//           </Layer>
//         </Stage>
//       )}
//     </div>
//   );
// };

// export default App;

// import React, { useState, useEffect } from "react";
// import { Stage, Layer, Line, Group, Image as KonvaImage } from "react-konva";
// import useImage from "use-image";

// const App = () => {
//   const [startPoint, setStartPoint] = useState(null);
//   const [endPoint, setEndPoint] = useState(null);
//   const [lines, setLines] = useState([]);
//   const [image] = useImage("../src/assets/test.jpg");
//   const [imageDimensions, setImageDimensions] = useState({
//     width: 0,
//     height: 0,
//   });
//   const [magnifierPosition, setMagnifierPosition] = useState({
//     x: 250,
//     y: 250,
//   });
//   const [tool, setTool] = useState("pen");

//   useEffect(() => {
//     if (image) {
//       setImageDimensions({ width: 500, height: 500 });
//     }
//   }, [image]);

//   const handleMouseDown = (e) => {
//     const pos = e.target.getStage().getPointerPosition();
//     if (tool === "pen") {
//       setStartPoint(pos);
//       setEndPoint(pos);
//     }
//   };

//   const handleMouseMove = (e) => {
//     const pos = e.target.getStage().getPointerPosition();
//     setMagnifierPosition(pos);
//     if (startPoint) {
//       const angle = Math.atan2(pos.y - startPoint.y, pos.x - startPoint.x);
//       const newEndPoint = {
//         x: startPoint.x + 500 * Math.cos(angle),
//         y: startPoint.y + 500 * Math.sin(angle),
//       };
//       setEndPoint(newEndPoint);
//     }
//   };

//   const handleMouseUp = () => {
//     if (startPoint && endPoint) {
//       const newLine = {
//         points: [startPoint.x, startPoint.y, endPoint.x, endPoint.y],
//       };
//       setLines([...lines, newLine]);
//     }
//     setStartPoint(null);
//     setEndPoint(null);
//   };

//   const magnifierSize = 100;
//   const magnifierScale = 2;

//   const scalePoints = (points) =>
//     points.map(
//       (p, i) =>
//         (i % 2 === 0 ? p - magnifierPosition.x : p - magnifierPosition.y) *
//           magnifierScale +
//         magnifierSize / 2
//     );

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         height: "100vh",
//       }}
//     >
//       <select
//         value={tool}
//         onChange={(e) => {
//           setTool(e.target.value);
//         }}
//       >
//         <option value="pen">Pen</option>
//         <option value="plus">Plus</option>
//       </select>
//       {image && (
//         <Stage
//           width={imageDimensions.width}
//           height={imageDimensions.height}
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//           style={{
//             border: "1px solid black",
//             cursor: "crosshair",
//           }}
//         >
//           <Layer>
//             <Group
//               clipFunc={(ctx) =>
//                 ctx.rect(0, 0, imageDimensions.width, imageDimensions.height)
//               }
//             >
//               <KonvaImage
//                 image={image}
//                 width={imageDimensions.width}
//                 height={imageDimensions.height}
//               />
//               {lines.map((line, i) => (
//                 <Line
//                   key={i}
//                   points={line.points}
//                   stroke="yellow"
//                   strokeWidth={1}
//                   lineCap="round"
//                   lineJoin="round"
//                 />
//               ))}
//               {startPoint && endPoint && (
//                 <Line
//                   points={[startPoint.x, startPoint.y, endPoint.x, endPoint.y]}
//                   stroke="yellow"
//                   strokeWidth={2}
//                   lineCap="round"
//                   lineJoin="round"
//                 />
//               )}
//             </Group>
//             {!startPoint && (
//               <Group
//                 x={magnifierPosition.x - magnifierSize / 2}
//                 y={magnifierPosition.y - magnifierSize / 2}
//                 clipFunc={(ctx) => {
//                   ctx.arc(
//                     magnifierSize / 2,
//                     magnifierSize / 2,
//                     magnifierSize / 2,
//                     0,
//                     Math.PI * 2
//                   );
//                 }}
//               >
//                 <KonvaImage
//                   image={image}
//                   x={-magnifierPosition.x * magnifierScale + magnifierSize / 2}
//                   y={-magnifierPosition.y * magnifierScale + magnifierSize / 2}
//                   width={imageDimensions.width * magnifierScale}
//                   height={imageDimensions.height * magnifierScale}
//                 />
//                 {lines.map((line, i) => (
//                   <Line
//                     key={i}
//                     points={scalePoints(line.points)}
//                     stroke="yellow"
//                     strokeWidth={1 * magnifierScale}
//                     lineCap="round"
//                     lineJoin="round"
//                   />
//                 ))}
//                 {startPoint && endPoint && (
//                   <Line
//                     points={scalePoints([
//                       startPoint.x,
//                       startPoint.y,
//                       endPoint.x,
//                       endPoint.y,
//                     ])}
//                     stroke="yellow"
//                     strokeWidth={2 * magnifierScale}
//                     lineCap="round"
//                     lineJoin="round"
//                   />
//                 )}
//               </Group>
//             )}
//           </Layer>
//         </Stage>
//       )}
//     </div>
//   );
// };

// export default App;



import React, { useState, useEffect } from "react";
import { Stage, Layer, Line, Group, Image as KonvaImage } from "react-konva";
import useImage from "use-image";

const App = () => {
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [lines, setLines] = useState([]);
  const [plusSign, setPlusSign] = useState(null);
  const [image] = useImage("../src/assets/test.jpg");
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
