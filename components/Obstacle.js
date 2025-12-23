import React from "react";
import { View, Image } from "react-native";

const Obstacles = ({
  color,
  obstacleWidth,
  obstacleHeight,
  randomBottom,
  gap,
  obstaclesLeft,
}) => (
  <>
    <Image
      style={{
        position: "absolute",
        backgroundColor: color,
        width: obstacleWidth,
        height: 500,
        left: obstaclesLeft,
        bottom: randomBottom + obstacleHeight + gap,
      }}
      source={require("./assets/pipe.png")}
      resizeMode="cover"
    ></Image>
    <Image
      style={{
        position: "absolute",
        backgroundColor: color,
        width: obstacleWidth,
        height: obstacleHeight,
        left: obstaclesLeft,
        bottom: randomBottom,
      }}
      source={require("../assets/pipe.png")}
      resizeMode="cover"
    ></Image>
  </>
);

export default Obstacles;