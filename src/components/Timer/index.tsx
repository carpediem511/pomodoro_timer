import { useEffect, useState, useCallback, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import TimerButtons from "../TimerButtons";
import ModalNotification from "../ModalNotification";

const DEFAULT_WORK_TIME = 25;
const DEFAULT_REST_TIME = 5;

const Timer = () => {
  const [workTime, setWorkTime] = useState<number>(DEFAULT_WORK_TIME);
  const [restTime, setRestTime] = useState<number>(DEFAULT_REST_TIME);
  const [totalMinutes, setTotalMinutes] = useState<number>(workTime);
  const [timerType, setTimerType] = useState<string>("work");
  const [isTimerOn, setIsTimerOn] = useState<boolean>(false);
  const [minutesToEnd, setMinutesToEnd] = useState<number>(totalMinutes);
  const [secondsToEnd, setSecondsToEnd] = useState<number>(0);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  let timerInterval: any;

  const playSound = (soundFile: string) => {
    const audio = new Audio(soundFile);
    audio.play();
  };

  const toggleTimer = () => {
    if (isTimerOn) {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
      setIsTimerOn(false);
    } else {
      if (minutesToEnd > 0 || secondsToEnd > 0) {
        setIsTimerOn(true);
        startInterval();
      }
    }
  };

  const resetTimer = useCallback(() => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    setIsTimerOn(false);
    setMinutesToEnd(totalMinutes);
    setSecondsToEnd(0);
    setIsOpenModal(false);
  }, [timerInterval, totalMinutes]);

  const timerIntervalRef = useRef<any>(null); // Используйте useRef для сохранения интервала

  const handleTimerEnd = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    setIsTimerOn(false);
    if (timerType === "work") {
      playSound("/rest_time.mp3");
      setIsOpenModal(true);
      setTimerType("rest");
      setTotalMinutes(restTime);
    } else {
      playSound("/work_time.mp3");
      setIsOpenModal(true);
      setTimerType("work");
      setTotalMinutes(workTime);
    }
  }, [restTime, workTime, timerType]);

  const startInterval = useCallback(() => {
    timerIntervalRef.current = setInterval(() => {
      if (secondsToEnd === 0) {
        if (minutesToEnd !== 0) {
          setMinutesToEnd((prev) => prev - 1);
          setSecondsToEnd(59);
        } else {
          handleTimerEnd();
        }
      } else {
        setSecondsToEnd((prev) => prev - 1);
      }
    }, 1000);
  }, [minutesToEnd, secondsToEnd, handleTimerEnd]);

  useEffect(() => {
    if (isTimerOn) {
      startInterval();
    } else if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [isTimerOn, startInterval]);

  useEffect(() => {
    if (timerType === "work") {
      setTotalMinutes(workTime);
    } else {
      setTotalMinutes(restTime);
    }
  }, [restTime, workTime, timerType]);

  useEffect(() => {
    resetTimer();
  }, [resetTimer]);

  const time: string = `${
    minutesToEnd < 10 ? "0" + minutesToEnd : minutesToEnd
  }:${secondsToEnd < 10 ? "0" + secondsToEnd : secondsToEnd}`;

  const timerTitle =
    timerType === "work" ? "Время для работы" : "Время для отдыха";

  return (
    <>
      <div className="text-center mt-8 md:mt-16 lg:mt-24">
        <h2
          className={`text-2xl mb-6 font-bold ${
            timerType === "work" ? "text-red-700" : "text-green-600"
          }`}
        >
          {timerTitle}
        </h2>
        <div className="w-1/2 mx-auto">
          <CircularProgressbar
            value={
              ((minutesToEnd * 60 + secondsToEnd) / (totalMinutes * 60)) * 100
            }
            text={time}
            styles={buildStyles({
              textColor: "rgb(109, 40, 217)",
              trailColor: "rgb(200, 200, 200)",
              pathColor: "rgb(138, 43, 226)",
            })}
          />
        </div>
        <TimerButtons
          isTimerOn={isTimerOn}
          toggleTimer={toggleTimer}
          resetTimer={resetTimer}
          workTime={workTime}
          setWorkTime={setWorkTime}
          restTime={restTime}
          setRestTime={setRestTime}
        />

        {isOpenModal && (
          <ModalNotification
            message={
              timerType === "work"
                ? "Снова пора за работу!"
                : "Вы хорошенько поработали! Так держать! Теперь немного отдохните!"
            }
            onClose={() => setIsOpenModal(false)}
            resetTimer={resetTimer}
          />
        )}
      </div>
    </>
  );
};

export default Timer;
