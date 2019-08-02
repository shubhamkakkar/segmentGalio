import React from "react";
import Segment from "./Segment";
import { View, Text } from "react-native";


function TabPanel({ children }) {
  return (
    <View>
      {children}
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
    >
      <TabPanel>
        <View style={{ flex: 1, backgroundColor: "red" }}>
          <Text>
            shubham kakkar
        </Text>
        </View>
      </TabPanel>
    </Segment>
  );
}
