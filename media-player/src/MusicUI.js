import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  PanResponder,
  Image,
  ScrollView,
  Slider,
  StyleSheet,
  Animated
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class MusicUI extends Component {
  state = {
    isScrollEnabled: false
  };

  componentWillMount() {
    this.scrollOffset = 0;

    this.animation = new Animated.ValueXY({
      x: 0,
      y: SCREEN_HEIGHT - 90
    });

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (this.state.isScrollEnabled && this.scrollOffset < 0 && gestureState.dy > 0) {
          return true;
        }
      },
      onPanResponderGrant: (evt, gestureState) => {
        this.animation.extractOffset();
      },
      onPanResponderMove: (evt, gestureState) => {
        this.animation.setValue({ x: 0, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy < 0) {
          Animated.spring(this.animation.y, {
            toValue: -SCREEN_HEIGHT + 120,
            tension: 1
          }).start();
        } else if (gestureState.dy > 0) {
          Animated.spring(this.animation.y, {
            toValue: SCREEN_HEIGHT - 120,
            tension: 1
          }).start();
        }
      }
    });
  }

  render() {
    const animatedHeight = {
      transform: this.animation.getTranslateTransform()
    };

    animatedImageHeight = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 90],
      outputRange: [200, 32],
      extrapolate: "clamp"
    });

    animatedSongTitleOpacity = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 500, SCREEN_HEIGHT - 90],
      outputRange: [0, 0, 1],
      extrapolate: "clamp"
    });

    animatedImageMarginLeft = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 90],
      outputRange: [SCREEN_WIDTH / 2 - 100, 1],
      extrapolate: "clamp"
    });

    animatedHeaderHeight = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 90],
      outputRange: [SCREEN_WIDTH / 2, 90],
      extrapolate: "clamp"
    });

    animatedSongDetailsOpacity = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 500, SCREEN_HEIGHT - 90],
      outputRange: [1, 0, 0],
      extrapolate: "clamp"
    });

    return (
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: "white"
        }}
      >
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[
            animatedHeight,
            {
              position: "absolute",
              left: 0,
              right: 0,
              zIndex: 10,
              backgroundColor: "white",
              height: SCREEN_HEIGHT
            }
          ]}
        >
          <ScrollView
            scrollEnabled={this.state.isScrollEnabled}
            scrollEventThrottle={16}
            onScroll={event => {
              this.scrollOffset = event.nativeEvent.contentOffset.y;
            }}
          >
            <Animated.View
              style={{
                height: animatedHeaderHeight,
                borderTopWidth: 1,
                borderTopColor: "#ebe5e5",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  flex: 4,
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <Animated.View
                  style={{
                    height: animatedImageHeight,
                    width: animatedImageHeight,
                    marginLeft: animatedImageMarginLeft
                  }}
                >
                  <Image
                    style={{
                      flex: 1,
                      width: null,
                      height: null
                    }}
                    source={require("../assets/media_girl.jpeg")}
                  />
                </Animated.View>
                <Animated.Text
                  style={{
                    opacity: animatedSongTitleOpacity,
                    fontSize: 18,
                    paddingLeft: 10
                  }}
                >
                  Barracuda
                </Animated.Text>
              </View>
              <Animated.View
                style={{
                  opacity: animatedSongTitleOpacity,
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-around"
                }}
              >
                <Ionicons name="md-pause" size={32} />
                <Ionicons name="md-play" size={32} />
              </Animated.View>
            </Animated.View>

            <Animated.View
              style={{
                height: animatedHeaderHeight,
                opacity: animatedSongDetailsOpacity
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "flex-end"
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 22
                  }}
                >
                  Barracuda
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: "#fa95ed"
                  }}
                >
                  Heart - Little Queen
                </Text>

                <View
                  style={{
                    height: 40,
                    width: SCREEN_WIDTH,
                    alignItems: "center"
                  }}
                >
                  <Slider
                    style={{ width: 300 }}
                    step={1}
                    minimumValue={18}
                    maximumValue={71}
                    value={18}
                  />
                </View>
              </View>

              <View
                style={{
                  flex: 2,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around"
                }}
              >
                <Ionicons name="md-rewind" size={40} />
                <Ionicons name="md-pause" size={50} />
                <Ionicons name="md-fastforward" size={40} />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                  paddingBottom: 20
                }}
              >
                <Ionicons name="md-add" size={32} style={{ color: "#fa95ed" }} />
                <Ionicons name="md-more" size={32} style={{ color: "#fa95ed" }} />
              </View>
            </Animated.View>
          </ScrollView>
        </Animated.View>
      </Animated.View>
    );
  }
}

export default MusicUI;
