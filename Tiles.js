import React from "react";
import { View, Text, TouchableNativeFeedback, Dimensions } from "react-native";
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
  startAnimation
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
  }, [activeTile])
  return (
    <ActiveTilePropProvider value={activeTile}>
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
    </ActiveTilePropProvider>
  );
}
