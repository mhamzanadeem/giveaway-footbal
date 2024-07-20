import React, { useState } from "react";
import SpotBallTools from "../components/Practice/SpotBallTools";
import SpotBallInfo from "../components/Practice/SpotBallInfo";
import SpotBallContainer from "../components/Practice/SpotBallContainer";

const Page1 = () => {
  const [tool, setTool] = useState("pen");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100%",
      }}
    >
      {/* Remove Select tag in future  */}
      {/* <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="pen">Pen</option>
        <option value="plus">Plus</option>
      </select> */}
      {/* <h2>
        Pick your best and stand a chance to win your Dream Drive
      </h2> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          // maxHeight: "600px",
          // minHeight: "600px",
        }}
      >
        {/* Left Side */}
        <SpotBallTools />
        {/* Middle One */}
        <SpotBallContainer tool={tool} />
        {/* Right One */}
        {/* <SpotBallInfo /> */}
      </div>
    </div>
  );
};

export default Page1;
