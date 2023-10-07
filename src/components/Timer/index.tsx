import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Modal from "../Modal";

const Timer = () => {
	const [totalMinutes, setTotalMinutes] = useState<number>(25); // общая продолжительность в минутах
	const [timerType, setTimerType] = useState<string>("work"); // текущий тип таймера: работа/отдых
	const [isTimerOn, setIsTimerOn] = useState<boolean>(false); // запущен ли таймер: да/нет
	const [minutesToEnd, setMinutesToEnd] = useState<number>(totalMinutes); // оставшиеся минуты
	const [secondsToEnd, setSecondsToEnd] = useState<number>(0); // оставшиеся секунды
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false); // открыто ли модальное окно
	const [progress, setProgress] = useState<string>(""); // прогресс в кружке

	// время работы и отдыха
	const workTime = 25;
	const restTime = 5;
	let timerInterval: any;

	const playSound = (soundFile: string) => {
		const audio = new Audio(soundFile);
		audio.play();
	};

	// переключение таймера
	const toggleTimer = () => {
		if (isTimerOn) {
			clearInterval(timerInterval);
			setIsTimerOn(false);
		} else {
			if (minutesToEnd > 0 || secondsToEnd > 0) {
				setIsTimerOn(true);
				startInterval();
			}
		}
	};

	// сброс таймера
	const resetTimer = () => {
		clearInterval(timerInterval);
		setIsTimerOn(false);
		setMinutesToEnd(totalMinutes);
		setSecondsToEnd(0);
		setIsOpenModal(false);
		setProgress("");
	};

	// запуск интервала для обратного отсчёта
	const startInterval = () => {
		timerInterval = setInterval(() => {
			if (secondsToEnd === 0) {
				if (minutesToEnd !== 0) {
					setSecondsToEnd(59);
					setMinutesToEnd(minutesToEnd - 1);
				} else {
					handleTimerEnd();
				}
			} else {
				setSecondsToEnd(secondsToEnd - 1);
			}

			const progressValue: string = `${minutesToEnd}:${secondsToEnd < 10 ? `0${secondsToEnd}` : secondsToEnd
				}`;
			setProgress(progressValue);
		}, 1000);
	};

	// обработчик завершения таймера
	const handleTimerEnd = () => {
		clearInterval(timerInterval);
		setIsTimerOn(false);
		playSound("/rest_time.mp3");
		setIsOpenModal(true);
		setTimerType(timerType === "work" ? "rest" : "work");
		setTotalMinutes(timerType === "work" ? workTime : restTime);
	};

	useEffect(() => {
		if (isTimerOn) {
			startInterval();
		} else {
			clearInterval(timerInterval);
		}

		return () => {
			clearInterval(timerInterval);
		};
	}, [isTimerOn, secondsToEnd, minutesToEnd]);

	const time: string = `${minutesToEnd < 10 ? "0" + minutesToEnd : minutesToEnd
		}:${secondsToEnd < 10 ? "0" : ""}${secondsToEnd}`;

	return (
		<>
			<CircularProgressbar
				value={((minutesToEnd * 60 + secondsToEnd) / (totalMinutes * 60)) * 100}
				text={time}
				styles={buildStyles({
					textColor: "rgb(109, 40, 217)",
					trailColor: "rgb(200, 200, 200)",
					pathColor: "rgb(138, 43, 226)",
				})}
			/>
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

				<button className="self-center text-white font-semibold active:shadow-lg flex rounded-lg px-3 mt-2 py-2 border w-1/2 justify-center bg-teal-600 hover:bg-teal-400 duration-200 hover:text-black">
					Настройки
				</button>
			</div>
			<Modal /* isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}*/ />
		</>
	);
};

export default Timer;
