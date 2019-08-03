import React from "react";
import { View, Text, TouchableNativeFeedback, Dimensions, ScrollView } from "react-native";
import { ActiveTilePropProvider } from "./Context/ActiveTileContext";
import { TilesDimensionPropProvider } from "./Context/TileDimensionsContext";

const { width: deviceWidth } = Dimensions.get("window");
export default function Titles({
  tiles,
  onPress: onPressCustom,
  onPressIn: onPressInCustom,
  onPressOut: onPressOutCustom,
  onLongPress: onLongPressCustom,
  delayPressIn,
  delayPressOut,
  delayLongPress,
  children,
  segmentType,
  inactiveTabTextStyle,
  activeTabTextStyle,
  startAnimation,
  tabPanels
}) {


  const [activeTile, setActiveTile] = React.useState(0)
  const [tilesDimensions, setTilesDimensions] = React.useState([])

  function setLayout(width) {
    const temp = [
      ...tilesDimensions,
      width
    ]
    setTilesDimensions(temp);
  }

  React.useEffect(() => {
    if (tilesDimensions.length) {
      startAnimation(tilesDimensions, activeTile)
    }
    console.log({ activeTile })
  }, [activeTile])
  return (
    <ActiveTilePropProvider value={activeTile}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={segmentType === "default" || segmentType === "horizontal"}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <TilesDimensionPropProvider value={tilesDimensions}>
            <View
              style={{
                flex: 1,
                flexDirection:
                  segmentType === "default" || segmentType === "horizontal"
                    ? "row"
                    : "column"
              }}
            >
              {tiles.map((res, key) => (
                <TouchableNativeFeedback
                  style={{
                    flex: 1
                  }}
                  onLayout={({
                    nativeEvent: {
                      layout: { width }
                    }
                  }) => setLayout(width)}
                  onPress={e => {
                    setActiveTile(key)
                    onPressCustom && onPressCustom(e);
                  }}
                  onPressIn={e => {
                    onPressInCustom && onPressInCustom(e);
                  }}
                  onPressOut={e => {
                    onPressOutCustom && onPressOutCustom(e);
                  }}
                  onLongPress={e => {
                    onLongPressCustom && onLongPressCustom(e);
                  }}
                  {...{
                    key,
                    delayPressIn,
                    delayPressOut,
                    delayLongPress
                  }}
                >
                  <View
                    style={{
                      padding: 10,
                      flex: 1,
                      justifyContent: "flex-end",
                      alignItems: "center",
                      borderBottomWidth: 1,
                      borderBottomColor:
                        segmentType === "vertical"
                          ? activeTile === key
                            ? "black"
                            : "#CFCFCF"
                          : "#CFCFCF",
                      minWidth: deviceWidth / 5
                    }}
                  >
                    <Text
                      style={[
                        activeTile === key ? activeTabTextStyle : inactiveTabTextStyle,
                        {
                          color:
                            activeTile === key
                              ? inactiveTabTextStyle.color
                              : activeTabTextStyle.color
                        }
                      ]}
                    >
                      {res}
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              ))}
              {children}
            </View>
          </TilesDimensionPropProvider>
        </ScrollView>
        {
          tabPanels.map(({ index, child }) => {
            if (index === activeTile) {
              return (
                <View key={index} style={{ flex: 1, backgroundColor: "red" }}>
                  {child}
                </View>
              )
            }
          })
        }
    </ActiveTilePropProvider>
  );
}
