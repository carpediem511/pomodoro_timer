import Slider from '@mui/material-next/Slider'
//import Modal from './Modal'; // Импортируйте компонент Modal
//import Timer from './Timer'; // Импортируйте компонент Timer
//import { useState } from 'react';

const Settings = () => {

	const workSliderStyle = {
		color: 'red',
	}

	const restSliderstyle = {

		color: 'green'
	}


	return (
		<>
			<p className='text-teal-600 font-bold text-lg'>Настройки:</p>
			<div className="flex w-full flex-col">
				<label className="mt-10 text-teal-600 text-base font-semibold">Время для работы:</label>
				<Slider
					max={120}
					min={25}
					step={5}
					valueLabelDisplay="on"
					className='mt-10'
					style={workSliderStyle}
				/>
				<label className='mt-5 text-teal-600 text-base font-semibold'>Время для отдыха:</label>
				<Slider
					max={60}
					min={0}
					step={5}
					valueLabelDisplay="on"
					className='mt-10'
					style={restSliderstyle}
				/>

				<button className='border p-1 w-1/2 mx-auto mt-8 rounded-md text-white font-semibold active:shadow-lg flex justify-center bg-teal-600 hover:bg-teal-400 duration-200 hover:text-black'>Подтвердить</button>
			</div>
		</>
	)
}

export default Settings