import { useEffect, useState } from "react";
import { Text } from "react-native";

const TimerSec = (props) => {
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

const TimerMilisec = (props) => {
  const { remainingTime, callback, ...customPropsText } = props;
  const [countdown, setCountdown] = useState(remainingTime * 1000);

  useEffect(() => {
    setTimeout(() => {
      if (countdown > 0) setCountdown((countdown) => countdown - 30);
      else controlFinish();
    }, 5);

    return () => {};
  }, [countdown]);

  function controlFinish() {
    callback();
  }

  const seconds = (countdown / 1000).toFixed(2).replace(".", ":");

  return <Text {...customPropsText}>{`${seconds}`}</Text>;
};

/**
 * Count down component
 * @param {Number} remainingTime Segs to remaining time (1 - 60)
 * @param {Function} callback Function to execute when time has been finished
 * @param {String} typeTimer Type of timer (milisec || sec)
 * It can recive any property compatible with Text component
 * @returns Text component with count down in seconds (It only accept segs)
 */
const Timer = (props) => {
  const { typeTimer, ...rest } = props;

  return typeTimer === "milisec" ? (
    <TimerMilisec {...rest} />
  ) : (
    <TimerSec {...rest} />
  );
};

export default Timer;
