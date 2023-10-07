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
	const [minutes, setMinutes] = useState<number>(/*workTime*/)
	const [seconds, setSeconds] = useState<number>(0);


	return (
		<>
			<CircularProgressbar
				value={25}
				styles={buildStyles({
					textColor: 'rgb(109, 40, 217)',
					trailColor: 'rgb(91, 33, 182)',
					pathColor: 'rgb(40, 114, 216)'
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