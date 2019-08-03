import React from "react";
import Segment from "./Segment";
import { View, Text } from "react-native";

function Panel({ title }) {
  return (
    <View style={{ flex: 1, backgroundColor: "orange" }}>
      <Text style={{ color: "red" }}>
        {title}
      </Text>
    </View>
  )
}

export default function App() {
  return (
    <>
    <Segment
      tiles={["tile A", "tile B", "tile C", "title D"]}
      borderRadius={20}
      segmentType={"default"}
      inactiveTabTextStyle={{ color: "red" }}
      activeTabTextStyle={{ color: "green" }}
      activeTabHighlighterPanelColor={"teal"}
    >
      <Panel title="Shubham kakkar" />
      <Panel title="title" />
    </Segment>
        <Segment
        tiles={["tile A", "tile B", "tile C", "title D"]}
        borderRadius={20}
        segmentType={"default"}
        inactiveTabTextStyle={{ color: "red" }}
        activeTabTextStyle={{ color: "green" }}
        activeTabHighlighterPanelColor={"teal"}
      >
        <Panel title="Shubham kakkar" />
        <Panel title="title" />
      </Segment>
      </>
  );
}

 // TODO: this.props.children[index] for segment