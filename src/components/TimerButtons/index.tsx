import { useState } from "react";
import ModalSettings from "../ModalSettings";

type TimerButtonsProps = {
  isTimerOn: boolean;
  toggleTimer: () => void;
  resetTimer: () => void;
};

const TimerButtons = ({
  isTimerOn,
  toggleTimer,
  resetTimer,
}: TimerButtonsProps) => {
  const [isModalSettingsOpen, setIsModalSettingsOpen] =
    useState<boolean>(false);

  const openModal = () => {
    setIsModalSettingsOpen(true);
  };

  return (
    <div className="flex justify-center mt-10 gap-4">
      <button
        className="self-center text-white font-semibold active:shadow-lg flex rounded-lg px-3 mt-2 py-2 border w-1/2 justify-center bg-teal-600 hover:bg-teal-400 duration-200 hover:text-black"
        onClick={toggleTimer}
      >
        {isTimerOn ? "Приостановить таймер" : "Начинаем!"}
      </button>

      <button
        className="self-center text-white font-semibold active:shadow-lg flex rounded-lg px-3 mt-2 py-2 border w-1/2 justify-center bg-red-600 hover:bg-red-400 duration-200 hover:text-black"
        onClick={resetTimer}
      >
        Сброс
      </button>

      <button
        className="self-center text-white font-semibold active:shadow-lg flex rounded-lg px-3 mt-2 py-2 border w-1/2 justify-center bg-teal-600 hover:bg-teal-400 duration-200 hover:text-black"
        onClick={openModal}
      >
        Настройки
      </button>

      {isModalSettingsOpen && (
        <ModalSettings setIsModalSettingsOpen={setIsModalSettingsOpen} />
      )}
    </div>
  );
};

export default TimerButtons;
