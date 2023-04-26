import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from "react-native";
import Timer from "./src/components/Timer";
import { useState } from "react";
import {
  colorPalette,
  customizeText,
  globalStyle,
} from "./src/style/globalStyles";

export default function App() {
  const [finishTimer, setFinishTimer] = useState(false);
  const [startTimer, setStartTimer] = useState(false);
  const [time, setTime] = useState(null);

  function controlTimeSet(value = new Number()) {
    if ((value <= 60 && value > 0) || value === "") {
      setTime(value);
      setFinishTimer(false);
    }
  }

  function finish() {
    setFinishTimer(true);
    setStartTimer(false);
  }

  function start() {
    setStartTimer(!startTimer);
    setFinishTimer(false);
  }

  /**
   * This is a function that returns a timer component that counts down from 30 seconds and can be
   * reloaded.
   * @returns A component that conditionally renders a Timer component or a Text
   */
  const SimpleTimer = () => {
    return (
      !finishTimer && (
        <View
          style={{
            ...globalStyle.card,
            backgroundColor: colorPalette.noir,
            width: "100%",
          }}
        >
          <Timer
            remainingTime={time}
            typeTimer={"milisec"}
            callback={() => finish()}
            style={customizeText(80, "normal", "left", { letterSpacing: 20 })}
            stopControls={true}
          />
        </View>
      )
    );
  };

  const RenderTimer = () => {
    if (startTimer) return <SimpleTimer />;
    else
      return (
        <View style={{ alignSelf: "flex-end", marginTop: 15 }}>
          <TouchableOpacity
            style={{ marginVertical: 10 }}
            onPress={() => start()}
          >
            <Text style={customizeText(25, "normal", "left")}>
              {finishTimer ? "Reload" : "Start timer"}
            </Text>
          </TouchableOpacity>
        </View>
      );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View
        style={{
          ...globalStyle.card,
          width: "100%",
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={customizeText(40, "normal", "left")}>Timer</Text>
          <TextInput
            style={styles.inputTimer}
            value={time}
            onChangeText={(value) => controlTimeSet(value)}
            keyboardType={"number-pad"}
          />
        </View>
        <RenderTimer />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalette.background,
    alignItems: "center",
    justifyContent: "center",
    padding: "2.5%",
  },
  inputTimer: {
    ...customizeText(40, "normal", "center"),
    backgroundColor: colorPalette.cool_gray,
    padding: "2%",
    flex: 1,
    marginLeft: "5%",
    borderRadius: 10,
  },
});
