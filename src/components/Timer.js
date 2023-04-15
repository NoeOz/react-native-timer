import { useEffect, useState } from "react";
import { Text } from "react-native";

/**
 * Count down component
 * @param {Number} remainingTime Segs to remaining time (1 - 60)
 * @param {Function} callback Function to execute when time has been finished
 * It can recive any property compatible with Text component
 * @returns Text component with count down in seconds (It only accept segs)
 */
const Timer = (props) => {
  const { remainingTime, callback, ...customPropsText } = props;
  const [countdown, setCountdown] = useState(remainingTime);

  useEffect(() => {
    setTimeout(() => {
      if (countdown > 0) setCountdown((countdown) => countdown - 1);
      else controlFinish();
    }, 1000);

    return () => {};
  }, [countdown]);

  function controlFinish() {
    callback();
  }

  const Seconds = () => {
    if (countdown < 10) return "0" + countdown;
    else return countdown;
  };

  return <Text {...customPropsText}>{`${Seconds()}`}</Text>;
};

export default Timer;
