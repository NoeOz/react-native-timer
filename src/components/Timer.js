import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, Dimensions } from "react-native";

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
  const { remainingTime, callback, stopControls, ...customPropsText } = props;
  const [countdown, setCountdown] = useState(remainingTime * 1000);
  const [stopControl, setStopControl] = useState(false);

  useEffect(() => {
    runCounter();

    return () => {};
  }, [countdown, stopControl]);

  /**
   * The function runs a countdown timer that decrements by 30 every 5 milliseconds until it reaches 0
   * or until a stop control is triggered.
   */
  function runCounter() {
    if (!stopControl) {
      const timerId = setTimeout(() => {
        if (countdown > 0) {
          setCountdown((countdown) => countdown - 30);
        } else controlFinish(timerId);
      }, 5);
    }
  }

  /**
   * The function "controlFinish" calls a callback function.
   */
  function controlFinish(timerId) {
    clearTimeout(timerId)
    callback();
  }

  const seconds = (countdown / 1000).toFixed(2).replace(".", ":");

  /**
   * The function `handleStop` toggles the value of `stopControl` if `stopControls` is truthy.
   */
  const handleStop = () => {
    if (stopControls) setStopControl(!stopControl);
  };

  return (
    <TouchableOpacity onPress={handleStop}>
      <Text {...customPropsText}>{`${seconds}`}</Text>
    </TouchableOpacity>
  );
};

/**
 * Count down component
 * @param {Number} remainingTime Segs to remaining time (1 - 60)
 * @param {Function} callback Function to execute when time has been finished
 * @param {String} typeTimer Type of timer (milisec || sec)
 * @param {Boolean} stopControls When Text is pressed is paused | playing
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
