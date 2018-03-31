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
  componentWillMount() {
    this.animation = new Animated.ValueXY({ x: 0, y: SCREEN_HEIGHT - 80 });

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.animation.extractOffset();
      },
      onPanResponderMove: (evt, gestureState) => {
        this.animation.setValue({ x: 0, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy < 0)
        {
          Animated.spring(this.animation.y, {
            toValue: -SCREEN_HEIGHT - 110,
            tension: 1
          }).start()
         
        }  
        else if (gestureState.dy > 0)
        {
          Animated.spring(this.animation.y. {
            toValue: SCREEN_HEIGHT - 90,
            tension: 1
          }).start()
        }  
      }
    });
  }

  render() {
    const animatedHeight = {
      transform: this.animation.getTranslateTransform()
    };

    animatedImageHeight = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 80],
      outputRange: [200, 32],
      extrapolate: "clamp"
    });

    animatedSongTitleOpacity = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 500, SCREEN_HEIGHT - 80],
      outputRange: [0, 0, 1],
      extrapolate: "clamp"
    });

    animatedImageMarginLeft = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 80],
      outputRange: [SCREEN_WIDTH / 2 - 100, 1],
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
          <Animated.View
            {...this.panResponder.panHandlers}
            style={{
              height: 80,
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
                UNTITLED(Live)
              </Animated.Text>
            </View>
            <Animated.View
              style={{
                opacity: 1,
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              <Ionicons name="md-pause" size={32} />
              <Ionicons name="md-play" size={32} />
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    );
  }
}

export default MusicUI;
