import React from "react";
import Segment from "./Segment";
export default function App() {
  return (
    <Segment
      tiles={["tile A", "tile B", "tile C", "title D", "title D"]}
      borderRadius={20}
      segmentType={"default"}
      inactiveTabTextStyle={{ color: "red" }}
      activeTabTextStyle={{ color: "green" }}
      activeTabHighlighterPanelColor={"teal"}
    />
  );
}
