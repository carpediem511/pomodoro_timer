import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
	PlayCircleIcon,
	PauseCircleIcon,
	Cog6ToothIcon,
} from '@heroicons/react/24/solid';
import Modal from '../Modal';


const Timer = ({ }) => {
	const [minutes, setMinutes] = useState<number>(25)
	const [seconds, setSeconds] = useState<number>(0)
	const [timerType, setTimerType] = useState<boolean>(false)
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	const time: string = `${minutes < 10 ? '0' + minutes : minutes} : ${seconds < 10 ? '0' : ''}${seconds}`

	const playSound = (soundFile: string) => {
		const audio = new Audio(soundFile);
		audio.play();
	}

	let timer: any
	useEffect(() => {

		timer = setInterval(() => {

			setSeconds(seconds + 1)

			if (seconds === 0) {
				if (minutes !== 0) {

					setSeconds(59)
					setMinutes(minutes - 1)
				} else {


				}
			} else {

				setSeconds(seconds - 1)
			}
		}, 1000)

		return () => clearInterval(timer)
	})

	return (
		<>
			<CircularProgressbar
				value={(minutes * 60 + seconds)}
				text={time}
				styles={buildStyles({
					textColor: 'rgb(109, 40, 217)',
					trailColor: 'rgb(200, 200, 200)',
					pathColor: 'rgb(138, 43, 226)'
				})}
			/>
			<div className="flex justify-center mt-10 gap-4">

				<button className='self-center text-white font-semibold active:shadow-lg flex rounded-lg px-3 mt-2 py-2 border w-1/2 justify-center bg-teal-600 hover:bg-teal-400 duration-200 hover:text-black'>
					<PlayCircleIcon className='w-1/4 text-white' />
					Начинаем!
				</button>

				<button className='self-center text-white font-semibold active:shadow-lg flex rounded-lg px-3 mt-2 py-2 border w-1/2 justify-center bg-teal-600 hover:bg-teal-400 duration-200 hover:text-black'>
					<Cog6ToothIcon className='w-1/4 text-white' />
					Настройки
				</button>

			</div>
			<Modal
			/>
		</>
	);
};

export default Timer;