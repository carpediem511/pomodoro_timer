import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { PlayCircleIcon, PauseCircleIcon, Cog6ToothIcon } from '@heroicons/react/24/solid'

const Timer = () => {

	return (

		<>
			<CircularProgressbar value={60} text={`60%`} styles={buildStyles({
				textColor: 'rgb(109, 40, 217)',
				trailColor: 'rgb(91, 33, 182)',
				pathColor: 'rgb(129, 140, 248)'
			})} />
			<div className='flex justify-center mt-10 gap-4'>

				<PlayCircleIcon className='w-1/4 text-indigo-500 duration-200 cursor-pointer  hover:text-indigo-700' />
				<PauseCircleIcon className='w-1/4 text-indigo-500 duration-200 cursor-pointer hover:text-indigo-700' />

				<button className='self-center text-indigo-700 font-semibold active:shadow-lg flex rounded-lg px-3 mt-2 py-2 border w-1/2 justify-center bg-indigo-200 hover:bg-indigo-700 duration-200 hover:text-white'>
					<Cog6ToothIcon className='w-1/4 text-indigo-500' />
					Настройки
				</button>
			</div>
		</>
	)
}

export default Timer


