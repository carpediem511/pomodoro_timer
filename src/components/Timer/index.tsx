import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import TimerButtons from "../TimerButtons";
import ModalNotification from "../ModalNotification";

const Timer = () => {
	const [totalMinutes, setTotalMinutes] = useState<number>(25); // общая продолжительность в минутах
	const [timerType, setTimerType] = useState<string>("work"); // текущий тип таймера: работа/отдых
	const [isTimerOn, setIsTimerOn] = useState<boolean>(false); // запущен ли таймер: да/нет
	const [minutesToEnd, setMinutesToEnd] = useState<number>(totalMinutes); // оставшиеся минуты
	const [secondsToEnd, setSecondsToEnd] = useState<number>(0); // оставшиеся секунды
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false); // открыто ли модальное окно
	const [progress, setProgress] = useState<string>(""); // прогресс в кружке
	const [notificationMessage, setNotificationMessage] = useState<string>("");

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
		if (timerType === "work") {
			playSound("/rest_time.mp3");
			setIsOpenModal(true);
			setTimerType("rest");
			setTotalMinutes(restTime);
			setNotificationMessage(
				"Вы хорошенько поработали! Так держать! Теперь немного отдохните!",
			);
		} else {
			playSound("/work_time.mp3");
			setIsOpenModal(true);
			setTimerType("work");
			setTotalMinutes(workTime);
			setNotificationMessage("Пора снова за работу!");
		}
	};

	useEffect(() => {
		if (isTimerOn) {
			startInterval();
		} else {
			clearInterval(timerInterval);
		}

		return () => {
			clearInterval(timerInterval);
		};// eslint-disable-next-line
	}, [isTimerOn, secondsToEnd, minutesToEnd, timerInterval]);

	const time: string = `${minutesToEnd < 10 ? "0" + minutesToEnd : minutesToEnd
		}:${secondsToEnd < 10 ? "0" : ""}${secondsToEnd}`;

	const timerTitle =
		timerType === "work" ? "Время для работы" : "Время для отдыха";
	return (
		<>
			<div className="text-center mt-8">
				<h2
					className={`text-2xl mb-6 font-bold ${timerType === "work" ? "text-red-700" : "text-green-600"
						}`}
				>
					{timerTitle}
				</h2>
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
				<TimerButtons
					isTimerOn={isTimerOn}
					toggleTimer={toggleTimer}
					resetTimer={resetTimer}
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
