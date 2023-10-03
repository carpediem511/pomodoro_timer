import Slider from '@mui/material-next/Slider'

const Settings = () => {

	const workSliderStyle = {
		color: 'red',
	}

	const restSliderstyle = {

		color: 'green'
	}

	return (
		<>
			<p>Настройки:</p>
			<div className="flex w-full flex-col">
				<label className="mt-10">Время для работы:</label>
				<Slider
					max={120}
					min={25}
					step={5}
					valueLabelDisplay="on"
					className='mt-10 text-teal-600'
					style={workSliderStyle}
				/>
				<label className='mt-5'>Время для отдыха:</label>
				<Slider
					max={60}
					min={0}
					step={5}
					valueLabelDisplay="on"
					className='mt-10'
					style={restSliderstyle}
				/>
			</div>
		</>
	)
}

export default Settings