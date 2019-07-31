import React from "react";
import { View, Animated, ScrollView } from "react-native";

import Tiles from "./Tiles";

export default class Segment extends React.PureComponent {
  state = {
    animaterWidth: [],
    activeTile: 0
  };

  constructor(props) {
    super(props);
    this.animaterPosition = new Animated.Value(0);
  }

  setLayout = width => {
    this.setState(prevState => ({
      animaterWidth: [...prevState.animaterWidth, width]
    }));
  };

  startAnimation = key => {
    this.setState({ activeTile: key });
    const {
      props: { segmentType },
      state: { animaterWidth },
      animaterPosition
    } = this;
    if (segmentType !== "vertical") {
      Animated.spring(animaterPosition, {
        toValue: animaterWidth[key] * key
      }).start();
    }
  };

  render() {
    const {
      segmentType,
      tiles,
      inactiveTabTextStyle,
      activeTabTextStyle,
      activeTabHighlighterPanelColor
    } = this.props;
    const { animaterWidth, activeTile } = this.state;
    return (
      <View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={segmentType === "default" || segmentType === "horizontal"}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Tiles
            {...{
              tiles,
              segmentType,
              activeTile,
              inactiveTabTextStyle,
              activeTabTextStyle
            }}
            setLayout={this.setLayout}
            setActiveTab={this.setActiveTab}
            startAnimationAndSetState={this.startAnimation}
          >
            {animaterWidth !== 0 && segmentType !== "vertical" && (
              <Animated.View
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: this.animaterPosition,
                  flex: 1,
                  width: animaterWidth[activeTile],
                  height: 2,
                  backgroundColor: activeTabHighlighterPanelColor
                }}
              />
            )}
          </Tiles>
        </ScrollView>
      </View>
    );
  }
}
