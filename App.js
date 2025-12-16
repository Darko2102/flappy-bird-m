import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Bird from "./src/Bird";
import { useEffect, useState } from "react";
import Obstacles from "./components/Obstacle";

export default function App() {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;

  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth);
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(
    screenWidth + screenWidth / 2 + 30
  );
  const [obstacleNegHeight, setObstacleNegHeight] = useState(0);
  const [obstacleNegHeightTwo, setObstacleNegHeightTwo] = useState(0);
  let obstacleWidth = 60;
  let obstacleHeight = 300;
  let gap = 200;

  const birdLeft = screenWidth / 2;
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2);
  const gravity = 3;

  let gameTimerId;
  let obstaclesTimerId;
  let obstaclesTimerIdTwo;

  useEffect(() => {
    if (obstaclesLeft > -60) {
      obstaclesTimerId = setInterval(() => {
        setObstaclesLeft((obstaclesLeft) => obstaclesLeft - 5);
      }, 30);
      return () => {
        clearInterval(obstaclesTimerId);
      };
    } else {
      setObstaclesLeft(screenWidth);
      setObstacleNegHeight(-Math.random() * 100);
    }
  }, [obstaclesLeft]);

  useEffect(() => {
    if (obstaclesLeftTwo > -60) {
      obstaclesTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo((obstaclesLeftTwo) => obstaclesLeftTwo - 5);
      }, 30);
      return () => {
        clearInterval(obstaclesTimerIdTwo);
      };
    } else {
      setObstaclesLeftTwo(screenWidth);
      setObstacleNegHeightTwo(-Math.random() * 100);
    }
  }, [obstaclesLeftTwo]);

  useEffect(() => {
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom((birdBottom) => birdBottom - gravity);
      }, 30);
    }

    return () => {
      clearInterval(gameTimerId);
    };
  }, [birdBottom]);

  return (
    <View style={styles.container}>
      <Bird birdBottom={birdBottom} birdLeft={birdLeft} />

      <Obstacles
        color={"green"}
        obstacleWidth={obstacleWidth}
        obstacleHeight={obstacleHeight}
        randomBottom={obstacleNegHeight}
        gap={gap}
        obstaclesLeft={obstaclesLeft}
      />

      <Obstacles
        color={"yellow"}
        obstacleWidth={obstacleWidth}
        obstacleHeight={obstacleHeight}
        randomBottom={obstacleNegHeightTwo}
        gap={gap}
        obstaclesLeft={obstaclesLeftTwo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});