import React from "react";
import { View, Animated, ScrollView } from "react-native";

import Tiles from "./Tiles";
import { TilesDimensionPropConsumer } from "./Context/TileDimensionsContext";
import { ActiveTilePropConsumer } from "./Context/ActiveTileContext";

export default class Segment extends React.PureComponent {

  constructor(props) {
    super(props);
    this.animaterPosition = new Animated.Value(0);
  }


  startAnimation = (animaterWidth, key) => {
    const {
      props: { segmentType },
      animaterPosition
    } = this;
    if (segmentType !== "vertical") {
      if (animaterWidth.length) {
        Animated.spring(animaterPosition, {
          toValue: animaterWidth[key] * key
        }).start();
      }
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
              inactiveTabTextStyle,
              activeTabTextStyle
            }}
            startAnimation={this.startAnimation}
          >
            {segmentType !== "vertical" && (
              <TilesDimensionPropConsumer>
                {
                  animaterWidth => (
                    <ActiveTilePropConsumer>
                      {activeTile => (
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
                      )
                      }
                    </ActiveTilePropConsumer>


                  )
                }
              </TilesDimensionPropConsumer>
            )}
          </Tiles>
        </ScrollView>
        <View style={{ flex: 1, backgroundColor: "red" }}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

