import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
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
  const [typeTimer, setTypeTimer] = useState("none");

  /**
   * This is a function that returns a timer component that counts down from 30 seconds and can be
   * reloaded.
   * @returns A component that conditionally renders a Timer component or a Text
   */
  const SimpleTimer = () => {
    return !finishTimer ? (
      <View
        style={{
          ...globalStyle.card,
          backgroundColor: colorPalette.cactus_1,
          width: "90%",
        }}
      >
        <Timer
          remainingTime={30}
          typeTimer={"milisec"}
          callback={() => setFinishTimer(true)}
          style={customizeText(80, "dark", "left", { letterSpacing: 20 })}
          stopControls={true}
        />
      </View>
    ) : (
      <TouchableOpacity onPress={() => setFinishTimer(false)}>
        <Text style={customizeText(25, "normal", "left")}>Reload</Text>
      </TouchableOpacity>
    );
  };

  const SelectTimer = () => {
    return (
      <View
        style={{
          ...globalStyle.card,
          width: "90%",
        }}
      >
        <Text style={customizeText(40, "normal", "left")}>Timer</Text>
        <View style={{ alignSelf: "flex-end", marginTop: 15 }}>
          <TouchableOpacity
            style={{ marginVertical: 10 }}
            onPress={() => setTypeTimer("simple")}
          >
            <Text style={customizeText(25, "normal", "left")}>
              Just simple timer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const RenderTimer = () => {
    const timers = {
      simple: <SimpleTimer />,
      none: <SelectTimer />,
    };

    return timers[typeTimer];
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <RenderTimer />
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
});
