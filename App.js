import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Timer from "./src/components/Timer";
import { useState } from "react";

export default function App() {
  const [finishTimer, setFinishTimer] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {!finishTimer ? (
        <TouchableOpacity
          style={styles.containerText}
          onPress={() => setFinishTimer(false)}
        >
          <Timer
            remainingTime={30}
            callback={() => setFinishTimer(true)}
            style={styles.textStyle}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.containerText}
          onPress={() => setFinishTimer(false)}
        >
          <Text style={styles.textStyle}>Reload</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
  },
  containerText: {
    justifyContent: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ffffff",
    height: 50,
    width: 120,
  },
  textStyle: {
    color: "#ffffff",
    fontSize: 18,
    textAlign: "center",
  },
});
