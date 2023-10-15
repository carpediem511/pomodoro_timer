import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import TimerButtons from "../TimerButtons";
import ModalNotification from "../ModalNotification";


const Timer = () => {
	const [totalMinutes, setTotalMinutes] = useState<number>(25);
	const [timerType, setTimerType] = useState<string>("work");
	const [isTimerOn, setIsTimerOn] = useState<boolean>(false);
	const [minutesToEnd, setMinutesToEnd] = useState<number>(totalMinutes);
	const [secondsToEnd, setSecondsToEnd] = useState<number>(0);
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
	const [progress, setProgress] = useState<string>("");
	const [notificationMessage, setNotificationMessage] = useState<string>("");

	const workTime = 25;
	const restTime = 5;
	let timerInterval: any

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

	const resetTimer = () => {
		if (timerInterval) {
			clearInterval(timerInterval);
		}
		setIsTimerOn(false);
		setMinutesToEnd(totalMinutes);
		setSecondsToEnd(0);
		setIsOpenModal(false);
		setProgress("");
	};

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
			// eslint-disable-next-line
			const progressValue: string = `${minutesToEnd}:${secondsToEnd < 10 ? `0${secondsToEnd}` : secondsToEnd}`;
			setProgress(progressValue);
		}, 1000);
	};

	const handleTimerEnd = () => {
		if (timerInterval) {
			clearInterval(timerInterval);
		}
		setIsTimerOn(false);
		if (timerType === "work") {
			playSound("/rest_time.mp3");
			setIsOpenModal(true);
			setTimerType("rest");
			setTotalMinutes(restTime);
			setNotificationMessage("Вы хорошенько поработали! Так держать! Теперь немного отдохните!");
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
		} else if (timerInterval) {
			clearInterval(timerInterval);
		}

		return () => {
			if (timerInterval) {
				clearInterval(timerInterval);
			}
		};
	}, [isTimerOn, secondsToEnd, minutesToEnd, startInterval, timerInterval]);

	const time: string = `${minutesToEnd < 10 ? "0" + minutesToEnd : minutesToEnd}:${secondsToEnd < 10 ? "0" : ""}${secondsToEnd}`;

	const timerTitle = timerType === "work" ? "Время для работы" : "Время для отдыха";

	return (
		<>
			<div className="text-center mt-8">
				<h2 className={`text-2xl mb-6 font-bold ${timerType === "work" ? "text-red-700" : "text-green-600"}`}>{timerTitle}</h2>
				<CircularProgressbar
					value={((minutesToEnd * 60 + secondsToEnd) / (totalMinutes * 60)) * 100}
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
						// eslint-disable-next-line
						message={timerType === "work" ? "Снова пора за работу!" : "Вы хорошенько поработали! Так держать! Теперь немного отдохните!"}
						onClose={() => setIsOpenModal(false)}
						resetTimer={resetTimer}
					/>
				)}
			</div>
		</>
	);
};

export default Timer;
