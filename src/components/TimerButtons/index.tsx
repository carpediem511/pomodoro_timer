import { useState } from "react";
import ModalSettings from "../ModalSettings";

type TimerButtonsProps = {
  isTimerOn: boolean;
  toggleTimer: () => void;
  resetTimer: () => void;
  workTime: number;
  restTime: number;
  setWorkTime: (workTime: number) => void;
  setRestTime: (restTime: number) => void;
};

const TimerButtons = ({
  isTimerOn,
  toggleTimer,
  resetTimer,
  workTime,
  setWorkTime,
  restTime,
  setRestTime,
}: TimerButtonsProps) => {
  const [isModalSettingsOpen, setIsModalSettingsOpen] =
    useState<boolean>(false);

  const openModal = () => {
    setIsModalSettingsOpen(true);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center mt-10 gap-4 md:gap-8">
      <button
        className="self-center text-white font-semibold active:shadow-lg flex rounded-lg px-3 mt-2 py-2 border w-1/2 md:w-1/2 justify-center bg-teal-600 hover:bg-teal-400 duration-200 hover:text-black"
        onClick={toggleTimer}
      >
        {isTimerOn ? "Приостановить таймер" : "Начинаем!"}
      </button>

      <button
        className="self-center text-white font-semibold active:shadow-lg flex rounded-lg px-3 mt-2 py-2 border w-1/2 md:w-1/2 justify-center bg-red-600 hover:bg-red-400 duration-200 hover:text-black"
        onClick={resetTimer}
      >
        Сброс
      </button>

      <button
        className="self-center text-white font-semibold active:shadow-lg flex rounded-lg px-3 mt-2 py-2 border w-1/2 md:w-1/2 justify-center bg-teal-600 hover:bg-teal-400 duration-200 hover:text-black"
        onClick={openModal}
      >
        Настройки
      </button>

      {isModalSettingsOpen && (
        <ModalSettings
          setIsModalSettingsOpen={setIsModalSettingsOpen}
          workTime={workTime}
          setWorkTime={setWorkTime}
          restTime={restTime}
          setRestTime={setRestTime}
        />
      )}
    </div>
  );
};

export default TimerButtons;
