import React from "react";
import Segment from "./Segment";
import { View, Text } from "react-native";

function Panel({ title }) {
  return (
    <View>
      <Text>
        {title}
      </Text>
    </View>
  )
}

export default function App() {
  return (
    <Segment
      tiles={["tile A", "tile B", "tile C", "title D"]}
      borderRadius={20}
      segmentType={"default"}
      inactiveTabTextStyle={{ color: "red" }}
      activeTabTextStyle={{ color: "green" }}
      activeTabHighlighterPanelColor={"teal"}
      tabPanels={[
        {
          index: 0,
          child: <Panel title="Shubham kakkar" />
        },
        {
          index: 1,
          child: <Panel title="title" />
        },

      ]}
    />
  );
}
