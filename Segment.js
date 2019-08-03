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


  componentDidUpdate() {
    console.log("props", this.props)
  }

  render() {
    const {
      segmentType,
      tiles,
      inactiveTabTextStyle,
      activeTabTextStyle,
      activeTabHighlighterPanelColor,
      tabPanels
    } = this.props;

    console.log({ tabPanels })

    return (
      <View>
          <Tiles
            {...{
              tiles,
              segmentType,
              inactiveTabTextStyle,
              activeTabTextStyle,
              tabPanels
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
      </View>
    );
  }
}

