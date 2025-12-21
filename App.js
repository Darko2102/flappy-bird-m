import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Bird from "./src/Bird";
import { useEffect, useState } from "react";
import Obstacle from "./components/Obstacle";

export default function App() {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;

  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth);
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(
    screenWidth + screenWidth / 2 + 30
  );
  const [obstaclesNegHeight, setObstacleNegHeight] = useState(0);
  const [obstaclesNegHeightTwo, setObstacleNegHeightTwo] = useState(0);
  let obstacleWidth = 60;
  let obstacleHeight = 300;
  let gap = 200;

  const birdLeft = screenWidth / 2;
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2);
  const gravity = 3;
  const[isGameOver, setIsGameOver] = useState(false)
  const[score, setScore]= useState(0)

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


  useEffect(() => {
    if(
      ((birdBottom < (obstaclesNegHeight + obstacleHeight + 30) ||
      birdBottom > (obstaclesNegHeight + obstacleHeight + gap -30)) &&
      (obstaclesLeft > screenWidth/2 -30 && obstaclesLeft , screenWidth/2 + 30)
    )
    ||
    ((birdBottom < (obstaclesNegHeightTwo + obstacleHeight + 30) ||
    birdBottom > (obstaclesNegHeightTwo + obstacleHeight + gap -30)) &&
    (obstaclesLeftTwo > screenWidth/2 -30 && obstaclesLeftTwo < screenWidth/2 + 30)
  )
    )
    {
      console.log("Game Over")
      gameOver()
    }
  })

  const jump = () => {
    if(!isGameOver && (birdBottom < screenHeight)) {
      setBirdBottom(birdBottom => birdBottom + 50)
      console.log('jumped')
    }
  }

  const gameOver = () => {
    clearInterval(gameTimerId)
    clearInterval(obstaclesTimerId)
    clearInterval(obstaclesTimerIdTwo)
  }

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        <Image source={require('./assets/background.png')} style={styles.backgroundImage} />
        <Text style={styles.score}>Score: {score}</Text>
        <Bird 
          birdBottom = {birdBottom} 
          birdLeft = {birdLeft}
        />
        <Obstacle 
          color={'green'}
          obstacleWidth = {obstacleWidth}
          obstacleHeight = {obstacleHeight}
          randomBottom = {obstaclesNegHeight}
          gap = {gap}
          obstaclesLeft = {obstaclesLeft}
        />
        <Obstacle 
          color={'yellow'}
          obstacleWidth = {obstacleWidth}
          obstacleHeight = {obstacleHeight}
          randomBottom = {obstaclesNegHeightTwo}
          gap = {gap}
          obstaclesLeft = {obstaclesLeftTwo}
        />
      </View>
    </TouchableWithoutFeedback>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  score: {
    fontSize: 32,
    top: 50,
    position: 'absolute',
    zIndex: 1,
    color: 'white'
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  } 
});